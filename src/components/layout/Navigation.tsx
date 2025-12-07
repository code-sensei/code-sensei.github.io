import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: Array<{ id: string; label: string; isRoute?: boolean }> = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "community", label: "Community" },
    { id: "education", label: "Education" },
    // { id: "blog", label: "Blog", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for navbar background
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, isRoute?: boolean) => {
    if (isRoute) {
      window.location.href = `/${sectionId}`;
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-lg"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex-shrink-0 group"
          >
            <img
              src="/profile-image.png"
              alt="Babangida Tsowa"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105 object-cover"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.isRoute)}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
              >
                <div
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180 scale-0" : "rotate-0 scale-100"
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </div>
                <div
                  className={`absolute transition-transform duration-300 ${
                    isOpen ? "rotate-0 scale-100" : "-rotate-180 scale-0"
                  }`}
                >
                  <X className="h-6 w-6" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[calc(100vh-5rem)] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-background/95 backdrop-blur-md rounded-b-2xl shadow-2xl border-t border-border/50">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id, item.isRoute)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10 scale-[1.02]"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:scale-[1.02]"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? "slideIn 0.3s ease-out forwards" : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;
