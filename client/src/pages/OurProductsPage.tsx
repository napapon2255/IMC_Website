import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
// 1. Import JSON เข้ามา
import brandsData from "../data/brands.json";
import labOverviewImage from "@/assets/images/laboratory-overview.png";
// 2. Import Context ภาษา
import { useLanguage } from "@/context/LanguageContext";

// กำหนด Type ของข้อมูล JSON เพื่อให้ TypeScript ไม่แจ้งเตือน (Optional)
interface Brand {
  id: string;
  name: string;
  logo: string;
  description_en: string;
  description_th: string;
}

export default function OurProductsPage() {
  // 3. ดึงค่า language และ t function
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link href="/">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-white/80 font-medium text-sm tracking-wide uppercase">
                {t("ศูนย์กลางของเรา", "Our Center")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              {t("แบรนด์และผู้จำหน่าย", "Our Brands & Suppliers")}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl leading-relaxed font-light">
              {t(
                "ตัวแทนจำหน่ายอย่างเป็นทางการของแบรนด์ชั้นนำจากทั่วโลก ที่มีคุณภาพและนวัตกรรมอันดับแรก",
                "Official distributors of the world's leading brands with superior quality and innovation"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 relative z-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white"
        >
          <img
            src={labOverviewImage}
            alt="Laboratory overview"
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </motion.div>
      </section>

      {/* Brands Section */}
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {t("สำรวจแบรนด์ของเรา", "Explore Our Partners")}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </motion.div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(brandsData as Brand[]).map((brand, index) => {
              const displayDescription = language === "TH" ? brand.description_th : brand.description_en;

              return (
                <motion.div
                  key={brand.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/brands/${brand.id}`}>
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden cursor-pointer">
                      {/* Card Background Gradient */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-300"></div>

                      <CardHeader className="pb-4 relative z-10">
                        {/* Logo Container */}
                        <div className="h-24 w-full rounded-xl bg-blue-600 flex items-center justify-center mb-4 overflow-hidden border border-blue-500 shadow-md">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-20 max-w-full object-contain px-4 group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Brand Name */}
                        <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                          {brand.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative z-10">
                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {displayDescription}
                        </p>

                        {/* View Products Link */}
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                          <span className="text-sm">{t("ดูสินค้า", "View Products")}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            {t("ต้องการข้อมูลเพิ่มเติม?", "Need More Information?")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t(
              "ติดต่อทีมของเราเพื่อรับการสนับสนุนด้านผลิตภัณฑ์ หรือขอใบเสนอราคา",
              "Contact our team for product support or quotation requests"
            )}
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg">
              {t("ติดต่อเรา", "Contact Us")}
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}