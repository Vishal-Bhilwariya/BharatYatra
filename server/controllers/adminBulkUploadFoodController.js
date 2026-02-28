const multer = require("multer");
const xlsx = require("xlsx");
const Food = require("../models/Food");
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

// Bulk upload Foods for a specific city
const bulkUploadFoods = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return errorResponse(res, err.message, 400);
    }

    if (!req.file) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const { cityId } = req.body;
    if (!cityId) {
      return errorResponse(res, "City ID is required", 400);
    }

    try {
      const city = await City.findById(cityId);
      if (!city || !city.isActive) {
        return errorResponse(res, "Invalid or inactive city", 404);
      }

      const { headers, data } = parseFile(req.file.buffer, req.file.originalname);

      const results = {
        created: 0,
        skipped: 0,
        errors: [],
      };

      // Expected columns: Food Name, Food Type, Food Description, Food Famous For, Food Approx Price, Food Image
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowNum = i + 2;

        try {
          const foodName = row["Food Name"] || row["food_name"] || row["FoodName"] || row["Name"];
          if (!foodName || !foodName.trim()) {
            results.errors.push(`Row ${rowNum}: Food name is required`);
            continue;
          }

          const foodSlug = generateSlug(foodName.trim());
          const existing = await Food.findOne({ slug: foodSlug, cityId });

          if (existing) {
            results.skipped++;
            continue;
          }

          const foodType = (row["Food Type"] || row["food_type"] || row["FoodType"] || row["Type"] || "veg").toLowerCase();
          const validTypes = ["veg", "non-veg", "vegan"];

          const foodData = {
            name: foodName.trim(),
            slug: foodSlug,
            cityId,
            type: validTypes.includes(foodType) ? foodType : "veg",
            description: row["Food Description"] || row["food_description"] || row["FoodDescription"] || row["Description"] || "No description available",
            famousFor: row["Food Famous For"] || row["food_famous_for"] || row["FoodFamousFor"] || row["Famous For"] || "",
            approxPrice: row["Food Approx Price"] || row["food_approx_price"] || row["FoodApproxPrice"] || row["Approx Price"] || "",
            image: row["Food Image"] || row["food_image"] || row["FoodImage"] || row["Image"] || "https://via.placeholder.com/800x400?text=" + encodeURIComponent(foodName),
            isActive: true,
          };

          await Food.create(foodData);
          results.created++;
        } catch (rowError) {
          results.errors.push(`Row ${rowNum}: ${rowError.message}`);
        }
      }

      return successResponse(res, "Foods bulk upload completed", results, 200);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  });
};

module.exports = { bulkUploadFoods };

