import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Printer } from "lucide-react"; // เพิ่ม icon Printer (Fax)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// 1. Import Context ภาษา และ ข้อมูล JSON
import { useLanguage } from "@/context/LanguageContext";
import companyInfo from "@/data/company_info.json";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  // 2. เรียกใช้ Language Context
  const { t, language } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t("ส่งข้อความสำเร็จ", "Message Sent"),
      description: t(
        "เราได้รับข้อความของคุณแล้วและจะติดต่อกลับโดยเร็วที่สุด", 
        "We have received your message and will get back to you shortly."
      ),
    });
    form.reset();
  }

  // 3. เตรียมข้อมูลตามภาษาที่เลือก
  const companyName = language === "TH" ? companyInfo.company_name.th : companyInfo.company_name.en;
  const address = language === "TH" ? companyInfo.address.th : companyInfo.address.en;
  const openTime = language === "TH" ? companyInfo.business_hours.open.th : companyInfo.business_hours.open.en;
  const closeTime = language === "TH" ? companyInfo.business_hours.closed.th : companyInfo.business_hours.closed.en;

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info (ดึงจาก JSON) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              {t("ติดต่อเรา", "Get In Touch")}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {t(
                "มีคำถามเกี่ยวกับบริการสอบเทียบหรือสินค้าของเรา? ทีมผู้เชี่ยวชาญของเราพร้อมให้ความช่วยเหลือคุณ",
                "Have questions about our calibration services or products? Our team of experts is ready to assist you."
              )}
            </p>
            
            <div className="space-y-8">
              {/* ที่อยู่ */}
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("สำนักงานใหญ่", "Head Office")}</h4>
                  <p className="font-semibold text-primary">{companyName}</p>
                  <p className="text-muted-foreground mt-1">
                    {address}
                  </p>
                </div>
              </div>

              {/* เบอร์โทร & แฟกซ์ */}
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("เบอร์โทรศัพท์", "Phone & Fax")}</h4>
                  {companyInfo.phone.map((p, i) => (
                    <p key={i} className="text-muted-foreground">{p}</p>
                  ))}
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Printer className="h-4 w-4" /> Fax: {companyInfo.fax}
                  </p>
                </div>
              </div>

              {/* อีเมล */}
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("อีเมล", "Email")}</h4>
                  {companyInfo.email.map((e, i) => (
                    <p key={i} className="text-muted-foreground">{e}</p>
                  ))}
                </div>
              </div>

              {/* เวลาทำการ */}
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("เวลาทำการ", "Business Hours")}</h4>
                  <p className="text-muted-foreground">
                    {openTime}<br />
                    {closeTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (แปลภาษา Label) */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">{t("ส่งข้อความถึงเรา", "Send us a message")}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ชื่อ", "Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("ชื่อของคุณ", "Your Name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("อีเมล", "Email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("หัวข้อ", "Subject")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("สอบถามบริการ...", "Service Inquiry")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ข้อความ", "Message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("รายละเอียดที่ต้องการติดต่อ...", "How can we help you?")} 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg">
                  {t("ส่งข้อความ", "Send Message")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}