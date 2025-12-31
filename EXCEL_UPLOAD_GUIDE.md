# Excel/CSV Upload Guide for BharatYatra

This document lists all required columns for bulk uploading data to BharatYatra.

---

## 📋 **STATE (Already Uploaded)**

### Required Columns:
| Column Name | Required | Accepts Alternative Names | Default Value | Notes |
|-------------|----------|---------------------------|---------------|-------|
| **name** | ✅ Yes | "State Name", "state_name", "StateName", "Name" | - | State name (e.g., "Maharashtra") |
| **description** | ❌ No | "State Description", "state_description", "StateDescription", "Description" | "No description available" | Brief description of the state |
| **image** | ❌ No | "State Image", "state_image", "StateImage", "Image" | Placeholder URL | Image URL for state banner |
| **culturalSummary** | ❌ No | "culturalSur", "State Cultural Summary", "state_cultural_summary", "StateCulturalSummary", "Cultural Summary", "CulturalSummary" | "" | Cultural summary text |
| **isActive** | ❌ No | "is_active", "IsActive", "ISACTIVE" | true | Use "TRUE" or "FALSE" |

---

## 🏙️ **CITY**

### Required Columns:
| Column Name | Required | Accepts Alternative Names | Default Value | Notes |
|-------------|----------|---------------------------|---------------|-------|
| **City Name** | ✅ Yes | "city_name", "CityName", "Name" | - | City name (e.g., "Mumbai") |
| **City Description** | ❌ No | "city_description", "CityDescription", "Description" | "No description available" | Brief description of the city |
| **City Image** | ❌ No | "city_image", "CityImage", "Image" | Placeholder URL | Image URL for city banner |
| **City History** | ❌ No | "city_history", "CityHistory", "History" | "" | Historical information about the city |
| **City Is Popular** | ❌ No | "city_is_popular", "CityIsPopular", "Is Popular" | false | Use "TRUE" or "FALSE" to mark popular cities |

### Example:
```
City Name | City Description | City Image | City History | City Is Popular
Mumbai | Financial capital of India | https://example.com/mumbai.jpg | Founded in 1507 | TRUE
Pune | Cultural hub | https://example.com/pune.jpg | Ancient city | FALSE
```

**Note:** You must select a **State** before uploading cities. The city will be associated with that state.

---

## 🏛️ **PLACE**

### Required Columns:
| Column Name | Required | Accepts Alternative Names | Default Value | Notes |
|-------------|----------|---------------------------|---------------|-------|
| **Place Name** | ✅ Yes | "place_name", "PlaceName", "Name" | - | Name of the place (e.g., "Gateway of India") |
| **Place Category** | ❌ No | "place_category", "PlaceCategory", "Category" | "other" | Must be one of: **temple, fort, palace, museum, nature, heritage, religious, other** |
| **Place Description** | ❌ No | "place_description", "PlaceDescription", "Description" | "No description available" | Description of the place |
| **Place Images** | ❌ No | "place_images", "PlaceImages", "Images" | [] | **Comma-separated** image URLs (e.g., "url1.jpg,url2.jpg,url3.jpg") |
| **Place Best Time** | ❌ No | "place_best_time", "PlaceBestTime", "Best Time" | "" | Best time to visit (e.g., "October to March") |
| **Place Entry Fee** | ❌ No | "place_entry_fee", "PlaceEntryFee", "Entry Fee" | "" | Entry fee (e.g., "Free", "₹50", "₹100-₹200") |
| **Place Location** | ❌ No | "place_location", "PlaceLocation", "Location" | "" | Address or location details |

### Example:
```
Place Name | Place Category | Place Description | Place Images | Place Best Time | Place Entry Fee | Place Location
Gateway of India | heritage | Iconic monument | https://example.com/img1.jpg,https://example.com/img2.jpg | October to March | Free | Apollo Bunder, Mumbai
Ajanta Caves | heritage | Ancient Buddhist caves | https://example.com/ajanta1.jpg | November to February | ₹30 | Aurangabad
```

**Note:** You must select a **City** before uploading places. The place will be associated with that city.

---

## 🍽️ **FOOD**

