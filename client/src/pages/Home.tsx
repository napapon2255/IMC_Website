import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Certified from "@/components/sections/Certified";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t(
      "หน้าหลัก | INCTECT Metrological Center",  
      "Home | INCTECT Metrological Center"              
    );
  }, [language, t]); 

  return (
    <div className="min-h-screen bg-background font-sans">
      <main>

        <Hero />
        <Products />
        <Certified />
        <Contact />
      </main>
    </div>
  );
}