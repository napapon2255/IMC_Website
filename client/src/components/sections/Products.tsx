import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, FlaskConical, Armchair, Scale, Thermometer, Activity } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    title: "Laboratory Equipment",
    icon: FlaskConical,
    description: "High-precision instruments for chemical and biological analysis."
  },
  {
    title: "Medical Equipment",
    icon: Activity,
    description: "Standardized medical devices for hospitals and clinics."
  },
  {
    title: "Furniture Lab & Design",
    icon: Armchair,
    description: "Ergonomic and durable laboratory furniture solutions."
  },
  {
    title: "Calibration & Testing",
    icon: Scale,
    description: "ISO/IEC 17025 certified calibration services."
  },
  {
    title: "Industry Solutions",
    icon: Thermometer,
    description: "Temperature mapping and industrial measurement equipment."
  },
  {
    title: "Microscopy & Optical",
    icon: Microscope,
    description: "Advanced optical instruments for research and inspection."
  }
];

export default function Products() {
  return (
    <section id="products" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Products</h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive range of high-quality equipment for laboratory, medical, and industrial applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-none shadow-sm group bg-white">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <product.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