### Required Columns:
| Column Name | Required | Accepts Alternative Names | Default Value | Notes |
|-------------|----------|---------------------------|---------------|-------|
| **Food Name** | ✅ Yes | "food_name", "FoodName", "Name" | - | Name of the food item (e.g., "Vada Pav") |
| **Food Type** | ❌ No | "food_type", "FoodType", "Type" | "veg" | Must be one of: **veg, non-veg, vegan** |
| **Food Description** | ❌ No | "food_description", "FoodDescription", "Description" | "No description available" | Description of the food item |
| **Food Famous For** | ❌ No | "food_famous_for", "FoodFamousFor", "Famous For" | "" | Why this dish is special/famous |
| **Food Approx Price** | ❌ No | "food_approx_price", "FoodApproxPrice", "Approx Price" | "" | Approximate price (e.g., "₹40-₹80", "₹150", "Free") |
| **Food Image** | ❌ No | "food_image", "FoodImage", "Image" | Placeholder URL | Image URL of the food item |

### Example:
```
Food Name | Food Type | Food Description | Food Famous For | Food Approx Price | Food Image
Vada Pav | veg | Mumbai street food | Mumbai's signature snack | ₹15-₹25 | https://example.com/vadapav.jpg
Misal Pav | veg | Spicy curry with bread | Kolhapur specialty | ₹50-₹80 | https://example.com/misal.jpg
```

**Note:** You must select a **City** before uploading foods. The food item will be associated with that city.

---

## 🚌 **TRANSPORT**

### Required Columns:
| Column Name | Required | Accepts Alternative Names | Default Value | Notes |
|-------------|----------|---------------------------|---------------|-------|
| **Transport Type** | ✅ Yes | "transport_type", "TransportType", "Type" | - | Must be one of: **bus, train, flight, taxi, auto, metro** |
| **Transport Description** | ❌ No | "transport_description", "TransportDescription", "Description" | "No description available" | Description of transport option |
| **Transport Connectivity** | ❌ No | "transport_connectivity", "TransportConnectivity", "Connectivity" | "" | Connectivity details (nearby cities, airports, stations) |
| **Transport Approx Cost** | ❌ No | "transport_approx_cost", "TransportApproxCost", "Approx Cost" | "" | Approximate cost (e.g., "₹200-₹500", "₹50", "Varies") |

### Example:
```
Transport Type | Transport Description | Transport Connectivity | Transport Approx Cost
bus | State transport buses | Connected to all major cities | ₹200-₹500
train | Railway connectivity | Major railway station in city center | ₹50-₹300
metro | Metro rail system | Connects key areas of the city | ₹10-₹50
flight | Airport connectivity | International airport 30km away | ₹3000-₹15000
```

**Note:** You must select a **City** before uploading transports. The transport option will be associated with that city.

---

## 🎭 **CULTURE**

**⚠️ IMPORTANT:** Currently, there is **NO bulk upload feature for Culture** in the admin panel. The Culture model has a complex nested structure (festivals, traditions, rituals, lifestyle, etc.) that requires manual entry through the admin interface.

If you need to add culture data, please use the admin dashboard's manual entry form for each state.

---

## 📝 **GENERAL NOTES**

### File Format:
- **Supported formats:** `.xlsx`, `.xls`, `.csv`
- **File size limit:** 10 MB
- **First row must contain column headers**
- **Data starts from row 2**

### Column Name Flexibility:
- The system accepts multiple naming variations for columns (as shown in the "Accepts Alternative Names" column)
- You can use either:
  - Space-separated: "City Name", "Place Category"
  - Snake_case: "city_name", "place_category"
  - CamelCase: "CityName", "PlaceCategory"
  - Simple: "Name", "Description", "Image"

### Best Practices:
1. ✅ Always use the exact column names from the "Column Name" column for best results
2. ✅ Required fields cannot be empty
3. ✅ Use "TRUE" or "FALSE" (case-insensitive) for boolean fields
4. ✅ For comma-separated values (like Place Images), separate with commas only
5. ✅ URLs should be complete (include http:// or https://)
6. ✅ Test with a small file first (5-10 rows) before uploading large datasets

### Common Issues:
- ❌ Empty required fields will cause row to be skipped with an error
- ❌ Invalid category/type values will default to the default value shown
- ❌ Duplicate entries (same name/slug) will be skipped (counted in "skipped")
- ❌ Invalid image URLs will still be saved (validate before uploading)

---

## 🚀 **UPLOAD PROCESS**

1. **States:** Admin → States → Bulk Upload → Select Excel file → Upload
2. **Cities:** Admin → Cities → Select State → Bulk Upload → Select Excel file → Upload
3. **Places:** Admin → Places → Select City → Bulk Upload → Select Excel file → Upload
4. **Foods:** Admin → Foods → Select City → Bulk Upload → Select Excel file → Upload
5. **Transports:** Admin → Transports → Select City → Bulk Upload → Select Excel file → Upload

---

**Last Updated:** Based on current codebase structure
**For Support:** Check server console logs for detailed error messages during upload

