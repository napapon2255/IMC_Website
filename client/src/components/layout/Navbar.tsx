import { Link, useLocation } from "wouter";
import { Menu, Globe } from "lucide-react";
// 1. เพิ่ม useEffect เข้ามาด้วย
import { useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import imcLogo from "@/assets/images/Logo-IMC.png";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  
  // เรียกใช้ตัวแปรและฟังก์ชันจากส่วนกลาง
  const { language, toggleLanguage, t } = useLanguage();

  // กำหนดเมนูพร้อมคำแปล
  const navLinks = [
    { name: t("หน้าหลัก", "Home"), href: "#home" },
    { name: t("สินค้า", "Products"), href: "#products" },
    { name: t("บริการ", "Service"), href: "#services" },
    { name: t("ข่าวสาร", "News"), href: "#" },
    { name: t("ติดต่อเรา", "Contact"), href: "#contact" },
  ];

  // ฟังก์ชันจัดการการนำทาง (Scroll หรือ Redirect)
  const handleNavigation = (id: string) => {
    setIsOpen(false);
    
    if (id === "#") return;

    if (location === "/") {
      // กรณีอยู่หน้าแรก: ให้เลื่อนหา Section
      if (id === "#home") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // กรณีอยู่หน้าอื่น: ให้กลับหน้าแรก
      setLocation("/");
      // (Optional) ถ้าต้องการให้กลับไปแล้วเลื่อนไปหาจุดนั้นเลย อาจต้องใช้ Logic เพิ่มเติมในหน้า Home
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          
          {/* 1. Logo รูปภาพ */}
          <div className="flex items-center gap-2" onClick={() => handleNavigation("#home")}>
            <a href="#home" className="cursor-pointer flex items-center gap-2" onClick={(e) => e.preventDefault()}>
              <img
                 src={imcLogo}
                 alt="IMC Metrological Center"
                 className="h-12 w-auto object-contain"
               />
              <div className="hidden md:block">
                <span className="block font-heading font-bold text-primary leading-none">INCTECT</span>
                <span className="block text-[10px] font-medium text-muted-foreground tracking-widest">METROLOGICAL CENTER</span>
              </div>
            </a>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* ปุ่มเปลี่ยนภาษา Desktop */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-2 hover:bg-slate-100"
            >
              <Globe className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">{language}</span>
            </Button>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <Button onClick={() => handleNavigation("#contact")}>
              {t("ขอใบเสนอราคา", "Get Quote")}
            </Button>
          </div>

          {/* 3. Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
             {/* ปุ่มเปลี่ยนภาษา Mobile (อยู่นอกเมนูเพื่อให้กดง่าย) */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 h-8"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold">{language}</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href);
                      }}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button className="w-full" onClick={() => handleNavigation("#contact")}>
                    {t("ขอใบเสนอราคา", "Get Quote")}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}