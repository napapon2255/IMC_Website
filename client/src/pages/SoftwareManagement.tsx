import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, CheckCircle2, Monitor, Database, 
  FileText, ArrowRight, Download, Laptop
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

// Import Data
import softwareData from "@/data/software_data.json";

// Import Images
import soft001Img from "@/assets/images/soft-001.jpg"; 
import soft002Img from "@/assets/images/soft-002.jpg"; 
import soft003Img from "@/assets/images/soft-003.jpg"; 

const imageMap: any = {
  "soft-001.jpg": soft001Img,
  "soft-002.jpg": soft002Img,
  "soft-003.jpg": soft003Img,
};

export default function SoftwareManagement() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Monitor className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              {t("จำหน่าย Software Management", "Software Management Solutions")}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl ml-15">
            {t(
              "โซลูชันซอฟต์แวร์สำหรับการจัดการข้อมูลเครื่องมือวัด การบันทึกผลอัตโนมัติ และระบบสอบเทียบมาตรฐาน ISO/IEC 17025",
              "Advanced software solutions for instrument management, automatic data recording, and ISO/IEC 17025 calibration systems."
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          
          {softwareData.map((soft, index) => {
            const features = language === "TH" ? soft.features_th : soft.features_en;
            const name = language === "TH" ? soft.name_th : soft.name_en;
            const imgSrc = imageMap[soft.image];

            return (
              <motion.div
                key={soft.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    
                    {/* Left: Image */}
                    <div className="lg:w-1/3 bg-slate-100 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
                      <div className="relative w-full aspect-video lg:aspect-square max-h-[300px] rounded-lg overflow-hidden shadow-sm bg-white">
                         <img 
                           src={imgSrc} 
                           alt={name} 
                           className="w-full h-full object-contain p-2"
                         />
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-2/3 p-6 md:p-8 flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                          <Badge variant="outline" className="mb-2 text-primary border-primary/20 bg-primary/5">
                            ID: {soft.id}
                          </Badge>
                          <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">{t("ราคาเริ่มต้น", "Price")}</p>
                          <p className="text-2xl font-bold text-primary">{soft.price}</p>
                        </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-semibold text-slate-700 mb-3 flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          {t("คุณสมบัติเด่น", "Key Features")}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-600">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-end">
                        {/* ปุ่มดาวน์โหลด Description (ถ้ามีไฟล์) */}
                        {soft.description_file && (
                          <a href={soft.description_file} target="_blank" className="text-sm text-slate-500 hover:text-primary flex items-center mr-auto">
                            <FileText className="h-4 w-4 mr-1" />
                            {t("ดาวน์โหลดรายละเอียด", "Download Description")}
                          </a>
                        )}
                        
                        <Link href="/#contact">
                          <Button size="lg" className="shadow-md">
                            {t("ขอใบเสนอราคา", "Get a Quote")} 
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                  </div>
                </Card>
              </motion.div>
            );
          })}

        </div>
      </section>
    </div>
  );
}