import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import certifiedData from "@/data/certified_data.json"; // ดึงข้อมูล JSON
import { useLanguage } from "@/context/LanguageContext"; // 1. เรียกใช้ Context ภาษา

// กำหนด Type ให้ TypeScript รู้จักโครงสร้างข้อมูล (Optional)
interface CertifiedItem {
  id: string;
  href: string;
  name_en: string;
  name_th: string;
}

export default function Certified() {
  // 2. ดึงฟังก์ชัน t (แปลภาษา) และตัวแปร language มาใช้
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          {/* 3. ใช้ t() เปลี่ยนภาษาหัวข้อ */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t("เครื่องมือที่ได้รับการรับรอง", "Certified Instruments")}
          </h2>
          {/* 4. ใช้ t() เปลี่ยนภาษาคำอธิบาย */}
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t(
              "ห้องปฏิบัติการของเราได้รับการรับรองมาตรฐานในการสอบเทียบและทดสอบเครื่องมือหลากหลายประเภท ครอบคลุมทุกสาขาอุตสาหกรรม",
              "Our laboratory is fully accredited to calibrate and test a wide range of instruments across multiple disciplines."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {(certifiedData as CertifiedItem[]).map((item) => {
            // 5. เลือกชื่อที่จะแสดงตามภาษาที่เลือก
            const displayName = language === "TH" ? item.name_th : item.name_en;

            return (
              <Link key={item.id} href={item.href} className="cursor-pointer group">
                <div 
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-accent/50 transition-all duration-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium group-hover:text-accent transition-colors">
                    {displayName}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}