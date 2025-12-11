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
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import OurProductsPage from "./pages/OurProductsPage";
import BrandDetail from "./pages/BrandDetail";
import CategoryDetail from "./pages/CategoryDetail";
import ProductGroupDetail from "./pages/ProductGroupDetail";
import CertifiedDetail from "./pages/CertifiedDetail";
import CalibrationTesting from "./pages/CalibrationTesting";
import TrainingConsultant from "./pages/TrainingConsultant";
import SoftwareManagement from "./pages/SoftwareManagement";
import AutomationControl from "./pages/RenovateService";
import RepairInspection from "./pages/RepairInspection";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";


function Router() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <LanguageProvider>
        <AuthProvider>
          <ScrollToTop />
          <Switch>
            {/* Admin routes - no navbar/footer */}
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin">
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </Route>

            {/* Public routes with navbar/footer */}
            <Route path="/">
              <Navbar />
              <Home />
              <Footer />
            </Route>

            <Route path="/brands/:brandId">
              <Navbar />
              <BrandDetail />
              <Footer />
            </Route>

            <Route path="/brands/:brandId/category/:categoryIndex">
              <Navbar />
              <CategoryDetail />
              <Footer />
            </Route>

            <Route path="/brands/:brandId/category/:categoryIndex/group/:groupIndex">
              <Navbar />
              <ProductGroupDetail />
              <Footer />
            </Route>

            <Route path="/certified/:category">
              <Navbar />
              <CertifiedDetail />
              <Footer />
            </Route>

            <Route path="/products/our-products">
              <Navbar />
              <OurProductsPage />
              <Footer />
            </Route>

            <Route path="/products/calibration-testing">
              <Navbar />
              <CalibrationTesting />
              <Footer />
            </Route>

            <Route path="/products/training-consultant">
              <Navbar />
              <TrainingConsultant />
              <Footer />
            </Route>

            <Route path="/products/software-management">
              <Navbar />
              <SoftwareManagement />
              <Footer />
            </Route>

            <Route path="/products/automation-control">
              <Navbar />
              <AutomationControl />
              <Footer />
            </Route>

            <Route path="/products/repair-inspection">
              <Navbar />
              <RepairInspection />
              <Footer />
            </Route>

            <Route>
              <Navbar />
              <NotFound />
              <Footer />
            </Route>

          </Switch>
        </AuthProvider>
      </LanguageProvider>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
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
