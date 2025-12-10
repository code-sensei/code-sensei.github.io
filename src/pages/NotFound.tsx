import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated Background with Gradient - matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Large 404 Text */}
        <div className="relative mb-8 animate-fadeIn">
          <h1 className="text-[10rem] sm:text-[12rem] lg:text-[14rem] font-bold leading-none select-none">
            <span className="gradient-text">404</span>
          </h1>
          {/* Floating Elements */}
          <div className="absolute top-8 right-1/4 w-6 h-6 bg-primary rounded-full animate-float shadow-lg"></div>
          <div
            className="absolute bottom-8 left-1/4 w-4 h-4 bg-secondary rounded-full animate-float shadow-lg"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-8 w-3 h-3 bg-accent rounded-full animate-float shadow-lg"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10 animate-slideIn">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Attempted path:{" "}
            <code className="px-2 py-1 bg-muted rounded text-primary">
              {location.pathname}
            </code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideIn delay-200">
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="group transition-smooth"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="group transition-smooth hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/blog")}
            className="group transition-smooth hover:border-primary hover:text-primary"
          >
            <Search className="mr-2 h-4 w-4" />
            Browse Blog
          </Button>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-16 animate-fadeIn delay-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-primary/50"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
