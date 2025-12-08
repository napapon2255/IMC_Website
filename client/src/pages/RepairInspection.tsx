import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, Wrench, CheckCircle2, Zap, 
  Cpu, Settings, FileText, Download, Award, Settings2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

// Import Data
import repairData from "@/data/repair_inspection_data.json";

// Import Images
import autoclaveImg from "@/assets/images/Renovate-Autoclave.jpg";
import pmImg from "@/assets/images/Test-load-Ammo.jpg";
import designImg from "@/assets/images/Ammo-Load.jpg";

const imageMap: any = {
  "Renovate-Autoclave.jpg": autoclaveImg,
  "Test-load-Ammo.jpg": pmImg,
  "Ammo-Load.jpg": designImg
};

export default function RepairInspection() {
  const { t, language } = useLanguage();
  const { header, intro, services, projects, sidebar_services, sidebar_services_th } = repairData;

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
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <Wrench className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              {language === "TH" ? header.title_th : header.title_en}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl ml-15">
            {language === "TH" ? intro.description_th : intro.description_en}
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              {t("บริการหลัก", "Our Services")}
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const serviceTitle = language === "TH" ? service.title_th : service.title_en;
              const serviceDesc = language === "TH" ? service.description_th : service.description_en;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                      <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">
                        {serviceTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {serviceDesc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects/Cases Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              {t("โครงการตัวอย่าง", "Sample Projects")}
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => {
              const projTitle = language === "TH" ? project.title_th : project.title_en;
              const projDesc = language === "TH" ? project.description_th : project.description_en;
              const imgSrc = imageMap[project.image];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                      
                      {/* Image Side */}
                      <div className="lg:w-2/5 bg-slate-100 p-6 flex items-center justify-center">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm bg-white">
                          <img 
                            src={imgSrc} 
                            alt={projTitle}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="lg:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                            {t("โครงการ", "Project")} {index + 1}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                          {projTitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {projDesc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{t("ความเร็ว", "Fast Service")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("บริการรวดเร็วพร้อมใบรับรองผลการตรวจสอบ", "Quick service with certified inspection reports")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <Award className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{t("มาตรฐาน", "Standards")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("สอบเทียบตามมาตรฐาน ISO/IEC 17025", "Calibration per ISO/IEC 17025 standards")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                  <Settings className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{t("บริการอื่นๆ", "More Services")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("ปรับปรุงระบบ ติดตั้ง PLC และซอฟต์แวร์", "System upgrades, PLC installation & software")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
