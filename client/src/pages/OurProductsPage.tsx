import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Settings2, Armchair, FlaskConical, Wind, ClipboardCheck, 
  Ruler, Zap, Thermometer, Gauge, Waves, Weight, Siren, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
// 1. Import JSON เข้ามา
import categoriesData from "../data/our-product-categories.json"; 
import labOverviewImage from "@/assets/images/laboratory-overview.png";
// 2. Import Context ภาษา
import { useLanguage } from "@/context/LanguageContext"; 

// จับคู่ Icon
const iconMap: any = {
  Settings2, Armchair, FlaskConical, Wind, ClipboardCheck,
  Ruler, Zap, Thermometer, Gauge, Waves, Weight, Siren
};

// กำหนด Type ของข้อมูล JSON เพื่อให้ TypeScript ไม่แจ้งเตือน (Optional)
interface CategoryItem {
  title_en: string;
  title_th: string;
  items_en: string;
  items_th: string;
  icon: string;
}

export default function OurProductsPage() {
  // 3. ดึงค่า language และ t function
  const { language, t } = useLanguage(); 

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
            {t("หมวดหมู่สินค้า", "Product Categories")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t(
              "สำรวจแคตตาล็อกเครื่องมืออุตสาหกรรม ห้องปฏิบัติการ และเครื่องมือวัดที่ครบครันของเรา",
              "Explore our comprehensive catalog of industrial, laboratory, and measurement equipment."
            )}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 mt-8">
        <div className="rounded-xl overflow-hidden shadow-lg">
           <img
             src={labOverviewImage}
             alt="Laboratory overview"
             className="w-full h-auto object-cover max-h-[500px]"
           />
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 4. วนลูปข้อมูลจาก JSON */}
            {(categoriesData as CategoryItem[]).map((cat, index) => {
              const IconComponent = iconMap[cat.icon] || Settings2;

              // 5. เลือกภาษาที่จะแสดงผล
              const displayTitle = language === "TH" ? cat.title_th : cat.title_en;
              const displayItems = language === "TH" ? cat.items_th : cat.items_en;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-slate-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                      <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors min-h-[3.5rem] flex items-center">
                        {displayTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      
                        {displayItems.split(',').map((item, i) => (
                          <span key={i} className="inline-block bg-slate-100 rounded-sm px-2 py-0.5 mr-1 mb-1 text-xs text-slate-600">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}