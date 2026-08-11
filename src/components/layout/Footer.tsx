import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/code-sensei",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/btsowa",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:babangidatsowa@gmail.com",
  },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

const moreLinks = [
  { name: "Community", href: "#community" },
  { name: "Education", href: "#education" },
  { name: "Blog", href: "/blog" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border bg-muted/25 backdrop-blur-[2px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        aria-hidden
      />
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">
                Babangida Tsowa
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Product & AI Engineer specializing in high-impact systems for
                organizations where precision, scale, and innovation aren't
                optional.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <a
                      href={social.url}
                      target={social.name === "Email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="size-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer rounded-md px-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">More</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer rounded-md px-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">
              Get In Touch
            </h4>
            <p className="text-sm text-muted-foreground">
              Currently accepting select consulting engagements and strategic
              partnerships.
            </p>
            <Button size="sm" className="w-full" asChild>
              <a href="mailto:babangidatsowa@gmail.com">
                <Mail className="size-4 mr-2" />
                Contact Me
              </a>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Babangida Tsowa. Built with{" "}
            <Heart className="size-3 text-red-500 inline" /> and React
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
