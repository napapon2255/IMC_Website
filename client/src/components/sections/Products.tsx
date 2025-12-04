import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, Package, Scale, GraduationCap, 
  Monitor, Cpu, Wrench, Activity 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext"; // Import ระบบภาษา

// Map ไอคอน (ไม่ต้องแก้)
const iconMap: any = {
  Package, Scale, GraduationCap, Monitor, Cpu, Wrench, Activity
};

export default function Products() {
  const { t } = useLanguage(); // เรียกใช้ t เพื่อแปลภาษา

  // ข้อมูลสินค้าแบบ 2 ภาษา (ใส่ตรงนี้เลยเพื่อให้เปลี่ยนภาษาได้ทันที)
  const products = [
    {
      title: t("สินค้าของเรา", "Our Products"),
      slug: "our-products",
      icon: "Package",
      description: t(
        "สำรวจสินค้าคุณภาพสูงที่เราคัดสรรมาเพื่อคุณ",
        "Explore our comprehensive range of high-quality equipment."
      )
    },
    {
      title: t("ห้องปฏิบัติการสอบเทียบ", "Calibration Laboratory"),
      slug: "calibration-testing",
      icon: "Scale",
      description: t(
        "บริการสอบเทียบมาตรฐาน ISO/IEC 17025",
        "ISO/IEC 17025 certified calibration and precise testing services."
      )
    },
    {
      title: t("ศูนย์ฝึกอบรม", "Training & Consultant"),
      slug: "training-consultant",
      icon: "GraduationCap",
      description: t(
        "หลักสูตรอบรมมืออาชีพและบริการให้คำปรึกษา",
        "Professional training courses and expert consultation services."
      )
    },
    {
      title: t("ซอฟต์แวร์จัดการ", "Software Management"),
      slug: "software-management",
      icon: "Monitor",
      description: t(
        "โซลูชันซอฟต์แวร์สำหรับการจัดการข้อมูลและระบบ",
        "Advanced software solutions for data and system management."
      )
    },
    {
      title: t("ระบบอัตโนมัติ", "Automation Control"),
      slug: "automation-control",
      icon: "Cpu",
      description: t(
        "ออกแบบระบบควบคุมอัตโนมัติเพื่อเพิ่มประสิทธิภาพ",
        "Custom automation systems and control design for efficiency."
      )
    },
    {
      title: t("ซ่อมแซมและตรวจสอบ", "Repair & Inspection"),
      slug: "repair-inspection",
      icon: "Wrench",
      description: t(
        "บริการซ่อมบำรุงและตรวจสอบสภาพเครื่องมือ",
        "Reliable repair, maintenance, and equipment inspection services."
      )
    }
  ];

  return (
    <section id="products" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            {t("บริการและสินค้าของเรา", "Our Services & Solutions")}
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t(
              "ให้บริการครบวงจร ตั้งแต่จำหน่ายเครื่องมือ จนถึงการซ่อมบำรุงและฝึกอบรม",
              "Providing integrated solutions from equipment to maintenance and training."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
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
                        {t("ดูรายละเอียด", "Learn More")} <ArrowRight className="ml-2 h-4 w-4" />
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