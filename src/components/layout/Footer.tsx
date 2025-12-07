import React from "react";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/code-sensei",
      color: "hover:text-purple-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/btsowa",
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:babangidatsowa@gmail.com",
      color: "hover:text-green-500",
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
    { name: "Home", href: "#home" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-muted/50 border-t border-border overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold gradient-text">
                Babangida Tsowa
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fullstack Developer, AI Engineer, & Technology Consultant
                passionate about creating innovative solutions that drive real
                impact.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  asChild
                  className={`transition-all duration-300 hover:scale-110 hover:border-primary ${social.color}`}
                >
                  <a
                    href={social.url}
                    target={social.name === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">More</h4>
            <ul className="space-y-2">
              {moreLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Available for freelance projects and consulting opportunities.
              </p>
              <Button
                size="sm"
                className="w-full transition-all hover:scale-105"
                asChild
              >
                <a href="mailto:babangidatsowa@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Babangida Tsowa. All rights reserved.{" "}
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-red-500 inline" /> and
              React
            </span>
          </p>

          {/* Scroll to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="transition-all hover:scale-105 hover:border-primary hover:text-primary group"
          >
            <span className="text-xs">Back to top</span>
            <ArrowUp className="h-3 w-3 ml-2 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            This portfolio showcases my work as a Fullstack Developer, AI
            Engineer, and Technology Consultant. I specialize in React, Next.js,
            Node.js, Python, AI/ML, and cloud technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
