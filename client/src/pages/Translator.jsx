import { useState, useEffect } from "react";
import api from "../api/api";
import { Mic, MicOff, Volume2, Copy, Check } from "lucide-react";

const Translator = () => {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [presetPhrases, setPresetPhrases] = useState([]);
  const [copied, setCopied] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        alert("Speech recognition failed. Please try again.");
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Fetch preset phrases
  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const res = await api.get("/translate/phrases");
        setPresetPhrases(res.data);
      } catch (error) {
        console.error("Failed to load phrases", error);
      }
    };
    fetchPhrases();
  }, []);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/translate", {
        text,
        targetLang,
      });
      setTranslatedText(res.data.translatedText);
    } catch (err) {
      console.error(err);
      alert("Translation failed");
    }
    setLoading(false);
  };

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handlePhraseClick = (phrase) => {
    setText(phrase.english);
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (textToSpeak) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetLang === "hi" ? "hi-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            🌍 Language Translator
          </h1>
          <p className="text-gray-600">
            Translate text and use voice-to-text for easy communication
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Input Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Text (English)
            </label>
            <div className="relative">
              <textarea
                rows="4"
                placeholder="Enter text in English or use voice input..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2 rounded-full transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? (
                    <MicOff size={20} />
                  ) : (
                    <Mic size={20} />
                  )}
                </button>
              </div>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <Mic className="animate-pulse" size={16} />
                Listening... Speak now
              </p>
            )}
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Translate To
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            >
              <option value="hi">Hindi (हिंदी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="te">Telugu (తెలుగు)</option>
              <option value="kn">Kannada (ಕನ್ನಡ)</option>
              <option value="ml">Malayalam (മലയാളം)</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="gu">Gujarati (ગુજરાતી)</option>
              <option value="mr">Marathi (मराठी)</option>
            </select>
          </div>

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Translating..." : "Translate"}
          </button>

          {/* Translated Text */}
          {translatedText && (
            <div className="border-t-2 pt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Translated Text
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => speakText(translatedText)}
                    className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
                    title="Listen to translation"
                  >
                    <Volume2 size={18} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(translatedText)}
                    className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <p className="text-lg text-gray-800">{translatedText}</p>
              </div>
            </div>
          )}

          {/* Preset Phrases */}
          {presetPhrases.length > 0 && (
            <div className="border-t-2 pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                📝 Common Travel Phrases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presetPhrases.map((phrase, index) => (
                  <button
                    key={index}
                    onClick={() => handlePhraseClick(phrase)}
                    className="text-left p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg transition-colors"
                  >
                    <p className="font-medium text-gray-800">{phrase.english}</p>
                    {phrase.hindi && (
                      <p className="text-sm text-gray-600 mt-1">{phrase.hindi}</p>
                    )}
                    {phrase.category && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                        {phrase.category}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice Recognition Support Info */}
          {!recognition && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Voice-to-text is not supported in your browser. Please use
                Chrome, Edge, or Safari for this feature.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translator;
