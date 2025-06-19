
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        "Organized a two-week Data Science and Artificial Intelligence Bootcamp in partnership with DSN Nigeria."
      ],
    },
  ];

  const certifications = [
    {
      name: "AI Engineering Professional Certification (In Progress)",
      issuer: "IBM Skills Network",
      date: "Expected Completion: November 2025",
      level: "In Progress",
      link: 'https://www.coursera.org/professional-certificates/ai-engineer'
    },
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic history, highlights, and recognized professional certifications.
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Education</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">
                        {edu.institution}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-xs w-max text-muted-foreground bg-muted px-3 py-1 rounded-full mb-2">
                        {edu.duration}
                      </div>
                      <div className="text-xs w-min text-black bg-primary px-3 py-1 rounded-full mb-1">
                        {edu.grade}
                      </div>
                    </div>
                  </div>
                  {/* No program description */}
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Highlights:</h4>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{cert.issuer}</CardDescription>
                  <CardDescription>{cert.date}</CardDescription>
                  <CardDescription>{cert.level}</CardDescription>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className='mt-4 inline-block text-primary hover:underline'>
                    {/* <Button> */}
                      View Program
                    {/* </Button> */}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
