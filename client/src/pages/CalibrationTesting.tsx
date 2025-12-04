import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, ArrowRight, Zap, Thermometer, Gauge, Scale, 
  Activity, Ruler, FlaskConical, HardHat, Map, FileCheck, Settings2,
  FileText, Download, Award, FileSpreadsheet // เพิ่มไอคอนสำหรับส่วนดาวน์โหลด
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import calibrationData from "@/data/calibration_data.json"; 
import calibrationImage from "@/assets/images/laboratory-overview.png"; // (ตรวจสอบชื่อไฟล์รูปให้ถูกนะครับ)
import { useLanguage } from "@/context/LanguageContext"; 

const iconMap: any = {
  Zap, Thermometer, Gauge, Scale, Activity, 
  Ruler, FlaskConical, HardHat, Map, FileCheck, Settings2
};

export default function CalibrationTesting() {
  const { t, language } = useLanguage();

  // ข้อมูลไฟล์ดาวน์โหลด (ปรับแก้ path ไฟล์ตรงนี้ได้เลย)
  const downloadFiles = [
    {
      title_en: "Certificate of Accredited by A2LA (U.S.A.)",
      title_th: "ใบรับรองการรับรองโดย A2LA (สหรัฐอเมริกา)",
      file: "/files/Accredit Certificate IMC 17025.pdf", // ใส่ชื่อไฟล์จริงที่นี่
      icon: Award,
      color: "text-blue-600"
    },
    {
      title_en: "Certificate of Accredited by TISI (Thailand)",
      title_th: "ใบรับรองการรับรองโดย สมอ. (TISI)",
      file: "/files/Certificate 17025 (English).pdf", // ใส่ชื่อไฟล์จริงที่นี่
      icon: Award,
      color: "text-blue-600"
    },
    {
      title_en: "Range of Accreditation",
      title_th: "ขอบข่ายการรับรอง (Scope)",
      file: "/files/List Calibration IMC 2021..pdf", // ใส่ชื่อไฟล์จริงที่นี่
      icon: FileCheck,
      color: "text-green-600"
    },
    {
      title_en: "Calibration Price List",
      title_th: "รายการราคาค่าบริการสอบเทียบ",
      file: "/files/Price List Calibration IMC 2021..pdf", // ใส่ชื่อไฟล์จริงที่นี่
      icon: FileSpreadsheet,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header Section */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t("บริการสอบเทียบห้องปฏิบัติการ", "Calibration Laboratory")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t(
              "บริการสอบเทียบมาตรฐาน ISO/IEC 17025 ครอบคลุมทุกด้าน ทั้งในและนอกสถานที่",
              "Accredited ISO/IEC 17025 calibration services, available both In-house and On-site."
            )}
          </p>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="container mx-auto px-4 md:px-6 mt-8">
        <div className="rounded-xl overflow-hidden shadow-lg relative h-[300px] md:h-[400px]">
           <img
             src={calibrationImage} 
             alt="Calibration Laboratory"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calibrationData.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Settings2;
              const displayName = language === "TH" ? item.name_th : item.name_en;
              const displayDesc = language === "TH" ? item.desc_th : item.desc_en;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link href={item.href}>
                    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </div>
                        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors min-h-[3.5rem] flex items-center">
                          {displayName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {displayDesc}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* ส่วนใหม่: Downloads & Accreditation Section */}
      {/* ========================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              {t("เอกสารรับรองและการดาวน์โหลด", "Accreditation & Downloads")}
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "ทางบริษัทฯ ได้รับการรับรอง Accreditation ISO/IEC 17025 : 2017 ทั้งแบบ In-house และ On-site",
                "Our company is accredited with ISO/IEC 17025:2017 for both In-house and On-site calibration."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {downloadFiles.map((doc, index) => (
              <a 
                key={index} 
                href={doc.file} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
                download // บังคับให้ดาวน์โหลดเมื่อคลิก
              >
                <div className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-md hover:bg-slate-50 transition-all duration-300 cursor-pointer group bg-white">
                  {/* Icon Box */}
                  <div className={`h-12 w-12 rounded-lg ${doc.color} bg-opacity-10 flex items-center justify-center mr-4 shrink-0`}>
                    <doc.icon className={`h-6 w-6 ${doc.color}`} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                      {language === "TH" ? doc.title_th : doc.title_en}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <FileText className="h-3 w-3 mr-1" /> PDF Document
                    </p>
                  </div>

                  {/* Download Arrow */}
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Download className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}