import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Community from "../components/sections/Community";
import Education from "../components/sections/Education";
// import Blog from "../components/sections/Blog";
import Contact from "../components/sections/Contact";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import {
  SEO,
  generateProfilePageSchema,
  generateNavigationSchema,
} from "@/components/seo";

const Index = () => {
  const location = useLocation();

  // Handle hash-based navigation (e.g., /#about from other pages)
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.slice(1); // Remove the '#'
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          const offset = 80; // Height of navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location.hash]);

  // Generate structured data for homepage
  const homepageStructuredData = [
    generateProfilePageSchema(),
    generateNavigationSchema(),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags and Structured Data for Homepage */}
      <SEO
        title="Babangida Tsowa | Product & AI Engineer"
        description="Trusted by government institutions and venture-backed startups to architect AI-driven platforms and mission-critical systems. Specializing in solutions where precision and scale aren't optional."
        keywords={[
          "Babangida Tsowa",
          "Product Engineer",
          "AI Engineer",
          "Software Architect",
          "AI Systems",
          "Machine Learning",
          "Full-Stack Developer",
          "Enterprise Software",
          "Government AI Solutions",
          "Strategic Technology Consultant",
        ]}
        url="/"
        ogType="profile"
        ogImage="/profile-image.png"
        ogImageAlt="Babangida Tsowa - Product & AI Engineer"
        structuredData={homepageStructuredData}
      />

      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Community />
        <Education />
        {/* <Blog /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
