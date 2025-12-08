import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/modern_clean_laboratory_background.png";

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.querySelector("#products");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContract = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Laboratory Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-accent font-bold tracking-wide uppercase mb-4 text-sm md:text-base">
              Inctect Metrological Center
            </h2>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight mb-6">
              Professional Calibration, Testing & <span className="text-primary-foreground/80">Laboratory Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl">
              We provide world-class metrological services, medical device testing, and complete laboratory infrastructure design for industrial and medical sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8 py-6 shadow-lg shadow-primary/25" onClick={scrollToProducts}>
                Explore Our Services
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary" onClick={scrollToContract}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
