import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, ArrowRight, BookOpen, Calculator, ClipboardList, 
  FlaskConical, Briefcase, Award, CalendarDays, Download, Settings2,
  Search, ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  FileText, FileCheck, Users, Percent, X, Building2, Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import trainingData from "@/data/training_data.json"; 
import trainingImage from "@/assets/images/training-class.png"; 
import { useLanguage } from "@/context/LanguageContext"; 

// --- ข้อมูลจำลองคอร์ส 84 รายการ ---
const generateCourses = () => {
  const courses = [];
  const categories = ["Metrology", "Quality System", "Automotive", "Safety", "Management"];
  for (let i = 1; i <= 84; i++) {
    const category = categories[i % categories.length];
    courses.push({
      id: i,
      code: `TR-${100 + i}`,
      title_en: `${category} Course Level ${i} - Advanced Techniques`,
      title_th: `หลักสูตร ${category} ระดับ ${i} - เทคนิคขั้นสูงและการประยุกต์ใช้`,
      category: category,
      date: "25 Oct 2025",
      location: "INCTECT Training Center",
      duration: "1 Day"
    });
  }
  return courses;
};
const allCourses = generateCourses();

const iconMap: any = {
  BookOpen, Calculator, ClipboardList, FlaskConical, Briefcase, Award, Settings2
};

