const multer = require("multer");
const xlsx = require("xlsx");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Check by file extension as MIME types can be inconsistent
    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    const allowedMimeTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/csv",
      "text/x-csv",
      "application/x-csv",
    ];
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only Excel (.xlsx, .xls) and CSV files are allowed. Received: ${file.mimetype}`), false);
    }
  },
});

// Helper function to generate slug
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

// Parse Excel/CSV file
const parseFile = (buffer, filename) => {
  try {
    const fileExtension = filename.split(".").pop().toLowerCase();
    let workbook;

    // Use xlsx library for both Excel and CSV (it handles CSV better)
    if (fileExtension === "csv") {
      // Convert CSV buffer to string and parse with xlsx
      const csvData = buffer.toString("utf8");
      workbook = xlsx.read(csvData, { type: "string", raw: false });
    } else {
      workbook = xlsx.read(buffer, { type: "buffer" });
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error("File has no sheets");
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with header row
    const data = xlsx.utils.sheet_to_json(worksheet, {
      defval: "", // Default value for empty cells
      raw: false, // Convert all values to strings for consistency
    });
    
    if (data.length === 0) {
      throw new Error("File is empty or has no data rows");
    }

    const headers = Object.keys(data[0]);
    return { headers, data };
  } catch (error) {
    throw new Error(`Error parsing file: ${error.message}`);
  }
};

// Bulk upload States handler
const bulkUploadStatesHandler = async (req, res) => {
  if (!req.file) {
    return errorResponse(res, "No file uploaded. Please select a file.", 400);
  }

  try {
    console.log("Processing file:", req.file.originalname, "Size:", req.file.size, "MIME:", req.file.mimetype);
    const { headers, data } = parseFile(req.file.buffer, req.file.originalname);

    console.log("File headers found:", headers);
    console.log("Total rows:", data.length);

    const results = {
      created: 0,
      skipped: 0,
      errors: [],
    };

    // Helper function to find column value (case-insensitive, handles various formats)
    const findColumnValue = (row, possibleNames) => {
      for (const name of possibleNames) {
        // Try exact match first
        if (row[name] !== undefined && row[name] !== null && String(row[name]).trim() !== "") {
          return String(row[name]).trim();
        }
        // Try case-insensitive match
        for (const key of Object.keys(row)) {
          if (key.toLowerCase() === name.toLowerCase() && String(row[key]).trim() !== "") {
            return String(row[key]).trim();
          }
        }
      }
      return null;
    };

    // Expected columns: State Name, State Description, State Image, State Cultural Summary
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2;

      try {
        // Try multiple column name variations (case-insensitive)
        const stateName = findColumnValue(row, [
          "name", "State Name", "state_name", "StateName", "Name",
          "NAME", "STATE NAME", "STATE_NAME", "STATENAME"
        ]);
        
        if (!stateName) {
          results.errors.push(`Row ${rowNum}: State name is required. Available columns: ${Object.keys(row).join(", ")}`);
          continue;
        }

        // Use slug from file if available, otherwise generate from name
        const fileSlug = findColumnValue(row, ["slug", "Slug", "SLUG", "state_slug", "State Slug"]);
        const stateSlug = fileSlug ? generateSlug(fileSlug) : generateSlug(stateName.trim());
        const existing = await State.findOne({ slug: stateSlug });

        if (existing) {
          results.skipped++;
          continue;
        }

        const description = findColumnValue(row, [
          "description", "State Description", "state_description", "StateDescription", "Description",
          "DESCRIPTION", "STATE DESCRIPTION", "STATE_DESCRIPTION", "STATEDESCRIPTION"
        ]) || "No description available";

        const image = findColumnValue(row, [
          "image", "State Image", "state_image", "StateImage", "Image",
          "IMAGE", "STATE IMAGE", "STATE_IMAGE", "STATEIMAGE"
        ]) || `https://via.placeholder.com/800x400?text=${encodeURIComponent(stateName)}`;

        const culturalSummary = findColumnValue(row, [
          "culturalSur", "culturalSummary", "cultural_summary", "State Cultural Summary", 
          "state_cultural_summary", "StateCulturalSummary", "Cultural Summary", "CulturalSummary",
          "CULTURALSUR", "CULTURALSUMMARY", "CULTURAL_SUMMARY", "STATE CULTURAL SUMMARY",
          "STATE_CULTURAL_SUMMARY", "STATECULTURALSUMMARY", "CULTURAL SUMMARY", "CULTURALSUMMARY"
        ]) || "";

        // Handle isActive - convert string "TRUE"/"FALSE" to boolean, default to true
        const isActiveValue = findColumnValue(row, ["isActive", "is_active", "IsActive", "ISACTIVE", "is_active"]);
        let isActive = true;
        if (isActiveValue !== null) {
          const lowerValue = String(isActiveValue).toLowerCase().trim();
          isActive = lowerValue === "true" || lowerValue === "1" || lowerValue === "yes";
        }

        const stateData = {
          name: stateName,
          slug: stateSlug,
          description: description,
          image: image,
          culturalSummary: culturalSummary,
          isActive: isActive,
        };

        await State.create(stateData);
        results.created++;
      } catch (rowError) {
        results.errors.push(`Row ${rowNum}: ${rowError.message}`);
      }
    }

    return successResponse(res, "States bulk upload completed", results, 200);
  } catch (error) {
    console.error("Bulk upload error:", error);
    return errorResponse(res, error.message || "Error processing file", 500);
  }
};

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    return errorResponse(res, err.message || "File upload error", 400);
  }
  if (err) {
    console.error("Upload error:", err);
    return errorResponse(res, err.message || "File upload error", 400);
  }
  next();
};

// Export multer middleware + handler
const bulkUploadStates = [upload.single("file"), handleMulterError, bulkUploadStatesHandler];

module.exports = { bulkUploadStates };
