const axios = require("axios");

const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ message: "Text and targetLang are required" });
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${targetLang}`;

    const response = await axios.get(url);

    res.json({
      translatedText: response.data.responseData.translatedText,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Translation failed" });
  }
};

const getPresetPhrases = (req, res) => {
  res.json([
    "Where is the railway station?",
    "How much is the ticket?",
    "I need help",
    "Is this food spicy?",
    "Please take me to this place",
    "What is the bus fare?",
  ]);
};

module.exports = { translateText, getPresetPhrases };