export default function TrainingConsultant() {
  const { t, language } = useLanguage();

  // State ค้นหาและแบ่งหน้า
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // State สำหรับเปิด/ปิด Modal (Popup)
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const searchLower = searchTerm.toLowerCase();
      const title = language === "TH" ? course.title_th : course.title_en;
      return (
        title.toLowerCase().includes(searchLower) ||
        course.code.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, language]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById("course-list-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // --- ข้อมูลรายการเอกสาร/ปุ่ม ---
  // เพิ่ม field 'type' และ 'modalId' เพื่อแยกประเภทปุ่ม
  const downloadDocs = [
    {
      title_th: "โปรแกรมอบรมและสัมนาปี 2024",
      title_en: "Training and Seminar Program 2024",
      file: "/files/training-program-2024.pdf",
      icon: CalendarDays, color: "blue", type: "download"
    },
    {
      title_th: "โครงการจัดทำระบบคุณภาพ ISO/IEC 17025",
      title_en: "ISO/IEC 17025 Implementation Project",
      file: "/files/iso17025.pdf",
      icon: FileCheck, color: "green", type: "download"
    },
    {
      title_th: "พระราชกฤษฎีกา (ลดหย่อนภาษี 200 %)",
      title_en: "Royal Decree (200% Tax Deduction)",
      file: "/files/TaxReduce200.pdf",
      icon: Percent, color: "orange", type: "download"
    },
    {
      title_th: "โครงการจัดทำระบบคุณภาพ ISO 9001",
      title_en: "ISO 9001 Implementation Project",
      file: "/files/iso9001.pdf",
      icon: FileCheck, color: "green", type: "download"
    },
    {
      title_th: "การลงทะเบียนการฝึกอบรม",
      title_en: "Training Registration Info",
      icon: FileText, color: "blue", type: "modal", modalId: "registration"
    },
    {
      title_th: "อบรมนอกสถานที่ (In-House Training)",
      title_en: "In-House Training Service",
      icon: Users, color: "purple", type: "modal", modalId: "in-house"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative">
      
      {/* 1. Header */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("กลับหน้าหลัก", "Back to Home")}
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t("ศูนย์ฝึกอบรมและที่ปรึกษา", "Training & Consultant Academy")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t(
              "ยกระดับศักยภาพบุคลากรและห้องปฏิบัติการของคุณ ด้วยหลักสูตรมาตรฐานสากลและทีมที่ปรึกษามืออาชีพ",
              "Enhance your personnel and laboratory potential with international standard courses and professional consultants."
            )}
          </p>
        </div>
      </section>

      {/* 2. Banner */}
      <section className="container mx-auto px-4 md:px-6 mt-8">
        <div className="rounded-xl overflow-hidden shadow-lg relative h-[300px] md:h-[400px]">
           <img
             src={trainingImage} 
             alt="Training Session"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </section>

      {/* 4. Course List */}
      <section id="course-list-section" className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {t("หลักสูตรอบรมทั้งหมด", "Available Training Courses")}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {t(`พบข้อมูลทั้งหมด ${filteredCourses.length} หลักสูตร`, `Found ${filteredCourses.length} courses`)}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t("ค้นหาชื่อหลักสูตร หรือ รหัส...", "Search course name or code...")}
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          {currentCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <motion.div key={course.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group border-slate-200">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                          {course.code}
                        </span>
                        <span className="text-xs text-muted-foreground border px-2 py-1 rounded-full bg-slate-50">
                          {course.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {language === "TH" ? course.title_th : course.title_en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{course.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="line-clamp-1">{course.location}</span>
                      </div>
                      <Button variant="secondary" className="w-full mt-4 hover:bg-primary hover:text-white transition-colors">
                         {t("ดูรายละเอียด", "View Details")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">{t("ไม่พบข้อมูล", "No courses found")}</h3>
              <p className="text-slate-500">{t("กรุณาลองค้นหาด้วยคำค้นอื่น", "Please try searching with different keywords.")}</p>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button variant="outline" size="icon" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium mx-4 text-muted-foreground">{t("หน้า", "Page")} {currentPage} / {totalPages}</span>
              <Button variant="outline" size="icon" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Downloads & Info Section (Updated Logic) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t("เอกสารดาวน์โหลดและข้อมูลสำคัญ", "Downloads & Important Information")}
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {downloadDocs.map((doc, index) => (
              <div 
                key={index}
                onClick={() => {
                  if (doc.type === "modal" && doc.modalId) {
                    setActiveModal(doc.modalId);
                  } else if (doc.file) {
                    window.open(doc.file, '_blank');
                  }
                }}
                className="block"
              >
                <div className="flex items-center p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className={`h-12 w-12 rounded-lg bg-${doc.color}-100 flex items-center justify-center mr-4 shrink-0 group-hover:bg-${doc.color}-200 transition-colors`}>
                    <doc.icon className={`h-6 w-6 text-${doc.color}-600 group-hover:text-${doc.color}-700 transition-colors`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                      {language === "TH" ? doc.title_th : doc.title_en}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      {doc.type === "download" ? (
                        <><FileText className="h-3 w-3 mr-1" /> PDF Document</>
                      ) : (
                        <><Building2 className="h-3 w-3 mr-1" /> Click to view details</>
                      )}
                    </p>
                  </div>

                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    {doc.type === "download" ? <Download className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL OVERLAYS --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>

              {/* === Modal Content: Registration === */}
              {activeModal === "registration" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {t("การลงทะเบียนและชำระเงิน", "Registration & Payment")}
                    </h2>
                  </div>

                  <div className="space-y-6 text-slate-700">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="font-semibold text-amber-800 mb-2">เงื่อนไขการลงทะเบียน (Condition)</p>
                      <p className="text-sm">
                        {t(
                          "ทำการชำระเงินล่วงหน้า อย่างน้อย 10 วัน ก่อนวันอบรมและสัมมนา เพื่อยืนยันลงทะเบียน",
                          "Payment must be made at least 10 days in advance to confirm registration."
                        )}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center"><Building2 className="h-4 w-4 mr-2" /> ชื่อที่อยู่สำหรับออกใบเสร็จ (Billing Address)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border">
                        <div>
                          <p className="font-bold text-primary mb-1">ภาษาไทย</p>
                          <p>บริษัท อินซ์เทค เมโทรโลจิคอล เซ็นเตอร์ จำกัด</p>
                          <p className="text-slate-500 mt-1">39/1 ถ.สุขาภิบาล 5, แขวงออเงิน, เขตสายไหม กรุงเทพฯ 10220</p>
                        </div>
                        <div>
                          <p className="font-bold text-primary mb-1">English</p>
                          <p>Inctech Metrological Center Co.,Ltd.</p>
                          <p className="text-slate-500 mt-1">39/1 Sukhapiban 5 Rd., Orngoen, Saimai, Bangkok 10220</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center"><Wallet className="h-4 w-4 mr-2" /> ช่องทางการชำระเงิน (Payment Method)</h3>
                      <div className="border rounded-lg p-4">
                        <p className="mb-2">โอนเงินเข้าบัญชีออมทรัพย์: <span className="font-bold">บริษัท อินซ์เทค เมโทรโลจิคอล เซ็นเตอร์ จำกัด</span></p>
                        <div className="flex items-center gap-4 bg-green-50 p-3 rounded border border-green-100">
                          <div className="h-10 w-10 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">KBANK</div>
                          <div>
                            <p className="font-bold text-green-800">ธนาคารกสิกรไทย</p>
                            <p className="text-sm">สาขา เค พาร์ค ถ.สายไหม 56</p>
                            <p className="font-mono text-lg font-bold">053-1-90257-2</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-500 pt-4 border-t">
                      <p>** ค่าใช้จ่ายในการฝึกอบรมนำไปหักภาษีได้ 200 % **</p>
                      <p className="mt-2">
                        โปรดส่งหลักฐาน Pay-in มาที่ Fax: 02-909-8823 หรือ Email: <span className="text-primary">imc@imcinstrument.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* === Modal Content: In-House Training === */}
              {activeModal === "in-house" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {t("อบรมนอกสถานที่", "In-House Training Service")}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Pricing Table */}
                    <div>
                      <h3 className="font-semibold mb-3 text-slate-800">ราคาและเงื่อนไข (Pricing & Conditions)</h3>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm text-left">
                          <tbody className="divide-y">
                            <tr className="bg-slate-50">
                              <td className="p-3 font-medium">ราคาการอบรม (ไม่รวมค่าเดินทาง)</td>
                              <td className="p-3 font-bold text-primary">20,000 บาท / วัน</td>
                            </tr>
                            <tr>
                              <td className="p-3">จำนวนผู้เข้าอบรม</td>
                              <td className="p-3">ไม่เกิน 6 ท่าน</td>
                            </tr>
                            <tr className="bg-slate-50">
                              <td className="p-3 font-medium">กรณีเกิน 6 ท่าน</td>
                              <td className="p-3">คิดเพิ่มท่านละ 3,000 บาท</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium">กรณีเกิน 10 ท่านขึ้นไป</td>
                              <td className="p-3 font-bold text-green-600">เหมาจ่าย 32,000 บาท / วัน</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Travel Cost Table */}
                    <div>
                      <h3 className="font-semibold mb-3 text-slate-800">ตารางค่าเดินทาง (Travel Costs)</h3>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-100 text-slate-700 font-bold">
                            <tr>
                              <th className="p-3 border-b">สถานที่ (Location)</th>
                              <th className="p-3 border-b text-right">ค่าเดินทาง (THB)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="p-3">กรุงเทพ – ปริมณฑล</td>
                              <td className="p-3 text-right font-mono">2,000</td>
                            </tr>
                            <tr className="bg-slate-50">
                              <td className="p-3">ชลบุรี, ระยอง, อยุธยา, นครปฐม, นครสวรรค์, ราชบุรี, ปราจีนบุรี</td>
                              <td className="p-3 text-right font-mono">4,000</td>
                            </tr>
                            <tr>
                              <td className="p-3">จังหวัดอื่นๆ</td>
                              <td className="p-3 text-right font-mono">9,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="text-sm bg-slate-50 p-4 rounded-lg text-slate-600">
                      <p className="font-bold mb-1">สอบถามเพิ่มเติม (Contact)</p>
                      <p>Tel: 02-909-8820 (Auto 10 Lines)</p>
                      <p>Email: imc@imcinstrument.com</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}