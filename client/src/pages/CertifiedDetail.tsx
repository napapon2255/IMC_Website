import { useParams, Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react"; // เพิ่ม icon เช็คถูกสวยๆ
import certifiedData from "@/data/certified_data.json"; // ตรวจสอบ path ให้ถูกต้อง
import { useLanguage } from "@/context/LanguageContext"; // เรียกใช้ Context ภาษา

export default function CertifiedDetail() {
  const { t, language } = useLanguage();
  const params = useParams();
  const categoryId = params.category; 

  // ค้นหาข้อมูลใน JSON
  const currentData = certifiedData.find(item => item.id === categoryId);

  // กรณีหาไม่เจอ
  if (!currentData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          {t("ไม่พบข้อมูลหมวดหมู่", "Category not found")}
        </h2>
        <Link href="/">
          <button className="text-primary hover:underline">
            {t("กลับหน้าหลัก", "Back to Home")}
          </button>
        </Link>
      </div>
    );
  }

  // เตรียมตัวแปรสำหรับแสดงผลตามภาษา
  const displayName = language === "TH" ? currentData.name_th : currentData.name_en;
  const displayDesc = language === "TH" ? currentData.desc_th : currentData.desc_en;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* ปุ่มย้อนกลับ */}
        <Link href="/">
          <button className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
          </button>
        </Link>

        {/* การ์ดเนื้อหาหลัก */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 overflow-hidden relative">
          
          {/* ตกแต่งพื้นหลังเล็กน้อย */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8"></div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {t(`บริการสอบเทียบ${displayName}`, `${displayName} Calibration`)}
            </h1>
            
            <div className="h-1.5 w-24 bg-accent rounded-full mb-8"></div>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {displayDesc}
            </p>

            {/* กล่อง Service Scope */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                 {t("ขอบเขตการให้บริการ", "Service Scope")}
               </h3>
               <ul className="space-y-3">
                 <li className="flex items-start text-slate-600">
                   <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                   <span>{t("การทดสอบและตรวจสอบช่วงการวัด", "Range testing and verification")}</span>
                 </li>
                 <li className="flex items-start text-slate-600">
                   <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                   <span>{t("ใบรับรองมาตรฐาน ISO/IEC 17025", "ISO/IEC 17025 Compliant Certificate")}</span>
                 </li>
                 <li className="flex items-start text-slate-600">
                   <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                   <span>{t("ความสามารถสอบกลับได้สู่มาตรฐานแห่งชาติ", "Traceability to National Standards")}</span>
                 </li>
               </ul>
            </div>

            {/* ปุ่ม Call to Action */}
            <div className="mt-8 flex justify-end">
               <Link href="/#contact">
                 <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md">
                   {t("ขอใบเสนอราคา", "Request a Quote")}
                 </button>
               </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}