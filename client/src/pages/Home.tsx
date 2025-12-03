import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Services from "@/components/sections/Services";
import Certified from "@/components/sections/Certified";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <Hero />
        <Products />
        <Services />
        <Certified />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
