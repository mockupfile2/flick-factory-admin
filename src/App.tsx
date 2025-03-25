
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import Admin from "./pages/Admin";
import AdminMovieForm from "./pages/AdminMovieForm";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<><ScrollToTop /><Index /></>} />
          <Route path="/movie/:id" element={<><ScrollToTop /><MovieDetail /></>} />
          <Route path="/admin" element={<><ScrollToTop /><Admin /></>} />
          <Route path="/admin/movie/add" element={<><ScrollToTop /><AdminMovieForm /></>} />
          <Route path="/admin/movie/edit/:id" element={<><ScrollToTop /><AdminMovieForm /></>} />
          <Route path="*" element={<><ScrollToTop /><NotFound /></>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
