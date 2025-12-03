import { Link, useLocation } from "wouter"; // 1. เพิ่ม useLocation
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import imcLogo from "@/assets/images/Logo-IMC.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation(); // 2. ดึงค่า location ปัจจุบันมาใช้

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Service", href: "#services" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#contact" },
  ];

  // 3. ปรับแก้ฟังก์ชันการนำทาง
  const handleNavigation = (id: string) => {
    setIsOpen(false);
    
    // ถ้าลิ้งค์เป็น "#" เฉยๆ ไม่ต้องทำอะไร
    if (id === "#") return;

    // ตรวจสอบว่า "ตอนนี้อยู่หน้าแรก (Home)" หรือไม่?
    if (location === "/") {
      // --- กรณีอยู่หน้าแรกแล้ว ให้เลื่อนหา Section ---
      if (id === "#home") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // --- กรณีอยู่หน้าอื่น (เช่นหน้า Products) ---
      // สั่งให้กลับไปหน้าแรกทันที
      setLocation("/");
      
      // (Optional) ถ้าอยากให้พอกลับไปแล้วเลื่อนไปหา Section นั้นด้วย
      // อาจต้องใช้ setTimeout หรือเก็บ state เพิ่ม แต่เบื้องต้นแค่กลับหน้าแรกได้ก็แก้ปัญหาแล้วครับ
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - แก้ให้เรียกใช้ handleNavigation */}
          <div className="flex items-center gap-2" onClick={() => handleNavigation("#home")}>
            <a href="#home" className="cursor-pointer flex items-center gap-2" onClick={(e) => e.preventDefault()}>
              <img
                src={imcLogo}         // เรียกใช้ตัวแปรรูปภาพที่ import มา
                alt="IMC Logo"        // คำอธิบายรูปภาพสำหรับ SEO และการเข้าถึง
                className="h-12 w-auto object-contain" // กำหนดความสูง และให้ความกว้างปรับอัตโนมัติ
              />
              <div className="hidden md:block">
                <span className="block font-heading font-bold text-primary leading-none">INCTECT</span>
                <span className="block text-[10px] font-medium text-muted-foreground tracking-widest">METROLOGICAL CENTER</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href); // แก้ให้ใช้ฟังก์ชันใหม่
                }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button onClick={() => handleNavigation("#contact")}>Get Quote</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
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
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href); // แก้ให้ใช้ฟังก์ชันใหม่
                      }}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button className="w-full" onClick={() => handleNavigation("#contact")}>Get Quote</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}