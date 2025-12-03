import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import certifiedData from "@/data/certified_data.json";

export default function CertifiedDetail() {
  // ดึงค่า id จาก URL (เช่น "electrical")
  const params = useParams();
  const categoryId = params.category; 

  // ค้นหาข้อมูลใน JSON ว่าตรงกับ id ไหน
  const currentData = certifiedData.find(item => item.id === categoryId);

  // กรณีหาไม่เจอ (เช่น พิมพ์ URL มั่ว)
  if (!currentData) {
    return <div className="text-center py-20">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* ปุ่มย้อนกลับ */}
        <Link href="/">
          <button className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </button>
        </Link>

        {/* เนื้อหา */}
        <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12">
          <h1 className="text-3xl font-bold text-primary mb-4">{currentData.name} Calibration</h1>
          <div className="h-1 w-20 bg-accent rounded-full mb-8"></div>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Detailed information regarding <strong>{currentData.name}</strong> calibration services. 
            (ในอนาคตคุณสามารถดึงข้อมูลรายละเอียดจริงๆ มาใส่ตรงนี้ได้)
          </p>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
             <h3 className="font-semibold mb-2">Service Scope:</h3>
             <ul className="list-disc list-inside text-slate-600 space-y-2">
               <li>Range testing and verification</li>
               <li>ISO/IEC 17025 Compliant Certificate</li>
               <li>Traceability to National Standards</li>
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
}