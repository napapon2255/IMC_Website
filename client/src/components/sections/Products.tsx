import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// 1. เพิ่มชื่อไอคอนใหม่ที่นี่
import { 
  ArrowRight, 
  Package,        // สำหรับ Our Products
  Scale,          // สำหรับ Calibration
  GraduationCap,  // สำหรับ Training
  Monitor,        // สำหรับ Software
  Cpu,            // สำหรับ Automation
  Wrench,         // สำหรับ Repair
  Activity        // Default (กันเหนียว)
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import productsData from "@/data/products.json"; 

// 2. จับคู่ชื่อใน JSON กับ Component ไอคอน
const iconMap: any = {
  Package,
  Scale,
  GraduationCap,
  Monitor,
  Cpu,
  Wrench,
  Activity
};

export default function Products() {
  return (
    <section id="products" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Services & Solutions</h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Providing integrated solutions from equipment to maintenance and training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product, index) => {
            const IconComponent = iconMap[product.icon] || Activity;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={`/products/${product.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-none shadow-sm group bg-white cursor-pointer relative overflow-hidden">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {product.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                        {product.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}