const City = require("../models/City");
const Food = require("../models/Food");
const Place = require("../models/Place");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ─── CITY IMAGES (HD Unsplash) ────────────────────────────────────────────────
const CITY_IMAGES = {
    "agartala": "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85",
    "agatti": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    "ahmedabad": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    "aizawl": "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85",
    "alappuzha": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    "aligarh": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "ambala": "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85",
    "amritsar": "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=85",
    "anandpur-sahib": "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85",
    "aurangabad": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    "ayodhya": "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=1200&q=85",
    "bangalore": "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85",
    "bangaram": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "baramulla": "https://images.unsplash.com/photo-1597149541696-1c6d86c56abb?auto=format&fit=crop&w=1200&q=85",
    "baratang-island": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "bareilly": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "bastar": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "bhubaneswar": "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85",
    "blue-mountain": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "bodh-gaya": "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85",
    "border": "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85",
    "bussy-street": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "candolim": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "chamoli": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    "chandni-chowk": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "changlang": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
    "chennai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "cherrapunji": "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85",
    "chhatarpur": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "chillika": "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85",
    "daman": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "delta": "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85",
    "deoghar": "https://images.unsplash.com/photo-1549887534-1541e9326b83?auto=format&fit=crop&w=1200&q=85",
    "dimapur": "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85",
    "diu": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "east-khasi-hills": "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85",
    "faizabad": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "faridabad": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "firozabad": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    "ganges": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "gangtok": "https://images.unsplash.com/photo-1558888401-3cc1de77652d?auto=format&fit=crop&w=1200&q=85",
    "ghaziabad": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "golaghat": "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85",
    "gorakhpur": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "great-nicobar": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "gurgaon": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "guwahati": "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85",
    "gwalior": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "hampi": "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85",
    "havelock-island": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "havelock-island-swaraj-dweep": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "himalayas": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    "hyderabad": "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&q=85",
    "imphal": "https://images.unsplash.com/photo-1598425165413-da9cfa18dc5b?auto=format&fit=crop&w=1200&q=85",
    "indore": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "itanagar": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
    "jagdalpur": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "jaipur": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    "jaisalmer": "https://images.unsplash.com/photo-1477587458883-47145ed9b01c?auto=format&fit=crop&w=1200&q=85",
    "jama-masjid": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "jhansi": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "jorhat": "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85",
    "kabirdham": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "kailashahar": "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85",
    "kakinada": "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85",
    "kangra": "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85",
    "kanpur": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "katra": "https://images.unsplash.com/photo-1597149541696-1c6d86c56abb?auto=format&fit=crop&w=1200&q=85",
    "kavaratti": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "kevadia": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    "kisama": "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85",
    "kochi": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    "kodagu": "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85",
    "kohima": "https://images.unsplash.com/photo-1598425165177-c09800d4c1fb?auto=format&fit=crop&w=1200&q=85",
    "kolkata": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "konark": "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85",
    "kozhikode": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    "kurukshetra": "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85",
    "kutch": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    "latehar": "https://images.unsplash.com/photo-1549887534-1541e9326b83?auto=format&fit=crop&w=1200&q=85",
    "leh": "https://images.unsplash.com/photo-1567148275226-f4e3d1dd1c51?auto=format&fit=crop&w=1200&q=85",
    "lucknow": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "madurai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "maduraichennai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "mahasamund": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "majuli": "https://images.unsplash.com/photo-1603994843756-e7fa8e5c8ec8?auto=format&fit=crop&w=1200&q=85",
    "mamallapuram": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "manali": "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85",
    "mandla": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "mathura": "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=1200&q=85",
    "meerut": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "mehrauli": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "melaghar": "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1200&q=85",
    "minicoy": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "moirang": "https://images.unsplash.com/photo-1598425165413-da9cfa18dc5b?auto=format&fit=crop&w=1200&q=85",
    "moradabad": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "mumbai": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    "muzaffarnagar": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "mysore": "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=1200&q=85",
    "nalanda": "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85",
    "neil-island": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "neil-island-shaheed-dweep": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "new-delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "noida": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "nongriat": "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85",
    "old-delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "old-goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "panaji": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "patan": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    "patna": "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85",
    "patna-ghats": "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85",
    "pinjore": "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85",
    "port-blair": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=85",
    "prayagraj": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "pune": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    "puri": "https://images.unsplash.com/photo-1590158786923-6e4b39f1e30e?auto=format&fit=crop&w=1200&q=85",
    "qutub-minar": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    "raigarh": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "raipur": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=1200&q=85",
    "rajgir": "https://images.unsplash.com/photo-1672756342695-c1267a9cfa2e?auto=format&fit=crop&w=1200&q=85",
    "ranchi": "https://images.unsplash.com/photo-1549887534-1541e9326b83?auto=format&fit=crop&w=1200&q=85",
    "rishikesh": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    "rose-garden": "https://images.unsplash.com/photo-1593436978194-c574c0d7e3b5?auto=format&fit=crop&w=1200&q=85",
    "rudraprayag": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    "saharanpur": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "salcette": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "sanchi": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    "sector-1": "https://images.unsplash.com/photo-1593436978194-c574c0d7e3b5?auto=format&fit=crop&w=1200&q=85",
    "sector-28": "https://images.unsplash.com/photo-1593436978194-c574c0d7e3b5?auto=format&fit=crop&w=1200&q=85",
    "shahjahanpur": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "shillong": "https://images.unsplash.com/photo-1622390455932-0c1a4be3ed46?auto=format&fit=crop&w=1200&q=85",
    "shimla": "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85",
    "silvassa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "somnath": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    "sonipat": "https://images.unsplash.com/photo-1612810806563-4cb8265c7f52?auto=format&fit=crop&w=1200&q=85",
    "spiti-valley": "https://images.unsplash.com/photo-1626015365107-338a46ae648a?auto=format&fit=crop&w=1200&q=85",
    "srinagar": "https://images.unsplash.com/photo-1597149541696-1c6d86c56abb?auto=format&fit=crop&w=1200&q=85",
    "tawang": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
    "tawang-monastery": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
    "thanjavur": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "thiruvananthapuram": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    "tirupati": "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85",
    "udaipur": "https://images.unsplash.com/photo-1477587458883-47145ed9b01c?auto=format&fit=crop&w=1200&q=85",
    "vagator": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    "varanasi": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    "vijayawada": "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85",
    "villupuram": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "visakhapatnam": "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=1200&q=85",
    "warangal": "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&q=85",
    "white-town": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    "ziro": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
    "ziro-valley": "https://images.unsplash.com/photo-1626615340125-d9fb47e62601?auto=format&fit=crop&w=1200&q=85",
};

