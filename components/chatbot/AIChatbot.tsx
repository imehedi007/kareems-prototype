"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Greetings from Kareem's. I am your Royal Culinary Assistant. How may I assist in planning your feast today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    { q: "What are your most popular dishes?", keywords: ["popular", "best", "famous"] },
    { q: "Do you offer delivery?", keywords: ["delivery", "deliver", "shipping"] },
    { q: "What vegetarian options are available?", keywords: ["vegetarian", "veg", "paneer", "daal"] },
    { q: "What are your opening hours?", keywords: ["hours", "open", "close", "timing"] },
    { q: "Can I make a reservation?", keywords: ["reservation", "reserve", "book", "table"] },
    { q: "Are there any current offers?", keywords: ["offers", "offer", "discount", "promo", "deal"] },
  ];

  const responses: Record<string, string> = {
    popular: "Our royal favorites are the Mutton Dum Biryani (৳950), Peshawari Chapli Kebab (৳690), and our signature Kareem's Nalli Nihari (৳890). They are prepared using secret spice formulations passed down through generations.",
    delivery: "Indeed, we offer delivery services within Dhaka! Delivery is free for all royal feasts totaling over ৳3000. For orders under ৳3000, a small delivery tribute of ৳100 is charged.",
    vegetarian: "For our vegetarian guests, we serve delicious options including Malai Paneer Tikka (৳650), Paneer Butter Masala (৳690), and our rich Daal Makhani (৳590) cooked overnight with double cream.",
    hours: "Our culinary chambers are open: Monday to Friday from 12:00 PM to 12:00 AM, and Saturday to Sunday from 11:00 AM to 1:00 AM.",
    reservation: "Yes! You can reserve a table by calling our front desk directly at +880 1678-222087. We recommend booking in advance, especially for weekend feasts.",
    offers: "Celebrate your feast with 15% OFF on home deliveries! Simply apply the promo code **ROYAL15** in your cart during checkout to redeem your royal discount.",
    generic: "I hear your request! As a digital prototype assistant, I recommend asking about our opening hours, popular dishes, delivery options, table reservations, or current discounts. You can also click the suggestions below."
  };

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotResponse = (userInput: string): string => {
    const cleanInput = userInput.toLowerCase();
    for (const preset of presets) {
      for (const keyword of preset.keywords) {
        if (cleanInput.includes(keyword)) {
          return responses[keyword];
        }
      }
    }
    return responses.generic;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botReply = getBotResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-16 z-40 flex flex-col items-end">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-[90vw] sm:w-[400px] h-[500px] bg-brand-card/95 border border-brand-gold/20 rounded-2xl flex flex-col shadow-2xl mb-4 overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-brand-dark/90 border-b border-brand-gold/15 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-brand-gold tracking-wide uppercase">
                    Kareem's Assistant
                  </h3>
                  <span className="text-[10px] text-green-400 font-semibold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                    <span>Royal Butler Online</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-cream/60 hover:text-brand-gold p-1 rounded-full hover:bg-brand-card transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                      msg.sender === "user"
                        ? "bg-brand-crimson text-brand-cream rounded-tr-none"
                        : "bg-brand-dark/60 border border-brand-gold/10 text-brand-cream/90 rounded-tl-none leading-relaxed"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-brand-dark/60 border border-brand-gold/10 rounded-2xl rounded-tl-none px-4 py-3 flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets Suggestions */}
            <div className="p-3 bg-brand-dark/40 border-t border-brand-gold/10 flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
              {presets.map((preset) => (
                <button
                  key={preset.q}
                  onClick={() => handleSendMessage(preset.q)}
                  className="bg-brand-card hover:bg-brand-gold/15 border border-brand-gold/10 hover:border-brand-gold/40 text-[10px] text-brand-cream/80 hover:text-brand-gold px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left"
                >
                  {preset.q}
                </button>
              ))}
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-brand-gold/15 bg-brand-dark/90 flex space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about hours, delivery, popular dishes..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-brand-card border border-brand-gold/10 focus:border-brand-gold text-xs text-brand-cream rounded-full px-4 py-2 focus:outline-none placeholder-brand-cream/30"
              />
              <button
                type="submit"
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-dark p-2.5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-all duration-300 relative border border-brand-gold/20 cursor-pointer"
        aria-label="Toggle assistant"
      >
        <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-brand-dark animate-pulse z-10" />
      </button>
    </div>
  );
};
