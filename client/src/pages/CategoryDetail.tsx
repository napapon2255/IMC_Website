import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Box,
    Thermometer,
    Gauge,
    Anchor,
    Layers,
    Zap,
    HeartPulse,
    Wind,
    Activity,
    Scale,
    CheckCircle2,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { getBrands, getCategoriesByBrand, Brand, Category } from "@/lib/supabase";

export default function CategoryDetail() {
    const { t, language } = useLanguage();
    const [match, params] = useRoute("/brands/:brandId/category/:categoryIndex");
    const [brandInfo, setBrandInfo] = useState<Brand | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    const brandId = params?.brandId as string;
    const categoryIndex = parseInt(params?.categoryIndex as string);

    useEffect(() => {
        if (brandId) {
            loadData();
        }
    }, [brandId, categoryIndex]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load brand info
            const brands = await getBrands();
            const brand = brands.find(b => b.id === brandId);
            setBrandInfo(brand || null);

            // Load categories
            const cats = await getCategoriesByBrand(brandId);
            const cat = cats[categoryIndex];
            setCategory(cat || null);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    // Helper to get icon based on category title
    const getCategoryIcon = (title: string) => {
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes("temp")) return <Thermometer className="h-8 w-8 text-orange-500" />;
        if (lowerTitle.includes("pressure") || lowerTitle.includes("calib")) return <Gauge className="h-8 w-8 text-blue-500" />;
        if (lowerTitle.includes("marine")) return <Anchor className="h-8 w-8 text-indigo-500" />;
        if (lowerTitle.includes("level") || lowerTitle.includes("flow")) return <Layers className="h-8 w-8 text-cyan-500" />;
        if (lowerTitle.includes("electric") || lowerTitle.includes("test")) return <Zap className="h-8 w-8 text-yellow-500" />;
        if (lowerTitle.includes("patient") || lowerTitle.includes("medical")) return <HeartPulse className="h-8 w-8 text-rose-500" />;
        if (lowerTitle.includes("breath") || lowerTitle.includes("lung") || lowerTitle.includes("air")) return <Wind className="h-8 w-8 text-sky-500" />;
        if (lowerTitle.includes("analy") || lowerTitle.includes("diag")) return <Activity className="h-8 w-8 text-emerald-500" />;
        if (lowerTitle.includes("weigh") || lowerTitle.includes("scale")) return <Scale className="h-8 w-8 text-slate-500" />;

        return <Box className="h-8 w-8 text-primary" />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!match || !brandInfo || !category) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-slate-800">{t("ไม่พบข้อมูล", "Data not found")}</h1>
                    <Link href={`/brands/${brandId}`}>
                        <Button>{t("กลับ", "Back")}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const categoryTitle = language === "TH" ? category.title_th : category.title_en;
    const categoryItems = language === "TH" ? category.items_th : category.items_en;
    const items = categoryItems ? categoryItems.split(", ") : [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* Decorative Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Header */}
            <section className="bg-white border-b sticky top-0 z-50 bg-opacity-90 backdrop-blur-md">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/brands/${brandId}`}>
                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
                                <ArrowLeft className="h-5 w-5 text-slate-600" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-auto px-2 bg-blue-600 rounded flex items-center justify-center hidden md:flex">
                                <img
                                    src={brandInfo.logo || ''}
                                    alt={brandInfo.name}
                                    className="max-h-full max-w-[80px] object-contain"
                                />
                            </div>
                            <span className="h-6 w-px bg-slate-200 hidden md:block"></span>
                            <h1 className="text-lg font-bold text-slate-900 truncate max-w-[200px] md:max-w-none">
                                {categoryTitle}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Content */}
            <section className="relative pt-12 pb-20 z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-flex items-center justify-center p-6 bg-white rounded-3xl shadow-xl shadow-blue-900/5 mb-8 border border-slate-100">
                            {getCategoryIcon(category.title_en)}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                            {categoryTitle}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {t(
                                `สำรวจผลิตภัณฑ์ทั้งหมดในหมวดหมู่ ${categoryTitle} จาก ${brandInfo.name}`,
                                `Explore all products in the ${categoryTitle} category from ${brandInfo.name}`
                            )}
                        </p>
                    </motion.div>

                    {/* Items Grid */}
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500">{t("ยังไม่มีรายการสินค้า", "No items available")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/brands/${brandId}/category/${categoryIndex}/group/${index}`}>
                                        <Card className="h-full border-0 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ring-1 ring-slate-100 cursor-pointer">
                                            <CardContent className="p-6 flex flex-col items-start gap-4 h-full">
                                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                                                    <Box className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                                        {item.trim()}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">
                                                        {brandInfo.name} Product
                                                    </p>
                                                </div>
                                                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                                    {t("ดูรายละเอียด", "View Details")} <ChevronRight className="ml-1 h-4 w-4" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 text-center">
                        <Link href="/contact">
                            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                                {t("สอบถามข้อมูลสินค้านี้", "Inquire about these products")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