// ─── FOOD IMAGES (HD Unsplash) ────────────────────────────────────────────────
const FOOD_IMAGES = {
    "bedai-with-aloo-sabzi": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85",
    "butter-chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85",
    "dal-moth": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85",
    "kachori": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    "mughlai-chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85",
    "petha": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85",
};

// ─── PLACE IMAGES (HD Unsplash) ───────────────────────────────────────────────
const PLACE_IMAGES = {
    "agra-fort": ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"],
    "akbars-tomb-sikandra": ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85"],
    "fatehpur-sikri": ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85"],
    "itmad-ud-daulah-baby-taj": ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85"],
    "mehtab-bagh": ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85"],
    "taj-mahal": ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85"],
};

// ─── CONTROLLER ───────────────────────────────────────────────────────────────
exports.bulkUpdateAllImages = async (req, res) => {
    try {
        let cityUpdated = 0, foodUpdated = 0, placeUpdated = 0;
        let cityMissed = [], foodMissed = [], placeMissed = [];

        // Update Cities
        for (const [slug, img] of Object.entries(CITY_IMAGES)) {
            const r = await City.updateOne({ slug }, { $set: { image: img } });
            if (r.matchedCount > 0) cityUpdated++; else cityMissed.push(slug);
        }

        // Update Foods
        for (const [slug, img] of Object.entries(FOOD_IMAGES)) {
            const r = await Food.updateOne({ slug }, { $set: { image: img } });
            if (r.matchedCount > 0) foodUpdated++; else foodMissed.push(slug);
        }

        // Update Places (images is an array)
        for (const [slug, imgs] of Object.entries(PLACE_IMAGES)) {
            const r = await Place.updateOne({ slug }, { $set: { images: imgs } });
            if (r.matchedCount > 0) placeUpdated++; else placeMissed.push(slug);
        }

        return successResponse(res, "Bulk image update complete", {
            cities: { updated: cityUpdated, missed: cityMissed.length, missedSlugs: cityMissed },
            foods: { updated: foodUpdated, missed: foodMissed.length, missedSlugs: foodMissed },
            places: { updated: placeUpdated, missed: placeMissed.length, missedSlugs: placeMissed },
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
