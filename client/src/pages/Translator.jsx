import { useState, useEffect, useRef } from "react";
import api from "../api/api";
import { Mic, MicOff, Volume2, Copy, Check, ArrowRightLeft, Languages, Sparkles } from "lucide-react";

const Translator = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [presetPhrases, setPresetPhrases] = useState([]);
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef(null);

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
        sourceLang,
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
      const langMap = {
        hi: "hi-IN",
        en: "en-US",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        ja: "ja-JP",
        zh: "zh-CN",
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
    setSourceLang("en");
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (textToSpeak, lang) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const synthLangMap = { hi: "hi-IN", en: "en-US" };
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
      <optgroup label="Common" className="bg-slate-900 text-white">
        <option value="en">English (English)</option>
        <option value="hi">Hindi (हिंदी)</option>
      </optgroup>
      <optgroup label="Indian Languages" className="bg-slate-900 text-white">
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
        <option value="sd">Sindhi (सिन्धी)</option>
        <option value="mni">Manipuri (মৈতৈলোন)</option>
        <option value="doi">Dogri (डोगरी)</option>
        <option value="ks">Kashmiri (कॉशुर)</option>
      </optgroup>
      <optgroup label="International Languages" className="bg-slate-900 text-white">
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
    <div className="min-h-screen bg-[#050B14] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden font-sans">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050B14] to-[#050B14] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[20%] right-[20%] w-[200px] h-[200px] bg-pink-600/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "50px 50px" }}></div>

      <div className="max-w-5xl w-full mx-auto space-y-8 relative z-10">

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <Languages className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              AI Translator
            </h1>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl shadow-indigo-900/20 overflow-hidden relative ring-1 ring-white/5">

          {/* Top Toolbar */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center border-b border-white/5">

            {/* Source Select */}
            <div className="relative group">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full appearance-none bg-[#0F172A]/80 hover:bg-[#1E293B] border border-indigo-500/30 rounded-xl px-5 py-4 font-semibold text-white cursor-pointer focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-lg transition-all shadow-lg"
              >
                <LanguageOptions />
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">
                <span className="text-sm">&#9660;</span>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapLanguages}
              className="p-3 mx-auto bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-indigo-300 hover:text-white hover:rotate-180 transition-all duration-300 backdrop-blur-md shadow-lg group"
            >
              <ArrowRightLeft size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </button>

            {/* Target Select */}
            <div className="relative group">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full appearance-none bg-gradient-to-r from-indigo-900/80 to-purple-900/80 hover:from-indigo-800 hover:to-purple-800 border border-purple-500/30 rounded-xl px-5 py-4 font-semibold text-white cursor-pointer focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-lg transition-all shadow-lg"
              >
                <LanguageOptions />
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-200">
                <span className="text-sm">&#9660;</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5 min-h-[50vh] lg:min-h-[400px]">

            {/* SOURCE INPUT */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col relative h-full">
              <textarea
                rows="6"
                placeholder="Enter text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex-1 bg-transparent border-0 resize-none focus:ring-0 text-xl md:text-2xl lg:text-3xl text-white placeholder:text-slate-500 leading-relaxed font-normal z-10 min-h-[150px]"
                spellCheck="false"
              />

              <div className="flex items-center justify-between mt-4 md:mt-6 relative z-10">
                <div className="flex items-center gap-3">
                  {isListening ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 animate-pulse">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></span>
                      <span className="text-xs md:text-sm font-bold tracking-wide">LISTENING</span>
                    </div>
                  ) : (
                    <div className="h-8 md:h-9"></div>
                  )}
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  {text && (
                    <button
                      onClick={() => speakText(text, sourceLang)}
                      className="p-2 md:p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Volume2 size={20} className="md:w-6 md:h-6" />
                    </button>
                  )}
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-3 md:p-4 rounded-full transition-all shadow-lg border ${
                      isListening
                        ? "bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-110"
                        : "bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    }`}
                  >
                    {isListening ? <MicOff size={20} className="md:w-6 md:h-6" /> : <Mic size={20} className="md:w-6 md:h-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* TARGET OUTPUT */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col justify-between relative bg-white/[0.02] min-h-[200px] lg:min-h-auto">
              {translatedText ? (
                <>
                  <div className="flex-1 relative z-10 overflow-y-auto max-h-[40vh] lg:max-h-full">
                    <p className="text-xl md:text-2xl lg:text-3xl font-normal text-indigo-100 leading-relaxed">
                      {translatedText}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 md:gap-3 mt-4 md:mt-6 relative z-10">
                    <button
                      onClick={() => speakText(translatedText, targetLang)}
                      className="p-2 md:p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Volume2 size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      className="p-2 md:p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      {copied ? <Check size={20} className="text-green-400 md:w-6 md:h-6" /> : <Copy size={20} className="md:w-6 md:h-6" />}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-4 select-none">
                  <p className="font-medium text-base md:text-lg tracking-wide opacity-50">Translation will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <div className="p-4 bg-white/5 border-t border-white/5 backdrop-blur-md">
            <button
              onClick={handleTranslate}
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 text-white text-lg font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.3)] transform transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">Translate</span>
                  <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Phrases */}
        {presetPhrases.length > 0 && (
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1 flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" /> Quick Phrases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {presetPhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => handlePhraseClick(phrase)}
                  className="group relative p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all text-left duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-900/20 backdrop-blur-sm"
                >
                  <p className="font-semibold text-indigo-100 group-hover:text-white transition-colors text-lg">
                    {phrase.english}
                  </p>
                  {phrase.hindi && (
                    <p className="text-sm text-slate-400 mt-2 font-light">{phrase.hindi}</p>
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
