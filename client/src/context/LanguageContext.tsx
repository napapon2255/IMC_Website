// client/src/lib/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "TH" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (th: string, en: string) => string; // ฟังก์ชันช่วยเลือกคำ
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Logic เดิมจาก Navbar ย้ายมาที่นี่
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("app-language");
    return (savedLang as Language) || "EN";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "TH" : "EN"));
  };

  // ฟังก์ชัน Helper: รับค่าไทยและอังกฤษ แล้วคืนค่าตามภาษาปัจจุบัน
  const t = (th: string, en: string) => {
    return language === "TH" ? th : en;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook สำหรับเรียกใช้ในหน้าต่างๆ
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}