import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import { ThemeDecorations } from "@/components/ThemeDecorations";
import { FloatingThemeWidget } from "@/components/FloatingThemeWidget";
import type { ThemeType } from "@/components/ThemeManager";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [theme, setTheme] = useState<ThemeType>("default");
  const [decorationsEnabled, setDecorationsEnabled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("website-theme") as ThemeType | null;
    const savedDecorations = localStorage.getItem("website-decorations");

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedDecorations) {
      setDecorationsEnabled(JSON.parse(savedDecorations));
    }
  }, []);

  return (
    <>
      <Router />
      <FloatingThemeWidget />
      <ThemeDecorations theme={theme} enabled={decorationsEnabled} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
