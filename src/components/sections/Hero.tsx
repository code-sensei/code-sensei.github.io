
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLink = (platform: 'github' | 'linkedin') => () => {
    const urls = {
      github: 'https://github.com/code-sensei',
      linkedin: 'https://linkedin.com/in/btsowa',
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 col-span-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground font-medium">Hi, I'm</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Babangida Tsowa
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
                Fullstack Developer, AI Engineer, & Consultant
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                I build robust, end-to-end web applications, engineer intelligent AI systems, and provide expert technology consulting to help businesses achieve their goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={scrollToAbout}>
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex gap-3 justify-center">
                <Button onClick={openLink('github')} variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
                <Button onClick={openLink('linkedin')} variant="outline" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end col-span-4">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src="/profile-image.png"
                  alt="Babangida Tsowa"
                  className="w-72 h-72 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
              {/* Floating elements for animation */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToAbout}>
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
