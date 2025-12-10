import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    Upload,
    Image as ImageIcon,
    Package,
    FolderOpen,
    ArrowLeft,
    RefreshCw,
    ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Brand,
    Category,
    Product,
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    getCategoriesByBrand,
    createCategory,
    updateCategory,
    deleteCategory,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"brands" | "categories" | "products" | "images">("brands");
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => { loadBrands(); }, []);
    useEffect(() => { if (selectedBrand) loadCategories(selectedBrand); }, [selectedBrand]);
    useEffect(() => { if (selectedCategory) loadProducts(selectedCategory); }, [selectedCategory]);

    const loadBrands = async () => {
        setLoading(true);
        try { setBrands(await getBrands()); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
        setLoading(false);
    };

    const loadCategories = async (brandId: string) => {
        try { setCategories(await getCategoriesByBrand(brandId)); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const loadProducts = async (categoryId: number) => {
        try { setProducts(await getProductsByCategory(categoryId, selectedBrand || undefined)); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleSaveBrand = async (brand: Partial<Brand>) => {
        try {
            if (editingBrand?.id) { await updateBrand(editingBrand.id, brand); toast({ title: "Success", description: "Brand updated!" }); }
            else { await createBrand(brand); toast({ title: "Success", description: "Brand created!" }); }
            setEditingBrand(null); setIsCreating(false); loadBrands();
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleDeleteBrand = async (id: string) => {
        if (!confirm("Delete this brand?")) return;
        try { await deleteBrand(id); toast({ title: "Success", description: "Brand deleted!" }); loadBrands(); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleSaveCategory = async (category: Partial<Category>) => {
        try {
            if (editingCategory?.id) { await updateCategory(editingCategory.id, category); toast({ title: "Success", description: "Category updated!" }); }
            else { await createCategory({ ...category, brand_id: selectedBrand! }); toast({ title: "Success", description: "Category created!" }); }
            setEditingCategory(null); setIsCreating(false); if (selectedBrand) loadCategories(selectedBrand);
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Delete this category?")) return;
        try { await deleteCategory(id); toast({ title: "Success", description: "Category deleted!" }); if (selectedBrand) loadCategories(selectedBrand); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleSaveProduct = async (product: Partial<Product>) => {
        try {
            if (editingProduct?.id) {
                await updateProduct(editingProduct.id, product);
                toast({ title: "Success", description: "Product updated!" });
            } else {
                await createProduct({ ...product, category_id: selectedCategory!, brand_id: selectedBrand! });
                toast({ title: "Success", description: "Product created!" });
            }
            setEditingProduct(null);
            setIsCreating(false);
            if (selectedCategory) loadProducts(selectedCategory);
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Delete this product?")) return;
        try { await deleteProduct(id); toast({ title: "Success", description: "Product deleted!" }); if (selectedCategory) loadProducts(selectedCategory); }
        catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    const migrateData = async () => {
        if (!confirm("Import data from JSON files?")) return;
        try {
            const res = await fetch("/api/migrate", { method: "POST" });
            const result = await res.json();
            if (result.success) { toast({ title: "Success", description: "Data migrated!" }); loadBrands(); }
            else throw new Error(result.error);
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    </div>
                    <Button onClick={migrateData} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Import from JSON
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    <Button variant={activeTab === "brands" ? "default" : "outline"} onClick={() => setActiveTab("brands")} className="gap-2">
                        <Package className="h-4 w-4" /> Brands
                    </Button>
                    <Button variant={activeTab === "categories" ? "default" : "outline"} onClick={() => setActiveTab("categories")} className="gap-2">
                        <FolderOpen className="h-4 w-4" /> Categories
                    </Button>
                    <Button variant={activeTab === "products" ? "default" : "outline"} onClick={() => setActiveTab("products")} className="gap-2">
                        <ShoppingBag className="h-4 w-4" /> Products
                    </Button>
                    <Button variant={activeTab === "images" ? "default" : "outline"} onClick={() => setActiveTab("images")} className="gap-2">
                        <ImageIcon className="h-4 w-4" /> Images
                    </Button>
                </div>

                {/* Brands Tab */}
                {activeTab === "brands" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Brands</h2>
                            <Button onClick={() => { setIsCreating(true); setEditingBrand({} as Brand); }} className="gap-2">
                                <Plus className="h-4 w-4" /> Add Brand
                            </Button>
                        </div>
                        {(editingBrand || isCreating) && (
                            <Card><CardHeader><CardTitle>{editingBrand?.id ? "Edit Brand" : "New Brand"}</CardTitle></CardHeader>
                                <CardContent><BrandForm brand={editingBrand || {}} onSave={handleSaveBrand} onCancel={() => { setEditingBrand(null); setIsCreating(false); }} /></CardContent>
                            </Card>
                        )}
                        <div className="grid gap-4">
                            {brands.map((brand) => (
                                <Card key={brand.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {brand.logo && <img src={brand.logo} alt={brand.name} className="h-12 w-12 object-contain bg-slate-100 rounded p-1" />}
                                            <div><h3 className="font-bold text-lg">{brand.name}</h3><p className="text-sm text-slate-500">{brand.description_en}</p></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => setEditingBrand(brand)}><Pencil className="h-4 w-4" /></Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteBrand(brand.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === "categories" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Categories</h2>
                            {selectedBrand && <Button onClick={() => { setIsCreating(true); setEditingCategory({} as Category); }} className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>}
                        </div>
                        <Card><CardContent className="p-4">
                            <Label>Select Brand</Label>
                            <select className="w-full mt-2 p-2 border rounded" value={selectedBrand || ""} onChange={(e) => setSelectedBrand(e.target.value || null)}>
                                <option value="">-- Select Brand --</option>
                                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </CardContent></Card>
                        {(editingCategory || isCreating) && selectedBrand && (
                            <Card><CardHeader><CardTitle>{editingCategory?.id ? "Edit Category" : "New Category"}</CardTitle></CardHeader>
                                <CardContent><CategoryForm category={editingCategory || {}} onSave={handleSaveCategory} onCancel={() => { setEditingCategory(null); setIsCreating(false); }} /></CardContent>
                            </Card>
                        )}
                        {selectedBrand && (
                            <div className="grid gap-4">
                                {categories.map((cat) => (
                                    <Card key={cat.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div><h3 className="font-bold">{cat.title_en}</h3><p className="text-sm text-slate-500">{cat.title_th}</p></div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => setEditingCategory(cat)}><Pencil className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat.id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === "products" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Products</h2>
                            {selectedCategory && <Button onClick={() => { setIsCreating(true); setEditingProduct({} as Product); }} className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card><CardContent className="p-4">
                                <Label>Select Brand</Label>
                                <select className="w-full mt-2 p-2 border rounded" value={selectedBrand || ""} onChange={(e) => { setSelectedBrand(e.target.value || null); setSelectedCategory(null); }}>
                                    <option value="">-- Select Brand --</option>
                                    {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </CardContent></Card>
                            <Card><CardContent className="p-4">
                                <Label>Select Category</Label>
                                <select className="w-full mt-2 p-2 border rounded" value={selectedCategory || ""} onChange={(e) => setSelectedCategory(parseInt(e.target.value) || null)} disabled={!selectedBrand}>
                                    <option value="">-- Select Category --</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.title_en}</option>)}
                                </select>
                            </CardContent></Card>
                        </div>
                        {(editingProduct || isCreating) && selectedCategory && (
                            <Card><CardHeader><CardTitle>{editingProduct?.id ? "Edit Product" : "New Product"}</CardTitle></CardHeader>
                                <CardContent><ProductForm product={editingProduct || {}} onSave={handleSaveProduct} onCancel={() => { setEditingProduct(null); setIsCreating(false); }} /></CardContent>
                            </Card>
                        )}
                        {selectedCategory && (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {products.map((prod) => (
                                    <Card key={prod.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            {prod.image && <img src={prod.image} alt={prod.name_en} className="w-full h-32 object-cover rounded mb-4" />}
                                            <h3 className="font-bold">{prod.name_en}</h3>
                                            <p className="text-sm text-slate-500 mb-2">{prod.name_th}</p>
                                            {prod.price && <p className="text-primary font-bold">{prod.price}</p>}
                                            <div className="flex gap-2 mt-4">
                                                <Button size="sm" variant="outline" onClick={() => setEditingProduct(prod)}><Pencil className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(prod.id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Images Tab */}
                {activeTab === "images" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Images</h2>
                            <Button className="gap-2"><Upload className="h-4 w-4" /> Upload Image</Button>
                        </div>
                        <Card><CardContent className="p-8 text-center text-slate-500">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Image management coming soon...</p>
                        </CardContent></Card>
                    </div>
                )}
            </div>
        </div>
    );
}

function BrandForm({ brand, onSave, onCancel }: { brand: Partial<Brand>; onSave: (b: Partial<Brand>) => void; onCancel: () => void; }) {
    const [form, setForm] = useState(brand);
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div><Label>ID (URL slug)</Label><Input value={form.id || ""} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="e.g., sika" disabled={!!brand.id} /></div>
                <div><Label>Name</Label><Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., SIKA" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>Logo URL</Label><Input value={form.logo || ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} /></div>
                <div><Label>Cover Image URL</Label><Input value={form.cover_image || ""} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} /></div>
            </div>
            <div><Label>Description (EN)</Label><Textarea value={form.description_en || ""} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
            <div><Label>Description (TH)</Label><Textarea value={form.description_th || ""} onChange={(e) => setForm({ ...form, description_th: e.target.value })} /></div>
            <div className="flex gap-2"><Button onClick={() => onSave(form)} className="gap-2"><Save className="h-4 w-4" /> Save</Button><Button variant="outline" onClick={onCancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button></div>
        </div>
    );
}

function CategoryForm({ category, onSave, onCancel }: { category: Partial<Category>; onSave: (c: Partial<Category>) => void; onCancel: () => void; }) {
    const [form, setForm] = useState(category);
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div><Label>Title (EN)</Label><Input value={form.title_en || ""} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></div>
                <div><Label>Title (TH)</Label><Input value={form.title_th || ""} onChange={(e) => setForm({ ...form, title_th: e.target.value })} /></div>
            </div>
            <div><Label>Items (EN) - comma separated</Label><Textarea value={form.items_en || ""} onChange={(e) => setForm({ ...form, items_en: e.target.value })} placeholder="Item 1, Item 2, Item 3" /></div>
            <div><Label>Items (TH) - comma separated</Label><Textarea value={form.items_th || ""} onChange={(e) => setForm({ ...form, items_th: e.target.value })} /></div>
            <div className="flex gap-2"><Button onClick={() => onSave(form)} className="gap-2"><Save className="h-4 w-4" /> Save</Button><Button variant="outline" onClick={onCancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button></div>
        </div>
    );
}

function ProductForm({ product, onSave, onCancel }: { product: Partial<Product>; onSave: (p: Partial<Product>) => void; onCancel: () => void; }) {
    const [form, setForm] = useState(product);

    const handlePriceChange = (value: string) => {
        // Allow only numbers, commas, dots, and ฿ symbol
        const cleaned = value.replace(/[^0-9,.\u0E3F฿]/g, '');
        setForm({ ...form, price: cleaned });
    };

    const handleSave = () => {
        if (!form.name_en) {
            alert("Please enter product name (EN)");
            return;
        }
        // Format price with ฿ symbol if not present
        if (form.price && !form.price.includes('฿')) {
            form.price = `฿${form.price}`;
        }
        onSave(form);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div><Label>Name (EN) <span className="text-red-500">*</span></Label><Input value={form.name_en || ""} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required /></div>
                <div><Label>Name (TH)</Label><Input value={form.name_th || ""} onChange={(e) => setForm({ ...form, name_th: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>Image URL</Label><Input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/uploads/products/image.jpg" /></div>
                <div><Label>Price</Label><Input value={form.price || ""} onChange={(e) => handlePriceChange(e.target.value)} placeholder="15000 or ฿15,000" /></div>
            </div>
            <div><Label>Description (EN)</Label><Textarea value={form.description_en || ""} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
            <div><Label>Description (TH)</Label><Textarea value={form.description_th || ""} onChange={(e) => setForm({ ...form, description_th: e.target.value })} /></div>
            <div className="flex gap-2"><Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" /> Save</Button><Button variant="outline" onClick={onCancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button></div>
        </div>
    );
}
