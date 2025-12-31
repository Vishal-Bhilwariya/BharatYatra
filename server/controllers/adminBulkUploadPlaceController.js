const multer = require("multer");
const xlsx = require("xlsx");
const Place = require("../models/Place");
const City = require("../models/City");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
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

const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const parseFile = (buffer, filename) => {
  try {
    const fileExtension = filename.split(".").pop().toLowerCase();
    let workbook;

    if (fileExtension === "csv") {
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
    const data = xlsx.utils.sheet_to_json(worksheet, {
      defval: "",
      raw: false,
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

// Bulk upload Places handler
const bulkUploadPlacesHandler = async (req, res) => {
  if (!req.file) {
    return errorResponse(res, "No file uploaded. Please select a file.", 400);
  }

  try {
    const { cityId } = req.body;
    if (!cityId) {
      return errorResponse(res, "City ID is required", 400);
    }

    const city = await City.findById(cityId);
    if (!city || !city.isActive) {
      return errorResponse(res, "Invalid or inactive city", 404);
    }

    console.log("Processing file:", req.file.originalname, "Size:", req.file.size, "MIME:", req.file.mimetype);
    const { headers, data } = parseFile(req.file.buffer, req.file.originalname);

    const results = {
      created: 0,
      skipped: 0,
      errors: [],
    };

    // Expected columns: Place Name, Place Category, Place Description, Place Images, Place Best Time, Place Entry Fee, Place Location
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2;

      try {
        const placeName = row["Place Name"] || row["place_name"] || row["PlaceName"] || row["Name"];
        if (!placeName || !placeName.trim()) {
          results.errors.push(`Row ${rowNum}: Place name is required`);
          continue;
        }

        const placeSlug = generateSlug(placeName.trim());
        const existing = await Place.findOne({ slug: placeSlug, cityId });

        if (existing) {
          results.skipped++;
          continue;
        }

        const placeCategory = (row["Place Category"] || row["place_category"] || row["PlaceCategory"] || row["Category"] || "other").toLowerCase();
        const validCategories = ["temple", "fort", "palace", "museum", "nature", "heritage", "religious", "other"];

        const placeData = {
          name: placeName.trim(),
          slug: placeSlug,
          cityId,
          category: validCategories.includes(placeCategory) ? placeCategory : "other",
          description: row["Place Description"] || row["place_description"] || row["PlaceDescription"] || row["Description"] || "No description available",
          images: (row["Place Images"] || row["place_images"] || row["PlaceImages"] || row["Images"] || "").split(",").map((img) => img.trim()).filter((img) => img),
          bestTimeToVisit: row["Place Best Time"] || row["place_best_time"] || row["PlaceBestTime"] || row["Best Time"] || "",
          entryFee: row["Place Entry Fee"] || row["place_entry_fee"] || row["PlaceEntryFee"] || row["Entry Fee"] || "",
          location: row["Place Location"] || row["place_location"] || row["PlaceLocation"] || row["Location"] || "",
          isActive: true,
        };

        await Place.create(placeData);
        results.created++;
      } catch (rowError) {
        results.errors.push(`Row ${rowNum}: ${rowError.message}`);
      }
    }

    return successResponse(res, "Places bulk upload completed", results, 200);
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
const bulkUploadPlaces = [upload.single("file"), handleMulterError, bulkUploadPlacesHandler];

module.exports = { bulkUploadPlaces };

