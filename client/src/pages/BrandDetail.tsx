import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Thermometer,
  Gauge,
  Anchor,
  Activity,
  Scale,
  Droplets,
  Zap,
  HeartPulse,
  Syringe,
  Wind,
  Layers,
  Box,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { getBrands, getCategoriesByBrand, Brand, Category } from "@/lib/supabase";

export default function BrandDetail() {
  const { t, language } = useLanguage();
  const [match, params] = useRoute("/brands/:brandId");
  const [brandInfo, setBrandInfo] = useState<Brand | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const brandId = params?.brandId as string;

  useEffect(() => {
    if (brandId) {
      loadData();
    }
  }, [brandId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load brand info
      const brands = await getBrands();
      const brand = brands.find(b => b.id === brandId);
      setBrandInfo(brand || null);

      // Load categories
      const cats = await getCategoriesByBrand(brandId);
      setCategories(cats);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  // Helper to get icon based on category title
  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("temp")) return <Thermometer className="h-6 w-6 text-orange-500" />;
    if (lowerTitle.includes("pressure") || lowerTitle.includes("calib")) return <Gauge className="h-6 w-6 text-blue-500" />;
    if (lowerTitle.includes("marine")) return <Anchor className="h-6 w-6 text-indigo-500" />;
    if (lowerTitle.includes("level") || lowerTitle.includes("flow")) return <Layers className="h-6 w-6 text-cyan-500" />;
    if (lowerTitle.includes("electric") || lowerTitle.includes("test")) return <Zap className="h-6 w-6 text-yellow-500" />;
    if (lowerTitle.includes("patient") || lowerTitle.includes("medical")) return <HeartPulse className="h-6 w-6 text-rose-500" />;
    if (lowerTitle.includes("breath") || lowerTitle.includes("lung") || lowerTitle.includes("air")) return <Wind className="h-6 w-6 text-sky-500" />;
    if (lowerTitle.includes("analy") || lowerTitle.includes("diag")) return <Activity className="h-6 w-6 text-emerald-500" />;
    if (lowerTitle.includes("weigh") || lowerTitle.includes("scale")) return <Scale className="h-6 w-6 text-slate-500" />;

    return <Box className="h-6 w-6 text-primary" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!match || !brandInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-800">{t("แบรนด์ไม่พบ", "Brand not found")}</h1>
          <Link href="/">
            <Button>{t("กลับหน้าหลัก", "Back to Home")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-slate-100 py-16 lg:py-24 z-10 overflow-hidden">
        {/* Background Image with Overlay */}
        {brandInfo.cover_image && (
          <div className="absolute inset-0 z-0">
            <img
              src={brandInfo.cover_image}
              alt={`${brandInfo.name} Background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/40" />
          </div>
        )}

        {/* Fallback Background (if no image) */}
        {!brandInfo.cover_image && (
          <div className="absolute inset-0 z-0 bg-white/80 backdrop-blur-md" />
        )}

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/products/our-products">
            <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 hover:bg-transparent transition-all text-slate-500 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าแบรนด์", "Back to Brands")}
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-blue-600 shadow-xl shadow-blue-200/50 flex items-center justify-center p-4 border border-blue-500"
            >
              <img
                src={brandInfo.logo || ''}
                alt={brandInfo.name}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>

            <div className="text-center md:text-left flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl md:text-6xl font-heading font-bold tracking-tight ${brandInfo.cover_image ? 'text-white' : 'text-slate-900'}`}
              >
                {brandInfo.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`mt-4 text-lg md:text-xl max-w-2xl leading-relaxed ${brandInfo.cover_image ? 'text-slate-200' : 'text-slate-500'}`}
              >
                {language === "TH" ? brandInfo.description_th : brandInfo.description_en}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Categories Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                {t("รายการสินค้า", "Product Catalog")}
              </h2>
              <div className="h-1.5 w-12 bg-primary mt-2 rounded-full"></div>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">{t("ยังไม่มีหมวดหมู่สินค้า", "No categories available")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category, index) => {
                const categoryTitle = language === "TH" ? category.title_th : category.title_en;
                const categoryItems = language === "TH" ? category.items_th : category.items_en;
                const items = categoryItems ? categoryItems.split(", ") : [];

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <Link href={`/brands/${brandId}/category/${index}`}>
                      <Card className="h-full border-0 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-slate-100 cursor-pointer group">
                        <div className={`h-1.5 w-full ${index % 4 === 0 ? "bg-blue-500" :
                          index % 4 === 1 ? "bg-indigo-500" :
                            index % 4 === 2 ? "bg-cyan-500" : "bg-teal-500"
                          }`} />

                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                              {getCategoryIcon(category.title_en)}
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                              {categoryTitle}
                            </CardTitle>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {items.slice(0, 5).map((item: string, itemIdx: number) => (
                              <Badge
                                key={itemIdx}
                                variant="secondary"
                                className="bg-slate-50 group-hover:bg-white text-slate-600 border-slate-100 transition-colors py-1.5 px-3 text-sm font-normal"
                              >
                                {item.trim()}
                              </Badge>
                            ))}
                            {items.length > 5 && (
                              <Badge variant="outline" className="bg-transparent text-muted-foreground border-dashed">
                                +{items.length - 5} {t("เพิ่มเติม", "More")}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 p-12 md:p-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                {t("ต้องการสอบถามข้อมูลเพิ่ม?", "Need more information?")}
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                {t(
                  "ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและใบเสนอราคาสำหรับผลิตภัณฑ์ที่คุณสนใจ",
                  "Our team of experts is ready to provide consultation and quotations for the products you are interested in."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-blue-600 text-white font-semibold px-8 h-12 rounded-full shadow-lg shadow-primary/25">
                    {t("ติดต่อเรา", "Contact Us")}
                  </Button>
                </Link>
                <Link href="/products/our-products">
                  <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent h-12 rounded-full px-8">
                    {t("ดูสินค้าอื่นๆ", "View Other Brands")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
