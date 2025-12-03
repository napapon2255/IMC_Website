import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Navbar from "@/components/layout/Navbar";
import OurProductsPage from "./pages/OurProductsPage";
import CertifiedDetail from "./pages/CertifiedDetail";
import CalibrationTesting from "./pages/CalibrationTesting";


function Router() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/certified/:category" component={CertifiedDetail} />
        <Route path="/products/our-products" component={OurProductsPage} />   
        <Route path="/products/calibration-testing" component={CalibrationTesting} />   
        <Route component={NotFound} />
      </Switch>
    </div>
  );
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
