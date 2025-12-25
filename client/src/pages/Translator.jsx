import { useState } from "react";
import API from "../services/api";

const Translator = () => {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await API.post("/translate", {
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

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <h1>🌍 Language Translator</h1>

      <textarea
        rows="4"
        placeholder="Enter text in English"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="kn">Kannada</option>
        <option value="ml">Malayalam</option>
      </select>

      <br /><br />

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full" onClick={handleTranslate}>
        {loading ? "Translating..." : "Translate"}
      </button>

      <br /><br />

      {translatedText && (
        <>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </>
      )}
    </div>
  );
};

export default Translator;
