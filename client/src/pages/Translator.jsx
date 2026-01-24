import { useState, useEffect, useRef } from "react";
import api from "../api/api";
import { Mic, MicOff, Volume2, Copy, Check, ArrowRightLeft, Languages, Sparkles } from "lucide-react";

const Translator = () => {
  // Enhanced State Management
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [presetPhrases, setPresetPhrases] = useState([]);
  const [copied, setCopied] = useState(false);

  // Use ref for SpeechRecognition instance to avoid re-renders and lint errors
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

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

      recognitionRef.current = recognitionInstance;
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
        sourceLang
      });
      setTranslatedText(res.data.translatedText);
    } catch (err) {
      console.error(err);
      alert("Translation failed");
    }
    setLoading(false);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    try {
      // Set the language dynamically based on sourceLang
      const langMap = {
        'hi': 'hi-IN',
        'en': 'en-US',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'ja': 'ja-JP',
        'zh': 'zh-CN',
      };
      recognitionRef.current.lang = langMap[sourceLang] || sourceLang;

      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handlePhraseClick = (phrase) => {
    setText(phrase.english);
    setSourceLang('en');
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (textToSpeak, lang) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const synthLangMap = {
        'hi': 'hi-IN',
        'en': 'en-US',
      };
      utterance.lang = synthLangMap[lang] || lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSwapLanguages = () => {
    const tempSource = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempSource);
    setText(translatedText);
    setTranslatedText(text);
  };

  const LanguageOptions = () => (
    <>
      <optgroup label="Common">
        <option value="en">English (English)</option>
        <option value="hi">Hindi (हिंदी)</option>
      </optgroup>
      <optgroup label="Indian Languages">
        <option value="ta">Tamil (தமிழ்)</option>
        <option value="te">Telugu (తెలుగు)</option>
        <option value="kn">Kannada (ಕನ್ನಡ)</option>
        <option value="ml">Malayalam (മലയാളം)</option>
        <option value="bn">Bengali (বাংলা)</option>
        <option value="gu">Gujarati (ગુજરાતી)</option>
        <option value="mr">Marathi (मराठी)</option>
        <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
        <option value="ur">Urdu (اردو)</option>
        <option value="or">Odia (ଓଡ଼ିଆ)</option>
        <option value="as">Assamese (অসমীয়া)</option>
        <option value="ne">Nepali (नेपाली)</option>
        <option value="sa">Sanskrit (संस्कृतम्)</option>
        <option value="kok">Konkani (कोंकणी)</option>
        <option value="sd">Sindhi (सिंधी)</option>
        <option value="mni">Manipuri (মৈতৈলোন্)</option>
        <option value="doi">Dogri (डोगरी)</option>
        <option value="ks">Kashmiri (कॉशुर)</option>
      </optgroup>
      <optgroup label="International Languages">
        <option value="es">Spanish (Español)</option>
        <option value="fr">French (Français)</option>
        <option value="de">German (Deutsch)</option>
        <option value="it">Italian (Italiano)</option>
        <option value="pt">Portuguese (Português)</option>
        <option value="ru">Russian (Русский)</option>
        <option value="zh">Chinese (中文)</option>
        <option value="ja">Japanese (日本語)</option>
        <option value="ko">Korean (한국어)</option>
        <option value="ar">Arabic (العربية)</option>
      </optgroup>
    </>
  );

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-100 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm mb-2">
            <Languages className="w-6 h-6 text-indigo-600 mr-2" />
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              AI Translator
            </h1>
          </div>
        </div>

        {/* Extended Card */}
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-white/90 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden relative z-10 ring-1 ring-indigo-100">

          {/* Top Toolbar (Language Selectors) */}
          <div className="bg-white/40 border-b border-indigo-100/50 p-3 flex flex-col md:flex-row items-center justify-between gap-3">

            {/* Source Language */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative group">
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full appearance-none bg-indigo-50/80 hover:bg-indigo-100/80 border-0 rounded-xl px-4 py-2.5 font-bold text-gray-700 cursor-pointer focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
                >
                  <LanguageOptions />
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapLanguages}
              className="p-2 bg-white rounded-full shadow-md border border-gray-100 text-indigo-500 hover:text-indigo-700 hover:rotate-180 hover:bg-indigo-50 transition-all duration-300 z-20"
              title="Swap Languages"
            >
              <ArrowRightLeft size={18} />
            </button>

            {/* Target Language */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative group">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full appearance-none bg-indigo-600 hover:bg-indigo-700 border-0 rounded-xl px-4 py-2.5 font-bold text-white cursor-pointer focus:ring-2 focus:ring-indigo-500/40 transition-all shadow-md shadow-indigo-200"
                >
                  <LanguageOptions />
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-200">
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-indigo-100/50 min-h-[280px]">

            {/* SOURCE INPUT */}
            <div className="p-5 md:p-6 flex flex-col relative group">
              <textarea
                rows="6"
                placeholder={`Type in ${sourceLang === 'en' ? 'English' : 'selected language'} or use voice...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex-1 bg-transparent border-0 resize-none focus:ring-0 text-xl text-gray-800 placeholder:text-gray-400 leading-relaxed font-medium"
                spellCheck="false"
              />

              {/* Source Actions */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 h-8">
                  {isListening && (
                    <span className="flex items-center gap-2 text-xs font-bold text-red-500 animate-pulse bg-red-50 px-3 py-1 rounded-full border border-red-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Listening...
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {text && (
                    <button
                      onClick={() => speakText(text, sourceLang)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      title="Listen to input"
                    >
                      <Volume2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2.5 rounded-full transition-all shadow-sm ${isListening
                        ? "bg-red-500 text-white shadow-red-200 scale-110"
                        : "bg-white border border-gray-100 text-gray-500 hover:text-indigo-600 hover:shadow-md hover:scale-105"
                      }`}
                    title={isListening ? "Stop Listening" : `Speak in ${sourceLang}`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* TARGET OUTPUT */}
            <div className="p-5 md:p-6 bg-indigo-50/40 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              {translatedText ? (
                <>
                  <div className="flex-1 relative z-10">
                    <p className="text-xl text-indigo-900 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {translatedText}
                    </p>
                  </div>

                  {/* Target Actions */}
                  <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-indigo-100/50 relative z-10">
                    <button
                      onClick={() => speakText(translatedText, targetLang)}
                      className="p-2 text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-full transition-colors"
                      title="Listen to translation"
                    >
                      <Volume2 size={20} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      className="p-2 text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-full transition-colors"
                      title="Copy translation"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-300 space-y-3 select-none relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Sparkles size={24} className="text-indigo-200" />
                  </div>
                  <p className="font-medium text-base text-indigo-200/80">Translation appears here</p>
                </div>
              )}
            </div>
          </div>

          {/* Translate Button Bar */}
          <div className="p-3 bg-white/40 border-t border-indigo-50/50">
            <button
              onClick={handleTranslate}
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200/50 transform transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <span>Translate</span>
                  <ArrowRightLeft size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Phrases */}
        {presetPhrases.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-gray-800 ml-1 flex items-center gap-2 opacity-80">
              <span className="text-xl">✨</span> Quick Phrases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {presetPhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => handlePhraseClick(phrase)}
                  className="group relative p-3 bg-white/60 backdrop-blur-sm hover:bg-white rounded-xl shadow-sm hover:shadow-indigo-100 border border-white/50 transition-all text-left duration-200"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">
                    {phrase.english}
                  </p>
                  {phrase.hindi && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{phrase.hindi}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
