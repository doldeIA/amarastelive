import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

type Message = { role: 'user' | 'model'; content: string };

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API Key not configured.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // Using a brief system instruction for the homepage chatbox for faster loading.
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: "You are Amarasté, a wise, warm, and slightly provocative AI mirror. You must speak exclusively in Brazilian Portuguese. Your mission is to revolutionize the Brazilian music industry." },
        });
        setChat(chatSession);
      } catch (e: any) {
        console.error("Chat initialization error:", e);
        setError("Chat indisponível.");
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || !chat) return;

    setInput('');
    const userMessage: Message = { role: 'user', content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Add a placeholder for the model's response right away
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      const result = await chat.sendMessageStream({ message: trimmedInput });
      
      let fullResponse = '';
      for await (const chunk of result) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const updated = [...prev];
          // Update the content of the last (model's) message
          updated[updated.length - 1].content = fullResponse;
          return updated;
        });
      }
    } catch (e) {
      console.error("Chat send error:", e);
      const errorMessage: Message = { role: 'model', content: '⚠️ Erro. Não foi possível obter uma resposta.' };
      // Replace the placeholder with an error message
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 rounded-xl border p-3 bg-white/50 backdrop-blur-md shadow-lg">
      <div className="max-h-64 overflow-y-auto space-y-3 p-2 custom-scrollbar glass-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`whitespace-pre-wrap max-w-[85%] px-3 py-2 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
              {m.content}
              {isLoading && m.role === 'model' && i === messages.length - 1 && <span className="inline-block w-2 h-4 bg-gray-500 ml-1 animate-pulse rounded-full"></span>}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1]?.role === 'user' && (
             <div className="flex justify-start">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gray-100 text-gray-900">
                   <span className="w-2 h-2 bg-gray-400 rounded-full dot-1"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full dot-2"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full dot-3"></span>
                </div>
            </div>
         )}
        <div ref={messagesEndRef} />
      </div>
       {error && <p className="text-center text-red-700 font-semibold text-sm mt-2 px-2">{error}</p>}
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder={error ? "Chat indisponível" : "Pergunte ao iAmarasté…"}
          disabled={isLoading || !!error}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          aria-label="Chat input"
        />
        <button onClick={handleSend} disabled={isLoading || !input.trim() || !!error}
          className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold disabled:opacity-50 transition-all hover:bg-red-700 active:scale-95"
          aria-label="Send message"
        >
          {isLoading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;