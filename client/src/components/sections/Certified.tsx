import { CheckCircle2 } from "lucide-react";

const instruments = [
  "Electrical",
  "Optical & Chemical",
  "Medical Device",
  "Temperature & Humidity",
  "Torque & Force",
  "Temperature & Humidity Mapping",
  "Dimension",
  "Pressure & Vacuum"
];

export default function Certified() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Certified Instruments</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our laboratory is fully accredited to calibrate and test a wide range of instruments across multiple disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {instruments.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
