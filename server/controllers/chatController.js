const axios = require("axios");
const { successResponse, errorResponse } = require("../utils/apiResponse");

exports.parseChatIntent = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return errorResponse(res, "Message is required", 400);
    }
    
    if (!process.env.GEMINI_API_KEY) {
      return errorResponse(res, "Gemini API key is missing. Chatbot unavailable.", 500);
    }

    const systemPrompt = `You are the BharatYatra Travel Assistant. A user is talking to you.
Your goal is to figure out if they want to generate an itinerary, and extract their 'duration', 'budget' (choose from: Low, Medium, High), and 'city' or 'state'. 
If you found these preferences, reply with ONLY a raw JSON object formatted like this:
{ "intent": "itinerary", "duration": 3, "budget": "Medium", "destination": "Jaipur", "message": "I can help with that!" }
If you cannot find clear destination preferences, ask them casually in plain text (no markdown json). For example: "I'd love to help plan! Where do you want to go and for how long?"
`;

    const sanitizedMessage = message.replace(/[`"\\]/g, '').substring(0, 500);

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I will analyze the user message and respond accordingly." }] },
            { role: "user", parts: [{ text: sanitizedMessage }] }
        ],
        generationConfig: { temperature: 0.2 }
      },
      { headers: { "Content-Type": "application/json" } }
    );
    
    const data = response.data;
    if (!data.candidates || data.candidates.length === 0) {
      return errorResponse(res, "Failed to analyze chat", 500);
    }
    
    const rawText = data.candidates[0].content.parts[0].text.trim();
    let parsedJson = null;
    let replyMessage = rawText;
    
    try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
             parsedJson = JSON.parse(jsonMatch[0]);
             if (parsedJson.intent) {
                 return successResponse(res, "Parsed successfully", parsedJson);
             }
        }
    } catch(e) {
        // It's normal text
    }

    return successResponse(res, "Chat reply", { 
        intent: "chat", 
        message: replyMessage.replace(/\*/g, '') 
    });

  } catch (error) {
    console.error("Chat parsing error:", error.message || error);
    return errorResponse(res, "Server Error", 500);
  }
};
