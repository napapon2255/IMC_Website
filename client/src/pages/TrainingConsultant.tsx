import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, ArrowRight, BookOpen, Calculator, ClipboardList, 
  FlaskConical, Briefcase, Award, CalendarDays, Download, Settings2,
  Search, ChevronLeft, ChevronRight, Calendar, Clock, MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

import trainingImage from "@/assets/images/training-class.png"; 
import { useLanguage } from "@/context/LanguageContext"; 

// --- ส่วนจัดการข้อมูล Mockup 84 คอร์ส (วางไว้นอก Component) ---
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

// จับคู่ Icon
const iconMap: any = {
  BookOpen, Calculator, ClipboardList, FlaskConical, Briefcase, Award, Settings2
};

export default function TrainingConsultant() {
  const { t, language } = useLanguage();

  // --- State สำหรับระบบค้นหาและแบ่งหน้า ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Logic การกรองข้อมูล (Filter)
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

  // Logic การแบ่งหน้า (Pagination)
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
    setCurrentPage(1); // รีเซ็ตหน้าเมื่อค้นหาใหม่
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Header Section */}
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

      {/* 2. Banner Image */}
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

      {/* 4. Course List Section (ส่วนค้นหาคอร์ส 84 รายการ) */}
      <section id="course-list-section" className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header & Search Bar */}
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

          {/* Course Grid */}
          {currentCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
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
            // Not Found State
            <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">
                {t("ไม่พบข้อมูล", "No courses found")}
              </h3>
              <p className="text-slate-500">
                {t("กรุณาลองค้นหาด้วยคำค้นอื่น", "Please try searching with different keywords.")}
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-sm font-medium mx-4 text-muted-foreground">
                {t("หน้า", "Page")} {currentPage} / {totalPages}
              </span>

              <Button 
                variant="outline" 
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Download Schedule Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto bg-white border border-dashed border-slate-300 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 text-primary items-center justify-center mb-6">
              <CalendarDays className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t("ตารางการฝึกอบรมประจำปี", "Annual Training Schedule")}
            </h2>
            <p className="text-slate-600 mb-8">
              {t(
                "ดาวน์โหลดตารางการอบรม Public Training ประจำปี เพื่อวางแผนการพัฒนาบุคลากรของคุณ",
                "Download our annual Public Training schedule to plan your personnel development."
              )}
            </p>
            
            <a href="/files/training-schedule-2025.pdf" download>
              <Button size="lg" className="shadow-md hover:shadow-xl transition-all">
                <Download className="mr-2 h-5 w-5" />
                {t("ดาวน์โหลดตารางอบรม 2568", "Download 2025 Schedule")}
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}