
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Experience = () => {
  const experiences = [
    {
      company: 'TechCorp Solutions',
      role: 'Senior Full Stack Developer',
      duration: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices for code quality and performance.',
      highlights: [
        'Reduced application load time by 40% through optimization',
        'Led a team of 5 developers on a major product launch',
        'Implemented CI/CD pipelines improving deployment efficiency by 60%',
      ],
    },
    {
      company: 'Digital Innovations Inc',
      role: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Developed responsive web applications and mobile-first designs. Collaborated with UX/UI designers to implement pixel-perfect interfaces using React and modern CSS frameworks.',
      highlights: [
        'Built 15+ responsive web applications',
        'Improved user engagement by 35% through UX improvements',
        'Introduced component-based architecture reducing development time by 25%',
      ],
    },
    {
      company: 'StartupXYZ',
      role: 'Junior Web Developer',
      duration: '2019 - 2020',
      description: 'Worked on various web development projects using HTML, CSS, JavaScript, and PHP. Gained experience in database design and API development.',
      highlights: [
        'Contributed to 10+ client projects',
        'Learned modern web development practices',
        'Collaborated with cross-functional teams',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made at various organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-12 md:ml-0`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-xl">{experience.role}</CardTitle>
                          <CardDescription className="text-lg font-semibold text-primary">
                            {experience.company}
                          </CardDescription>
                        </div>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {experience.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{experience.description}</p>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {experience.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
