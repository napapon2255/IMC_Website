import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, CheckCircle2, FileText, Video,
  Cpu, Activity, Wifi, Settings, ArrowRight, Play
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

// Import Data
import renovateData from "@/data/renovate_data.json";

// Import Images
import designImg from "@/assets/images/Ammo-Load.jpg";
import autoclaveImg from "@/assets/images/Renovate-Autoclave.jpg";
import retroImg from "@/assets/images/Ammo-Load-Renovate.jpg";
import pmImg from "@/assets/images/Test-load-Ammo.jpg";
import softImg from "@/assets/images/soft-003.jpg";
import wirelessImg from "@/assets/images/Wireless-temp-humid.jpg";
import autoPlcImg from "@/assets/images/auto-plc.png"; 
import autoPanelImg from "@/assets/images/auto-panel.png";

const imageMap: any = {
  "Ammo-Load.jpg": designImg,
  "Renovate-Autoclave.jpg": autoclaveImg,
  "Ammo-Load-Renovate.jpg": retroImg,
  "Test-load-Ammo.jpg": pmImg,
  "soft-003.jpg": softImg,
  "Wireless-temp-humid.jpg": wirelessImg
};

export default function RenovateService() {
  const { t, language } = useLanguage();
  const { intro, projects, wireless } = renovateData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 50 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Modern Hero Section */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4472C4]/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4472C4]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 pl-0 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-[#4472C4] hover:bg-[#365999] text-white px-3 py-1 text-sm font-medium">
                  Industrial Solutions
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                  {language === "TH" ? intro.title_th : intro.title_en}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                  {language === "TH" ? intro.description_th : intro.description_en}
                </p>
              </motion.div>
            </div>

            {/* Hero Image Grid */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4 mt-8"
              >
                <div className="h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src={autoPlcImg} alt="PLC" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="h-32 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src={designImg} alt="Design" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="h-32 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src={autoPanelImg} alt="Panel" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                   <img src={autoclaveImg} alt="Autoclave" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Renovate & Preventive Maintenance
            </h2>
            <div className="w-20 h-1 bg-[#4472C4] mx-auto rounded-full mb-4" />
            <p className="text-slate-600">
              Modernizing machinery for Thailand 4.0 with advanced automation, safety integration, and data recording capabilities.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-12"
          >
            {projects.map((item, index) => {
              const title = language === "TH" ? item.title_th : item.title_en;
              const desc = language === "TH" ? item.desc_th : item.desc_en;
              const ref = language === "TH" ? item.reference_th : item.reference_en;
              const imgSrc = imageMap[item.image];
              const isEven = index % 2 === 0;

              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center group`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video lg:aspect-[4/3] group-hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={imgSrc} 
                        alt={title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                      {(item.has_youtube || item.has_pdf) && (
                        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                           {item.has_youtube && (
                             <Badge className="bg-red-600 hover:bg-red-700 text-white border-0 gap-1 pl-1 pr-2 py-1">
                               <Play className="h-3 w-3 fill-current" /> Video
                             </Badge>
                           )}
                           {item.has_pdf && (
                             <Badge className="bg-slate-800 hover:bg-slate-900 text-white border-0 gap-1 pl-1 pr-2 py-1">
                               <FileText className="h-3 w-3" /> PDF
                             </Badge>
                           )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 lg:px-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-[#4472C4]/10 flex items-center justify-center text-[#4472C4]">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-[#4472C4] uppercase tracking-wider">Project {index + 1}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#4472C4] transition-colors">
                      {title}
                    </h3>
                    
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {desc}
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                       <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                         <CheckCircle2 className="h-4 w-4 text-green-500" />
                         {ref}
                       </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Modern Wireless Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div>
                <Badge variant="outline" className="text-[#4472C4] border-[#4472C4] mb-4">IoT Solutions</Badge>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  {language === "TH" ? wireless.title_th : wireless.title_en}
                </h2>
                <p className="text-slate-400 text-lg">
                  Real-time environmental monitoring for critical infrastructure. Secure, reliable, and accessible from anywhere.
                </p>
              </div>

              <div className="grid gap-4">
                {(language === "TH" ? wireless.features_th : wireless.features_en).map((feat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#4472C4] flex items-center justify-center mr-4 shrink-0">
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">{feat}</span>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="bg-[#4472C4] hover:bg-[#365999] text-white rounded-full mt-4">
                <FileText className="mr-2 h-4 w-4" /> Download Technical Specs
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-sm">
                 <img src={imageMap[wireless.image]} alt="Wireless System" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Site Reference Strip */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-slate-400 font-medium mb-8 uppercase tracking-widest text-sm">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Using text for now, ideally replace with SVG logos */}
             <span className="text-xl font-bold text-slate-800">กองทัพบก</span>
             <span className="text-xl font-bold text-slate-800">EGAT</span>
             <span className="text-xl font-bold text-slate-800">PTT Group</span>
             <span className="text-xl font-bold text-slate-800">CPF</span>
             <span className="text-xl font-bold text-slate-800">DUCATI</span>
             <span className="text-xl font-bold text-slate-800">GM</span>
             <span className="text-xl font-bold text-slate-800">BRIDGESTONE</span>
          </div>
        </div>
      </section>

    </div>
  );
}