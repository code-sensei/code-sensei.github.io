import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { truncate } from 'fs';

const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered Intelligence Platform',
      description:
        'Developed a big-data and AI-enabled intelligence system for the Federal Ministry of Foreign Affairs, enabling advanced policy analysis and real-time security insights. Led frontend architecture (React, Next.js, TypeScript) and collaborated closely with stakeholders to deliver custom analytics components. Improved data processing efficiency by 35%.',
      image: '/projects/mfa-project.png',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Big Data', 'AI'],
      // githubUrl: '#',
      // liveUrl: '#',
      featured: true,
      demo: false,
      private: true
    },
    {
      title: 'National Youth Investment Fund (NYIF) Portal',
      description:
        'Developed a prototype for the NYIF portal, enhancing user experience and accessibility for Nigerian youth seeking investment opportunities. Utilized React.js and Next.js to create a responsive and intuitive interface, streamlining application processes and improving engagement.',
      image: '/projects/fmyd-nyif.png',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Big Data', 'AI'],
      // githubUrl: '#',
      liveUrl: 'https://nyif-portal.vercel.app/',
      featured: true,
      demo: true
    },
    {
      title: 'Project PowerPulse – AI-Driven Energy Management',
      description:
        'A personal project leveraging AI to manage & optimize energy consumption in homes with prepaidi meters in Nigeira. Developed a React.js frontend with Next.js for server-side rendering and TypeScript for type safety. Integrated machine learning models to analyze usage patterns and provide actionable insights, reducing energy costs by up to 20%.',
      image: '/projects/power-pulse.png',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'AI', 'LangChain'],
      // githubUrl: '#',
      liveUrl: 'https://power-pulse-vercel.vercel.app/',
      featured: false,
      demo: true
    },
    {
      title: 'Market Intelligence AI Agent',
      description:
        'Developed an AI agent for market intelligence, enabling real-time data analysis and insights generation. Utilized LangChain, HuggingFace and OpenRouter APIs to create a robust system that processes latest news and provides actionable recommendations.',
      image: '/projects/mercatus.png',
      technologies: ['LangChain', 'HuggingFace', 'OpenRouter', 'AI', 'JavaScript', 'TypeScript'],
      // githubUrl: '#',
      liveUrl: '',
      featured: false,
      demo: false,
      private: true
    },
    {
      title: 'Clafiya User Dashboard & Reusable Component Library',
      description:
        'Engineered frontend architecture and a reusable component system for Clafiya, a healthtech startup. Supported rapid scaling to 1,000+ users and streamlined admin workflows, directly contributing to successful Series A funding ($610,000). Leveraged React.js and Next.js to drive maintainability and UI/UX excellence.',
      image: '/projects/clafiya-user.png',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'UI/UX', 'Component Design', 'SSR', 'Performance Optimization'],
      // githubUrl: '#',
      liveUrl: 'https://user-dashboard-liart.vercel.app/auth/login',
      featured: false,
      demo: true
    },
    // {
    //   title: 'Digital Transformation Suite for Sweet Ride Nigeria',
    //   description:
    //     'As CTO, led end-to-end product development, process automation, and feature roadmap planning for Sweet Ride Nigeria. Implemented workflow and infrastructure optimizations that accelerated delivery speed by 25% and boosted user engagement by 15%. Set up CI/CD pipelines and mentored engineering teams on best practices.',
    //   image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
    //   technologies: ['Fullstack', 'Node.js', 'React', 'CI/CD', 'Workflow Automation'],
    //   // githubUrl: '#',
    //   // liveUrl: '#',
    //   featured: true,
    // },
    {
      title: 'Web3 DApp & NFT Marketplace Integrations',
      description:
        'Frontend developer for decentralized applications at Quantum Tech LLC (USA), integrating Web3 functionality using Vue 3, Nuxt.js, and blockchain APIs (Ethereum, Polygon). Delivered NFT marketplace interfaces and ensured seamless end-to-end dApp functionality in coordination with global teams.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
      technologies: ['Vue 3', 'Nuxt.js', 'Web3.js', 'NFT', 'Ethereum', 'Polygon'],
      // githubUrl: '#',
      liveUrl: '/projects/doji-market.png',
      featured: false,
      demo: false
    },
    // {
    //   title: 'GoBeta Suite – Fintech Operations Platform',
    //   description:
    //     'Fullstack developer at Asusu Technology, delivering fintech solutions for improved operational reliability and user experience. Integrated RESTful APIs, automated build pipelines, and deployed third-party payments, resulting in significant efficiency boosts for end-users and operations teams.',
    //   image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop',
    //   technologies: ['Angular', 'Node.js', 'REST APIs', 'Automation', 'Payments'],
    //   githubUrl: '#',
    //   liveUrl: '#',
    //   featured: false,
    // },
    {
      title: 'NCC Licencing Application Management System',
      description:
        'Frontend developer on a team modernizing license management for the Nigerian Communications Commission (NCC). Ensured cross-device usability using Angular and collaborated across design, dev, and QA to deliver digitized management tools in a regulatory environment.',
      image: '/projects/lamsy.png',
      technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Semantic UI'],
      githubUrl: '',
      liveUrl: 'https://licensing.ncc.gov.ng/',
      featured: true,
    },
    {
      title: 'NCC Type Approval Management System',
      description:
        'Contributed to the Type Approval Management System for the Nigerian Communications Commission (NCC), enhancing regulatory compliance and device approval processes. Developed user-friendly interfaces with Angular and ensured robust data management practices.',
      image: '/projects/tamsy.png',
      technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Semantic UI'],
      githubUrl: '',
      liveUrl: 'https://tamsy.ncc.gov.ng/',
      featured: true
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const openLink = (url) => () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const bookMeeting = () => {
    window.open('https://app.reclaim.ai/m/babangida-tsowa', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    { project.liveUrl && project.demo && <Button size="sm" className="flex-1" onClick={openLink(project.liveUrl)}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>}
                    
                    { project.githubUrl && <Button size="sm" variant='outline' className="flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>}
                    { project.liveUrl && !project.demo && <Button size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Link
                    </Button>}
                    { project.private && <Button size="sm" className="flex-1" onClick={bookMeeting}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Book Private Demo
                    </Button>}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col justify-between items-center h-max mt-auto'>
                  <div className="flex flex-wrap gap-1 mb-3 mt-auto">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    { project.githubUrl && <Button onClick={openLink(project.githubUrl)} size="sm" variant="outline" className="flex-1">
                      <Github className="h-3 w-3 mr-1" />
                      Code
                    </Button>}
                    { project.liveUrl && project.demo && <Button onClick={openLink(project.liveUrl)} size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Demo
                    </Button>}
                    { project.liveUrl && !project.demo && <Button onClick={openLink(project.liveUrl)} size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live Link
                    </Button>}
                    { project.private && <Button onClick={bookMeeting} size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Available for Private Demo
                    </Button>}
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

export default Projects;
