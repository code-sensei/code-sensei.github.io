import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/code-sensei",
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/btsowa",
    icon: Linkedin,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:babangidatsowa@gmail.com",
    icon: Mail,
  },
] as const;

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "18+", label: "Happy Clients" },
] as const;

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleSocialClick = (href: string) => {
    if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="size-1.5 rounded-full bg-primary" />
              Available for opportunities
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <p className="text-muted-foreground">Hi, I'm</p>
              <h1 className="text-display-lg tracking-tight">
                Babangida Tsowa
              </h1>
              <h2 className="text-heading-lg text-muted-foreground">
                Product & AI Engineer
              </h2>
              <p className="text-primary font-medium">
                Organizer, AI Tinkerers Abuja
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-body-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I partner with forward-thinking organizations to architect
              intelligent systems and scalable products that drive measurable
              impact—from AI-powered platforms to mission-critical applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group"
              >
                View My Work
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("about")}
                className="group"
              >
                Learn More
                <ArrowDown className="ml-2 size-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 justify-center lg:justify-start">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.id}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSocialClick(link.href)}
                    className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                    aria-label={link.label}
                  >
                    <Icon className="size-5" />
                  </Button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-display-sm text-foreground font-semibold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative size-64 sm:size-72 lg:size-80">
              {/* Simple ring */}
              <div className="absolute inset-0 rounded-full border-2 border-border" />

              {/* Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden bg-muted">
                <img
                  src="/profile-image.png"
                  alt="Babangida Tsowa"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="size-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
