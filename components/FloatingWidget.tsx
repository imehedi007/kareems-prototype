"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Phone, Mail, MessageSquare } from "lucide-react";

export function FloatingWidget() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      setTheme("light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="fixed z-50 flex items-center bg-brand-card/95 backdrop-blur-md border border-brand-gold/20 shadow-2xl transition-all duration-300 
      /* Mobile layout (bottom center capsule) */
      bottom-6 left-1/2 -translate-x-1/2 flex-row rounded-full py-2.5 px-4.5 space-x-4 space-y-0
      /* Desktop layout (right dock) */
      md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col md:rounded-l-2xl md:rounded-r-none md:py-5 md:px-2.5 md:space-y-4 md:space-x-0 md:border-r-0 md:hover:pl-3.5 md:shadow-brand-gold/10"
    >
      {/* Theme Toggle Button */}
      <div className="relative group">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
        {/* Tooltip */}
        <span className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-brand-dark/95 border border-brand-gold/20 text-brand-gold rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>

      {/* Phone Action */}
      <div className="relative group">
        <a
          href="tel:+8801678222087"
          className="p-2.5 rounded-full border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Call chambers"
        >
          <Phone className="w-4.5 h-4.5" />
        </a>
        <span className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-brand-dark/95 border border-brand-gold/20 text-brand-gold rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Call Chambers
        </span>
      </div>

      {/* Email Action */}
      <div className="relative group">
        <a
          href="mailto:info@kareemsbd.com"
          className="p-2.5 rounded-full border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Email stewards"
        >
          <Mail className="w-4.5 h-4.5" />
        </a>
        <span className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-brand-dark/95 border border-brand-gold/20 text-brand-gold rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Email Stewards
        </span>
      </div>

      {/* Whatsapp Action */}
      <div className="relative group">
        <a
          href="https://wa.me/8801678222087"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Whatsapp chat"
        >
          {/* Custom SVG WhatsApp Logo */}
          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.871-6.963-1.854-1.855-4.323-2.877-6.959-2.878-5.441 0-9.865 4.42-9.869 9.86-.001 1.69.453 3.336 1.318 4.759L1.87 22.124l6.059-1.589zM17.47 14.77c-.3-.15-1.782-.88-2.062-.982-.28-.103-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.175.2-.35.224-.65.074-.3-.15-1.265-.467-2.41-1.487-.89-.794-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.68-1.64-.93-2.245-.244-.59-.49-.51-.68-.52-.176-.01-.376-.014-.576-.014-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.07 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.7.63.714.227 1.365.195 1.88.118.57-.085 1.78-.727 2.03-1.43.25-.7.25-1.3.175-1.43-.075-.13-.275-.2-.575-.35z" />
          </svg>
        </a>
        <span className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-brand-dark/95 border border-brand-gold/20 text-brand-gold rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Chat
        </span>
      </div>
    </div>
  );
}
