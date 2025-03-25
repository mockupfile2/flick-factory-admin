
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-red-500/20 animate-pulse rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold font-display">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The link might be incorrect or the page may have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="#" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
