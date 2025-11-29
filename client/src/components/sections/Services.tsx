import { Wrench, Settings, PenTool, GraduationCap, Database } from "lucide-react";

const services = [
  {
    title: "Calibration & Testing Medical Device",
    description: "Certified calibration for critical medical equipment ensuring patient safety and compliance.",
    icon: Settings
  },
  {
    title: "Equipment Repair & Automation",
    description: "Professional repair services and automation system upgrades to extend equipment lifespan.",
    icon: Wrench
  },
  {
    title: "Design Service",
    description: "Complete laboratory design, equipment relocation, and installation services.",
    icon: PenTool
  },
  {
    title: "Training & Consult (Academy)",
    description: "Expert training programs and consultation for laboratory standards and operations.",
    icon: GraduationCap
  },
  {
    title: "Software Management",
    description: "Specialized software for calibration lab management and medical equipment tracking.",
    icon: Database
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:items-start">
          <div className="md:w-1/3 sticky top-24">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Professional Services
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We go beyond just selling products. IMC provides a full spectrum of technical services to support your laboratory and medical operations throughout their lifecycle.
            </p>
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="font-bold text-primary mb-2">Why Choose IMC Services?</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                <li>ISO/IEC 17025 Accredited</li>
                <li>Experienced Technical Team</li>
                <li>Fast Turnaround Time</li>
                <li>On-site Service Capability</li>
              </ul>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-6 md:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex gap-6 items-start"
              >
                <div className="shrink-0 h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
