
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Education = () => {
  const education = [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      duration: '2015 - 2019',
      grade: 'Magna Cum Laude',
      description: 'Focused on software engineering, algorithms, and web technologies. Graduated with honors.',
      highlights: [
        'Dean\'s List for 6 semesters',
        'Capstone project: Full-stack web application for student management',
        'Member of Computer Science Society',
      ],
    },
    {
      institution: 'Tech Academy',
      degree: 'Full Stack Web Development Bootcamp',
      duration: '2019',
      grade: 'Certificate of Completion',
      description: 'Intensive 12-week program covering modern web development technologies and best practices.',
      highlights: [
        'Built 5 full-stack applications',
        'Learned React, Node.js, and database design',
        'Collaborative projects with industry mentors',
      ],
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      level: 'Associate',
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
      level: 'Professional',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2021',
      level: 'Associate',
    },
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications
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
                      <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
                        {edu.duration}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {edu.grade}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{edu.description}</p>
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
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">{cert.level}</div>
                    <div className="text-sm text-muted-foreground">{cert.date}</div>
                  </div>
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
