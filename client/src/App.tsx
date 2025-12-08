import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Navbar from "@/components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import OurProductsPage from "./pages/OurProductsPage";
import CertifiedDetail from "./pages/CertifiedDetail";
import CalibrationTesting from "./pages/CalibrationTesting";
import TrainingConsultant from "./pages/TrainingConsultant";
import SoftwareManagement from "./pages/SoftwareManagement";
import AutomationControl from "./pages/RenovateService";
import RepairInspection from "./pages/RepairInspection";


function Router() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <LanguageProvider>
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/certified/:category" component={CertifiedDetail} />
          <Route path="/products/our-products" component={OurProductsPage} />   
          <Route path="/products/calibration-testing" component={CalibrationTesting} />
          <Route path="/products/training-consultant" component={TrainingConsultant} />
          <Route path="/products/software-management" component={SoftwareManagement} />
          <Route path="/products/automation-control" component={AutomationControl} />
          <Route path="/products/repair-inspection" component={RepairInspection} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </LanguageProvider>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // ทุกครั้งที่ location (URL) เปลี่ยน ให้เลื่อนขึ้นบนสุด
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
