import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-primary font-heading font-bold text-xl px-3 py-1 rounded-md">
                IMC
              </div>
              <div>
                <span className="block font-heading font-bold text-white leading-none">INCTECT</span>
                <span className="block text-[10px] font-medium text-slate-400 tracking-widest">METROLOGICAL CENTER</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Leading provider of calibration, testing, and laboratory solutions in Thailand. 
              Committed to precision, quality, and international standards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>02-xxx-xxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@imc.co.th</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 INCTECT METROLOGICAL CENTER CO., LTD. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
