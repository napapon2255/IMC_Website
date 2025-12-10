import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Package, Info, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { Product, getProductsByCategory, getBrands, getCategoriesByBrand, Brand, Category } from "@/lib/supabase";

export default function ProductGroupDetail() {
    const { language, t } = useLanguage();
    const [match, params] = useRoute("/brands/:brandId/category/:categoryIndex/group/:groupIndex");
    const [products, setProducts] = useState<Product[]>([]);
    const [brandInfo, setBrandInfo] = useState<Brand | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    const brandId = params?.brandId || '';
    const categoryIndex = parseInt(params?.categoryIndex || '0');

    useEffect(() => {
        loadData();
    }, [brandId, categoryIndex]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load brand info
            const brands = await getBrands();
            const brand = brands.find(b => b.id === brandId);
            setBrandInfo(brand || null);

            // Load categories
            const categories = await getCategoriesByBrand(brandId);
            const cat = categories[categoryIndex];
            setCategory(cat || null);

            // Load products for this category and brand
            const prods = await getProductsByCategory(categoryIndex + 1, brandId);
            setProducts(prods);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    if (!match || !params) {
        return <div>Not found</div>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-500">{t("กำลังโหลด...", "Loading...")}</p>
                </div>
            </div>
        );
    }

    if (!brandInfo || !category) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <p>{t("ไม่พบข้อมูล", "Data not found")}</p>
        </div>;
    }

    const categoryTitle = language === "TH" ? category.title_th : category.title_en;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative bg-white border-b border-slate-200 pt-24 pb-12 overflow-hidden">
                {brandInfo.cover_image && (
                    <div className="absolute inset-0 z-0">
                        <img src={brandInfo.cover_image} alt="bg" className="w-full h-full object-cover opacity-20 blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/95" />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
                        <Link href={`/brands/${brandId}`}>
                            <span className="hover:text-primary cursor-pointer">{brandInfo.name}</span>
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/brands/${brandId}/category/${categoryIndex}`}>
                            <span className="hover:text-primary cursor-pointer">{categoryTitle}</span>
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-medium text-slate-900">{t("สินค้า", "Products")}</span>
                    </div>

                    <div className="flex items-start gap-6">
                        <div className="h-24 w-24 rounded-2xl bg-blue-600 shadow-xl shadow-blue-200/50 flex items-center justify-center p-6 text-white shrink-0 hidden md:flex">
                            <Package className="w-12 h-12" />
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{categoryTitle}</h1>
                            <p className="text-lg text-slate-600 max-w-2xl">
                                {t(
                                    `สินค้าทั้งหมด ${products.length} รายการในหมวดหมู่นี้`,
                                    `${products.length} products in this category`
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-4 py-12">
                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">{t("ยังไม่มีสินค้า", "No products yet")}</h3>
                        <p className="text-slate-500">{t("กรุณาเพิ่มสินค้าผ่านหน้า Admin", "Please add products through Admin page")}</p>
                        <Link href="/admin">
                            <Button className="mt-4">{t("ไปหน้า Admin", "Go to Admin")}</Button>
                        </Link>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {products.map((product) => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden group h-full">
                                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name_en}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-200">
                                                <Package className="w-12 h-12 text-slate-400" />
                                            </div>
                                        )}
                                        {product.price && (
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-primary text-white">
                                                    {product.price}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                            {language === "TH" ? (product.name_th || product.name_en) : product.name_en}
                                        </h3>
                                        <p className="text-slate-500 mb-4 leading-relaxed line-clamp-2">
                                            {language === "TH"
                                                ? (product.description_th || product.description_en || t("ไม่มีรายละเอียด", "No description"))
                                                : (product.description_en || t("ไม่มีรายละเอียด", "No description"))
                                            }
                                        </p>
                                        <Button className="w-full bg-slate-900 hover:bg-primary text-white transition-colors gap-2">
                                            <Info className="w-4 h-4" />
                                            {t("ดูรายละเอียด", "View Details")}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>
        </div>
    );
}
