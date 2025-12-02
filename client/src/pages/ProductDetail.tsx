import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import microscopeImg from "@assets/generated_images/high_tech_microscope_in_lab.png";
import medicalImg from "@assets/generated_images/modern_medical_equipment.png";
import industrialImg from "@assets/generated_images/industrial_calibration_tools.png";

// Mock Data for Product Categories
const productData: Record<string, any> = {
  "laboratory-equipment": {
    title: "Laboratory Equipment",
    description: "High-precision instruments for chemical and biological analysis, designed for modern research facilities.",
    image: microscopeImg,
    items: [
      { name: "Digital Centrifuge Pro", model: "CP-2000", price: "Call for Quote", features: ["High speed 15000 RPM", "Digital Touch Display", "Auto-balance system"] },
      { name: "Precision Incubator", model: "INC-500", price: "Call for Quote", features: ["Temp range: 5°C to 80°C", "Uniformity ±0.5°C", "Stainless steel interior"] },
      { name: "Analytical Balance", model: "AB-400", price: "Call for Quote", features: ["0.1mg readability", "Internal calibration", "Glass draft shield"] },
      { name: "Magnetic Stirrer", model: "MS-100", price: "Call for Quote", features: ["Ceramic hotplate", "Speed 100-1500 RPM", "Temp up to 380°C"] },
    ]
  },
  "medical-equipment": {
    title: "Medical Equipment",
    description: "Standardized medical devices for hospitals and clinics, ensuring patient safety and accurate diagnostics.",
    image: medicalImg,
    items: [
      { name: "Patient Monitor", model: "PM-X1", price: "Call for Quote", features: ["12-inch Touch Screen", "ECG, SPO2, NIBP", "72-hour trend storage"] },
      { name: "Infusion Pump", model: "IP-Smart", price: "Call for Quote", features: ["High precision flow control", "Drug library", "Anti-bolus function"] },
      { name: "Digital Autoclave", model: "DA-50", price: "Call for Quote", features: ["Class B sterilization", "Automatic door lock", "USB data logger"] },
    ]
  },
  "calibration-testing": {
    title: "Calibration & Testing",
    description: "ISO/IEC 17025 certified calibration services for pressure, temperature, electrical, and dimensional instruments.",
    image: industrialImg,
    items: [
      { name: "Pressure Gauge Calibrator", model: "PGC-1000", price: "Call for Quote", features: ["Range: -1 to 1000 bar", "Accuracy: 0.02% FS", "HART communication"] },
      { name: "Temperature Bath", model: "TB-300", price: "Call for Quote", features: ["Range: -30°C to 200°C", "Stability: ±0.01°C", "Large tank volume"] },
      { name: "Multimeter Calibrator", model: "MC-5500", price: "Call for Quote", features: ["5.5 digit precision", "AC/DC Voltage & Current", "Resistance simulation"] },
    ]
  },
  // Fallback for other categories using generic data
  "default": {
    title: "Product Category",
    description: "Explore our range of high-quality professional equipment.",
    image: microscopeImg,
    items: [
      { name: "Premium Equipment A", model: "Model-A1", price: "Call for Quote", features: ["High efficiency", "Durable construction", "1 year warranty"] },
      { name: "Professional Tool B", model: "Model-B2", price: "Call for Quote", features: ["Precision measurement", "Digital interface", "Compact design"] },
      { name: "Advanced System C", model: "Model-C3", price: "Call for Quote", features: ["Automated operation", "Cloud connectivity", "Energy saving"] },
    ]
  }
};

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:slug");
  const slug = params?.slug || "";
  
  const category = productData[slug] || productData["default"];
  
  // Use title from slug if falling back to default but want to show correct title
  if (productData[slug] === undefined && slug) {
    category.title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src={category.image} 
              alt={category.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
          </div>
          
          <div className="container relative z-10 px-4 md:px-6">
            <Link href="/#products">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 mb-6 pl-0 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Categories
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{category.title}</h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden group bg-white flex flex-col">
                    <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                      <div className="text-primary/20 font-heading font-bold text-4xl">IMC</div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.model}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2 mb-4">
                        {item.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex items-center justify-between">
                      <span className="font-medium text-slate-600">{item.price}</span>
                      <Button size="sm" className="gap-2">
                        <ShoppingCart className="h-4 w-4" /> Request Quote
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We offer custom solutions and sourcing for specialized laboratory equipment. Contact our sales team for personal assistance.
            </p>
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="text-primary font-bold">
                Contact Sales Support
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
