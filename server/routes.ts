import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { supabase, Brand, Category } from "./supabase";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "client/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // =====================
  // BRANDS API
  // =====================

  // Get all brands
  app.get("/api/brands", async (_req: Request, res: Response) => {
    const { data, error } = await supabase.from("brands").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get single brand
  app.get("/api/brands/:id", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (error) return res.status(404).json({ error: "Brand not found" });
    res.json(data);
  });

  // Create brand
  app.post("/api/brands", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("brands")
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  });

  // Update brand
  app.put("/api/brands/:id", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("brands")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Delete brand
  app.delete("/api/brands/:id", async (req: Request, res: Response) => {
    const { error } = await supabase
      .from("brands")
      .delete()
      .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  // =====================
  // CATEGORIES API
  // =====================

  // Get categories by brand
  app.get("/api/brands/:brandId/categories", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("brand_id", req.params.brandId);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Create category
  app.post("/api/categories", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("categories")
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  });

  // Update category
  app.put("/api/categories/:id", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("categories")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Delete category
  app.delete("/api/categories/:id", async (req: Request, res: Response) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  // =====================
  // PRODUCTS API
  // =====================

  // Get all products
  app.get("/api/products", async (_req: Request, res: Response) => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get products by category
  app.get("/api/categories/:categoryId/products", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", req.params.categoryId);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Create product
  app.post("/api/products", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("products")
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  });

  // Update product
  app.put("/api/products/:id", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("products")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Delete product
  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  // =====================
  // IMAGES/FILES API
  // =====================

  // Get all images
  app.get("/api/images", async (_req: Request, res: Response) => {
    const { data, error } = await supabase.from("images").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Upload image
  app.post("/api/images/upload", upload.single("file"), async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const { data, error } = await supabase
      .from("images")
      .insert({
        url: imageUrl,
        alt_text: req.body.alt_text || req.file.originalname,
        page: req.body.page || null
      })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  });

  // Delete image
  app.delete("/api/images/:id", async (req: Request, res: Response) => {
    // Get image first to delete file
    const { data: image } = await supabase
      .from("images")
      .select("url")
      .eq("id", req.params.id)
      .single();

    if (image?.url) {
      const filePath = path.join(process.cwd(), "client/public", image.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const { error } = await supabase
      .from("images")
      .delete()
      .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  // =====================
  // MIGRATION API (one-time use)
  // =====================

  app.post("/api/migrate", async (_req: Request, res: Response) => {
    try {
      // Read JSON files
      const brandsPath = path.join(process.cwd(), "client/src/data/brands.json");
      const categoriesPath = path.join(process.cwd(), "client/src/data/brand_products.json");
      const productsPath = path.join(process.cwd(), "client/src/data/products.json");

      const brandsJson = JSON.parse(fs.readFileSync(brandsPath, "utf-8"));
      const categoriesJson = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
      const productsJson = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

      let brandsCount = 0;
      let categoriesCount = 0;
      let productsCount = 0;

      // Insert brands
      for (const brand of brandsJson) {
        const { error } = await supabase.from("brands").upsert(brand);
        if (!error) brandsCount++;
      }

      // Insert categories
      for (const [brandId, brandData] of Object.entries(categoriesJson)) {
        const categories = (brandData as any).categories || [];
        for (const cat of categories) {
          const { error } = await supabase.from("categories").insert({
            brand_id: brandId,
            title_en: cat.title_en,
            title_th: cat.title_th,
            items_en: cat.items_en,
            items_th: cat.items_th
          });
          if (!error) categoriesCount++;
        }
      }

      // Insert products
      for (const product of productsJson) {
        const { error } = await supabase.from("products").upsert({
          id: product.id,
          brand_id: product.brand_id,
          category_id: product.category_id,
          name_en: product.name_en,
          name_th: product.name_th,
          description_en: product.description_en,
          description_th: product.description_th,
          image: product.image,
          price: product.price
        });
        if (!error) productsCount++;
      }

      res.json({
        success: true,
        message: `Migration completed! Brands: ${brandsCount}, Categories: ${categoriesCount}, Products: ${productsCount}`
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // =====================
  // JSON FILE CRUD APIs
  // =====================

  const productsJsonPath = path.join(process.cwd(), "client/src/data/products.json");

  // Helper to read/write products JSON
  const readProductsJson = () => {
    return JSON.parse(fs.readFileSync(productsJsonPath, "utf-8"));
  };

  const writeProductsJson = (data: any[]) => {
    fs.writeFileSync(productsJsonPath, JSON.stringify(data, null, 2), "utf-8");
  };

  // Get all products from JSON
  app.get("/api/json/products", (_req: Request, res: Response) => {
    try {
      const products = readProductsJson();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create product in JSON
  app.post("/api/json/products", (req: Request, res: Response) => {
    try {
      const products = readProductsJson();
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
        ...req.body
      };
      products.push(newProduct);
      writeProductsJson(products);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update product in JSON
  app.put("/api/json/products/:id", (req: Request, res: Response) => {
    try {
      const products = readProductsJson();
      const index = products.findIndex((p: any) => p.id === parseInt(req.params.id));
      if (index === -1) return res.status(404).json({ error: "Product not found" });
      products[index] = { ...products[index], ...req.body };
      writeProductsJson(products);
      res.json(products[index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete product from JSON
  app.delete("/api/json/products/:id", (req: Request, res: Response) => {
    try {
      let products = readProductsJson();
      const initialLength = products.length;
      products = products.filter((p: any) => p.id !== parseInt(req.params.id));
      if (products.length === initialLength) {
        return res.status(404).json({ error: "Product not found" });
      }
      writeProductsJson(products);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // =====================
  // ADMIN USERS API
  // =====================

  // Get all admin users
  app.get("/api/admin-users", async (_req: Request, res: Response) => {
    try {
      const { data, error } = await supabase.from("admin_users").select("*");
      if (error) {
        console.error("Admin users fetch error:", error.message);
        // If table doesn't exist, return empty array instead of error
        if (error.message.includes("does not exist") || error.code === "42P01") {
          return res.json([]);
        }
        return res.status(500).json({ error: error.message });
      }
      res.json(data || []);
    } catch (err: any) {
      console.error("Admin users error:", err);
      res.json([]); // Fallback to empty array
    }
  });

  // Add admin user
  app.post("/api/admin-users", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const { data, error } = await supabase
      .from("admin_users")
      .insert({ email: email.toLowerCase() })
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  });

  // Delete admin user
  app.delete("/api/admin-users/:id", async (req: Request, res: Response) => {
    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  return httpServer;
}
