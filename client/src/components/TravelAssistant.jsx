import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const TravelAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your BharatYatra Assistant. Tell me where you want to go, or ask me to plan a trip!" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInputMsg("");
    setIsTyping(true);

    try {
      const res = await api.post("/chat/parse", { message: userText });
      const reply = res.data?.data;
      
      if (reply?.intent === "itinerary") {
        setMessages(prev => [...prev, { role: "bot", text: reply.message || "Generating your smart itinerary now..." }]);
        
        setTimeout(() => {
            navigate("/itinerary");
            setIsOpen(false);
        }, 1500);

      } else {
        setMessages(prev => [...prev, { role: "bot", text: reply?.message || "I didn't quite catch that. Can you specify a location and duration?" }]);
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={"fixed bottom-6 right-6 p-4 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-300 z-50 " + (isOpen ? "hidden" : "")}
      >
        <MessageSquare size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700 flex flex-col h-[500px] animate-fade-in-up">
          <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <div>
                <h3 className="font-bold text-sm">BharatYatra AI</h3>
                <p className="text-[10px] text-emerald-100">Always online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-200 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[80%] p-3 rounded-2xl text-sm " + (m.role === "user" ? "bg-emerald-600 text-white rounded-tr-sm" : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-sm shadow-sm")}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                placeholder="Where to? (e.g. 3 days in Kerala)"
                className="w-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500/20 rounded-full pl-4 pr-12 py-3 text-sm outline-none transition-all dark:text-white"
              />
              <button 
                type="submit" 
                disabled={!inputMsg.trim() || isTyping}
                className="absolute right-2 p-1.5 text-emerald-600 dark:text-emerald-400 disabled:opacity-50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors"
               >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TravelAssistant;
