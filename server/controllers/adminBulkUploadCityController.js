const multer = require("multer");
const xlsx = require("xlsx");
const City = require("../models/City");
const State = require("../models/State");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Configure multer for file upload
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
}).single("file");

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

// Bulk upload Cities for a specific state
const bulkUploadCities = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return errorResponse(res, err.message, 400);
    }

    if (!req.file) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const { stateId } = req.body;
    if (!stateId) {
      return errorResponse(res, "State ID is required", 400);
    }

    try {
      // Verify state exists and is active
      const state = await State.findById(stateId);
      if (!state || !state.isActive) {
        return errorResponse(res, "Invalid or inactive state", 404);
      }

      const { headers, data } = parseFile(req.file.buffer, req.file.originalname);

      const results = {
        created: 0,
        skipped: 0,
        errors: [],
      };

      // Expected columns: City Name, City Description, City Image, City History, City Is Popular
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowNum = i + 2;

        try {
          const cityName = row["City Name"] || row["city_name"] || row["CityName"] || row["Name"];
          if (!cityName || !cityName.trim()) {
            results.errors.push(`Row ${rowNum}: City name is required`);
            continue;
          }

          const citySlug = generateSlug(cityName.trim());
          const existing = await City.findOne({ slug: citySlug, stateId });

          if (existing) {
            results.skipped++;
            continue;
          }

          const cityData = {
            name: cityName.trim(),
            slug: citySlug,
            stateId,
            description: row["City Description"] || row["city_description"] || row["CityDescription"] || row["Description"] || "No description available",
            image: row["City Image"] || row["city_image"] || row["CityImage"] || row["Image"] || "https://via.placeholder.com/800x400?text=" + encodeURIComponent(cityName),
            history: row["City History"] || row["city_history"] || row["CityHistory"] || row["History"] || "",
            isPopular: (row["City Is Popular"] || row["city_is_popular"] || row["CityIsPopular"] || row["Is Popular"] || "").toString().toLowerCase() === "true",
            isActive: true,
          };

          await City.create(cityData);
          results.created++;
        } catch (rowError) {
          results.errors.push(`Row ${rowNum}: ${rowError.message}`);
        }
      }

      return successResponse(res, "Cities bulk upload completed", results, 200);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  });
};

module.exports = { bulkUploadCities };

