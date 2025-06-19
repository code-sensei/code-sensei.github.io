
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Experience = () => {
  const experiences = [
    {
      company: 'Ministry of Foreign Affairs, Nigeria',
      role: 'Software & AI Consultant',
      duration: 'Oct 2023 – Present',
      description:
        'Consulted on and delivered AI-driven and fullstack solutions to improve workflow efficiency and digital reporting, focusing on sustainable transformation across teams.',
      highlights: [
        'Engineered responsive UIs with React, TypeScript, and Next.js, streamlining internal processes (Fullstack, Consulting).',
        'Architected frontend for real-time intelligence platforms, optimizing user experience and response times (AI, Fullstack).',
        'Developed AI tools for workflow automation, increasing operational efficiency (AI, Consulting).',
        'Aligned development with institutional goals through stakeholder engagement and robust documentation (Consulting).',
        'Led knowledge-sharing sessions on AI integration and software best practices (AI, Consulting).',
      ],
    },
    {
      company: 'SweetRide Nigeria LTD',
      role: 'Chief Technology Officer (CTO)',
      duration: 'Oct 2022 – Aug 2024',
      description:
        'Oversaw product engineering and strategy for scalable mobility platforms, mentoring teams and driving fullstack innovation.',
      highlights: [
        'Directed design and end-to-end development of operational platforms (Fullstack, Consulting).',
        'Led PRD authorship and SWOT analyses to inform AI and product strategy (Consulting, AI).',
        'Mentored engineers, setting standards for code quality and QA (Consulting, Fullstack).',
        'Automated key business processes, enhancing operational workflows (Fullstack, Consulting).',
      ],
    },
    {
      company: 'Federal Ministry of Foreign Affairs',
      role: 'Development Team Lead (Contractor)',
      duration: 'Jan 2023 – Oct 2023',
      description:
        'Led delivery of AI-powered platforms for government data analysis and automation, integrating robust APIs for improved analytics.',
      highlights: [
        'Built big-data, AI-enabled systems for advanced reporting (AI, Fullstack).',
        'Designed/implemented RESTful APIs with Node.js, Express, and JWT security (Fullstack).',
        'Ensured seamless frontend-backend integration for consistent features (Fullstack).',
        'Promoted agile, collaborative practices using GitHub and Jira (Consulting, Fullstack).',
      ],
    },
    {
      company: 'Clafiya',
      role: 'Lead Frontend Engineer',
      duration: 'Jan 2021 – Oct 2022',
      description:
        'Directed frontend development for a health-tech platform, supporting scale, funding, and operational advancements through modular design.',
      highlights: [
        'Built/coordinated apps for 1,000+ users using React.js and Next.js (Fullstack).',
        'Developed modular UI systems, enabling rapid feature iterations (Fullstack).',
        'Enhanced admin workflows, contributing to successful Series A fundraising (Consulting, Fullstack).',
        'Collaborated with cross-functional teams for robust product delivery (Consulting, Fullstack).',
      ],
    },
    {
      company: 'Quantum Tech LLC',
      role: 'Frontend Developer (Web3, Blockchain)',
      duration: 'Mar 2022 – Aug 2022',
      description:
        'Developed interfaces for decentralized applications, collaborating on fullstack and blockchain integrations for NFT platforms.',
      highlights: [
        'Delivered DApp features in Vue 3/Nuxt.js with blockchain backend integration (Fullstack, Consulting).',
        'Implemented NFT marketplace interfaces for Ethereum/Polygon ecosystems (Fullstack).',
        'Collaborated with Solidity and backend teams to ensure full product delivery (Fullstack, Consulting).',
      ],
    },
    {
      company: 'Asusu Technology',
      role: 'Full Stack Developer',
      duration: 'Feb 2020 – Mar 2021',
      description:
        'Engineered and maintained digital finance platforms, focusing on seamless user experience and scalable architecture.',
      highlights: [
        'Integrated RESTful APIs with dynamic frontends for seamless data flow (Fullstack).',
        'Automated build/deploy pipelines for faster, more robust releases (Fullstack).',
        'Enhanced payment workflows, improving operational efficiency (Fullstack, Consulting).',
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
      {/* Key Achievements Section */}
      <section className="pt-12">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-2">Key Achievements</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selected highlights across my professional and community journey.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="funding">🚀</span>
                <span className="font-semibold text-base">Series A Funding</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Contributed to securing $610,000 in Series A funding at Clafiya by driving and leading frontend innovation.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="ai">🤖</span>
                <span className="font-semibold text-base">AI Solution Delivery</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Delivered a big-data AI solution for the Ministry of Foreign Affairs, improving national security reporting processes.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="event">🏆</span>
                <span className="font-semibold text-base">Major Event Leadership</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Organized the NACOSS National Hackathon and coordinated two Google Hash Code Competitions.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="github">💻</span>
                <span className="font-semibold text-base">Community Training</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Led a GitHub workshop attended by over 100 participants, focusing on platform best practices.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="ds">📊</span>
                <span className="font-semibold text-base">AI Bootcamp Organizer</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Organized a two-week Data Science and Artificial Intelligence Bootcamp in partnership with DSN Nigeria.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="policy">📄</span>
                <span className="font-semibold text-base">National Policy Contributor</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                Participated in reviewing the National AI Strategy and NITDA’s Software Development Guidelines.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
};

export default Experience;
