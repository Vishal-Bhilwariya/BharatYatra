const multer = require("multer");
const xlsx = require("xlsx");
const Transport = require("../models/Transport");
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

// Bulk upload Transports handler
const bulkUploadTransportsHandler = async (req, res) => {
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

    // Expected columns: Transport Type, Transport Description, Transport Connectivity, Transport Approx Cost
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2;

      try {
        const transportType = row["Transport Type"] || row["transport_type"] || row["TransportType"] || row["Type"];
        if (!transportType || !transportType.trim()) {
          results.errors.push(`Row ${rowNum}: Transport type is required`);
          continue;
        }

        const validTypes = ["bus", "train", "flight", "taxi", "auto", "metro"];
        const type = validTypes.includes(transportType.toLowerCase()) ? transportType.toLowerCase() : "bus";

        const existing = await Transport.findOne({ cityId, type });

        if (existing) {
          results.skipped++;
          continue;
        }

        const transportData = {
          cityId,
          type,
          description: row["Transport Description"] || row["transport_description"] || row["TransportDescription"] || row["Description"] || "No description available",
          connectivity: row["Transport Connectivity"] || row["transport_connectivity"] || row["TransportConnectivity"] || row["Connectivity"] || "",
          approxCost: row["Transport Approx Cost"] || row["transport_approx_cost"] || row["TransportApproxCost"] || row["Approx Cost"] || "",
          isActive: true,
        };

        await Transport.create(transportData);
        results.created++;
      } catch (rowError) {
        results.errors.push(`Row ${rowNum}: ${rowError.message}`);
      }
    }

    return successResponse(res, "Transports bulk upload completed", results, 200);
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
const bulkUploadTransports = [upload.single("file"), handleMulterError, bulkUploadTransportsHandler];

module.exports = { bulkUploadTransports };

