const axios = require("axios");

const translateText = async (req, res) => {
  try {
    const { text, targetLang, sourceLang = "en" } = req.body;
    console.log("Translate Request Body:", req.body);
    console.log("Constructed Langpair:", `${sourceLang}|${targetLang}`);

    if (!text || !targetLang) {
      return res.status(400).json({ message: "Text and targetLang are required" });
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceLang}|${targetLang}`;

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
  const phrases = [
    {
      english: "Where is the railway station?",
      hindi: "रेलवे स्टेशन कहाँ है?",
      category: "transport",
    },
    {
      english: "How much is the ticket?",
      hindi: "टिकट कितना है?",
      category: "transport",
    },
    {
      english: "I need help",
      hindi: "मुझे मदद चाहिए",
      category: "general",
    },
    {
      english: "Is this food spicy?",
      hindi: "क्या यह खाना मसालेदार है?",
      category: "food",
    },
    {
      english: "Please take me to this place",
      hindi: "कृपया मुझे इस जगह ले चलिए",
      category: "transport",
    },
    {
      english: "What is the bus fare?",
      hindi: "बस का किराया कितना है?",
      category: "transport",
    },
    {
      english: "Where is the nearest hotel?",
      hindi: "निकटतम होटल कहाँ है?",
      category: "accommodation",
    },
    {
      english: "How do I get to the temple?",
      hindi: "मैं मंदिर कैसे पहुँचूँ?",
      category: "directions",
    },
    {
      english: "What time does it open?",
      hindi: "यह कितने बजे खुलता है?",
      category: "general",
    },
    {
      english: "Can you speak English?",
      hindi: "क्या आप अंग्रेजी बोल सकते हैं?",
      category: "general",
    },
  ];

  res.json(phrases);
};

module.exports = { translateText, getPresetPhrases };
