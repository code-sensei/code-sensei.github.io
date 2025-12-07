import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLink = (platform: "github" | "linkedin" | "email") => () => {
    const urls = {
      github: "https://github.com/code-sensei",
      linkedin: "https://linkedin.com/in/btsowa",
      email: "mailto:babangidatsowa@gmail.com",
    };
    if (platform === "email") {
      window.location.href = urls[platform];
    } else {
      window.open(urls[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fadeIn order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-muted-foreground font-medium animate-slideIn">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold animate-slideIn delay-100">
                <span className="gradient-text">Babangida Tsowa</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground animate-slideIn delay-200">
                Product & AI Engineer
              </h2>
              <p className="text-sm sm:text-base text-primary/80 font-medium animate-slideIn delay-250">
                Organizer, AI Tinkerers Abuja
              </p>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-slideIn delay-300">
                I partner with forward-thinking organizations to architect
                intelligent systems and scalable products that drive measurable
                impact—from AI-powered platforms to mission-critical
                applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideIn delay-400">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="group transition-smooth"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={openLink("github")}
                  variant="outline"
                  size="icon"
                  className="transition-smooth hover:scale-110 hover:border-primary hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  onClick={openLink("linkedin")}
                  variant="outline"
                  size="icon"
                  className="transition-smooth hover:scale-110 hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  onClick={openLink("email")}
                  variant="outline"
                  size="icon"
                  className="transition-smooth hover:scale-110 hover:border-primary hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 animate-fadeIn delay-500">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  7+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  20+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  18+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-scaleIn delay-200">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-secondary/30 rounded-full blur-2xl animate-pulse"></div>

                {/* Image */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                    <img
                      src="/profile-image.png"
                      alt="Babangida Tsowa"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-float shadow-lg"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-float shadow-lg"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/4 -left-6 w-4 h-4 bg-accent rounded-full animate-float shadow-lg"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToAbout}
          className="rounded-full hover:bg-primary/10"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
