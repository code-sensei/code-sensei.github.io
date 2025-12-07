import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Award, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Education = () => {
  const education = [
    {
      institution: "Federal University of Technology, Minna",
      degree: "B.Tech., Computer Science (Second Class, Upper Division)",
      duration: "2014 – 2021",
      grade: "3.65/5.00",
      description: "",
      highlights: [
        "Director of Software, SICT: Organized Google Hash Code Competitions (2), hackathons, AI/DS labs.",
        "Co‑founded FUTMINNA DevCircle, nurturing Google Developer Groups, GDSC, Ingressive for Good, Women Tech Makers, GitHub Campus Ambassadors, etc.",
        "Developed a faculty payment portal adopted across departments.",
        "Organized a two-week Data Science and Artificial Intelligence Bootcamp in partnership with DSN Nigeria.",
      ],
    },
  ];

  const certifications = [
    {
      name: "AI Engineering Professional Certification (In Progress)",
      issuer: "IBM Skills Network",
      date: "Expected Completion: November 2025",
      level: "In Progress",
      link: "https://www.coursera.org/professional-certificates/ai-engineer",
      color: "text-blue-500",
    },
  ];

  return (
    <section id="education" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Education & Certifications
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation and professional credentials that underpin
            strategic technical execution at scale
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center gradient-text animate-fadeIn">
            Education
          </h3>
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="card-hover group overflow-hidden border-2 hover:border-primary/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <GraduationCap className="w-6 h-6 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-base md:text-lg font-semibold text-primary mt-1">
                            {edu.institution}
                          </CardDescription>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground glass-effect px-3 py-1.5 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.duration}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full w-fit">
                        GPA: {edu.grade}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Highlights:
                  </h4>
                  <ul className="space-y-2.5">
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className="flex items-start gap-2 group/item"
                      >
                        <span className="text-primary mt-1 group-hover/item:scale-125 transition-transform">
                          •
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center gradient-text">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="card-hover group overflow-hidden border-2 hover:border-primary/50"
                style={{
                  animationDelay: `${(index + education.length) * 100}ms`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative z-10 space-y-3">
                  <div
                    className={`${cert.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors leading-tight">
                    {cert.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-3">
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Issuer:</span>
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {cert.level}
                      </span>
                    </div>
                    <div className="text-xs">{cert.date}</div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 group-hover:border-primary group-hover:text-primary transition-all"
                    asChild
                  >
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Program
                    </a>
                  </Button>

                  {/* Decorative Bottom Border */}
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 rounded-full group-hover:w-full transition-all duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Learning Section */}
        <div className="mt-12 md:mt-16 text-center animate-fadeIn">
          <div className="glass-effect inline-block px-8 py-6 rounded-2xl max-w-2xl">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Continuous Learning
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Committed to staying at the forefront of technology through
              continuous learning, online courses, and hands-on projects in AI,
              cloud computing, and modern web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
