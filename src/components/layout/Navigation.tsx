import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  User,
  Wrench,
  FolderKanban,
  Briefcase,
  Users,
  GraduationCap,
  BookOpen,
  FileCode2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "community", label: "Community", icon: Users },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "blog", label: "Blog", icon: BookOpen, isRoute: true },
  { id: "cheatsheets", label: "Cheatsheets", icon: FileCode2, isRoute: true },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const getActiveItem = useCallback(() => {
    if (!isHomePage) {
      const routeName = location.pathname.split("/")[1];
      return routeName || "home";
    }
    return activeSection;
  }, [isHomePage, location.pathname, activeSection]);

  const currentActive = getActiveItem();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isHomePage) {
        const scrollPosition = window.scrollY + 120;

        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i];
          if (item.isRoute) continue;

          const section = document.getElementById(item.id);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = useCallback(
    (sectionId: string, isRoute?: boolean) => {
      if (isRoute) {
        navigate(`/${sectionId}`);
        setIsOpen(false);
        return;
      }

      if (!isHomePage) {
        navigate(`/#${sectionId}`);
        setIsOpen(false);
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setIsOpen(false);
    },
    [isHomePage, navigate],
  );

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
      className={cn(
        "fixed top-4 left-4 right-4 z-50 transition-all duration-200 rounded-xl",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-3 rounded-lg"
            aria-label="Go to home"
          >
            <div className="relative">
              <img
                src="/profile-image.png"
                alt=""
                className="size-8 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/50 transition-colors"
              />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-primary rounded-full border-2 border-background" />
            </div>
            <span className="hidden sm:block font-semibold text-foreground group-hover:text-primary transition-colors">
              Babangida
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentActive === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.isRoute)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-200",
            isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0",
          )}
        >
          <div className="pt-2 space-y-1 border-t border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentActive === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.isRoute)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto size-1.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
      )}
    </nav>
  );
}
