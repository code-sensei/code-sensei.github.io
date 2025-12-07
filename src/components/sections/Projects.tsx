import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Lock } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Intelligence Platform",
      description:
        "Developed a big-data and AI-enabled intelligence system for the Federal Ministry of Foreign Affairs, enabling advanced policy analysis and real-time security insights. Led frontend architecture (React, Next.js, TypeScript) and collaborated closely with stakeholders to deliver custom analytics components. Improved data processing efficiency by 35%.",
      image: "/projects/mfa-project.png",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Big Data",
        "AI",
      ],
      // githubUrl: '#',
      // liveUrl: '#',
      featured: true,
      demo: false,
      private: true,
    },
    {
      title: "National Youth Investment Fund (NYIF) Portal",
      description:
        "Developed a prototype for the NYIF portal, enhancing user experience and accessibility for Nigerian youth seeking investment opportunities. Utilized React.js and Next.js to create a responsive and intuitive interface, streamlining application processes and improving engagement.",
      image: "/projects/fmyd-nyif.png",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Big Data",
        "AI",
      ],
      // githubUrl: '#',
      liveUrl: "https://nyif-portal.vercel.app/",
      featured: true,
      demo: true,
    },
    {
      title: "Project PowerPulse – AI-Driven Energy Management",
      description:
        "A personal project leveraging AI to manage & optimize energy consumption in homes with prepaidi meters in Nigeira. Developed a React.js frontend with Next.js for server-side rendering and TypeScript for type safety. Integrated machine learning models to analyze usage patterns and provide actionable insights, reducing energy costs by up to 20%.",
      image: "/projects/power-pulse.png",
      technologies: ["React.js", "Next.js", "TypeScript", "AI", "LangChain"],
      // githubUrl: '#',
      liveUrl: "https://power-pulse-vercel.vercel.app/",
      featured: false,
      demo: true,
    },
    {
      title: "Market Intelligence AI Agent",
      description:
        "Developed an AI agent for market intelligence, enabling real-time data analysis and insights generation. Utilized LangChain, HuggingFace and OpenRouter APIs to create a robust system that processes latest news and provides actionable recommendations.",
      image: "/projects/mercatus.png",
      technologies: [
        "LangChain",
        "HuggingFace",
        "OpenRouter",
        "AI",
        "JavaScript",
        "TypeScript",
      ],
      // githubUrl: '#',
      liveUrl: "",
      featured: false,
      demo: false,
      private: true,
    },
    {
      title: "Clafiya User Dashboard & Reusable Component Library",
      description:
        "Engineered frontend architecture and a reusable component system for Clafiya, a healthtech startup. Supported rapid scaling to 1,000+ users and streamlined admin workflows, directly contributing to successful Series A funding ($610,000). Leveraged React.js and Next.js to drive maintainability and UI/UX excellence.",
      image: "/projects/clafiya-user.png",
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "UI/UX",
        "Component Design",
        "SSR",
        "Performance Optimization",
      ],
      // githubUrl: '#',
      liveUrl: "https://user-dashboard-liart.vercel.app/auth/login",
      featured: false,
      demo: true,
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
      title: "Web3 DApp & NFT Marketplace Integrations",
      description:
        "Frontend developer for decentralized applications at Quantum Tech LLC (USA), integrating Web3 functionality using Vue 3, Nuxt.js, and blockchain APIs (Ethereum, Polygon). Delivered NFT marketplace interfaces and ensured seamless end-to-end dApp functionality in coordination with global teams.",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      technologies: [
        "Vue 3",
        "Nuxt.js",
        "Web3.js",
        "NFT",
        "Ethereum",
        "Polygon",
      ],
      // githubUrl: '#',
      liveUrl: "/projects/doji-market.png",
      featured: false,
      demo: false,
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
      title: "NCC Licencing Application Management System",
      description:
        "Frontend developer on a team modernizing license management for the Nigerian Communications Commission (NCC). Ensured cross-device usability using Angular and collaborated across design, dev, and QA to deliver digitized management tools in a regulatory environment.",
      image: "/projects/lamsy.png",
      technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "Semantic UI"],
      githubUrl: "",
      liveUrl: "https://licensing.ncc.gov.ng/",
      featured: true,
    },
    {
      title: "NCC Type Approval Management System",
      description:
        "Contributed to the Type Approval Management System for the Nigerian Communications Commission (NCC), enhancing regulatory compliance and device approval processes. Developed user-friendly interfaces with Angular and ensured robust data management practices.",
      image: "/projects/tamsy.png",
      technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "Semantic UI"],
      githubUrl: "",
      liveUrl: "https://tamsy.ncc.gov.ng/",
      featured: true,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  const openLink = (url) => () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const bookMeeting = () => {
    window.open(
      "https://app.reclaim.ai/m/babangida-tsowa",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions deployed across government, enterprise, and
            high-growth environments—where results speak louder than features
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              className="group card-hover overflow-hidden border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-56 md:h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Hover Action Buttons */}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex gap-2 w-full">
                    {project.liveUrl && project.demo && (
                      <Button
                        size="sm"
                        className="flex-1 glass-effect hover:bg-primary/90"
                        onClick={openLink(project.liveUrl)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 glass-effect hover:bg-background/90"
                        onClick={openLink(project.githubUrl)}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    )}

                    {project.liveUrl && !project.demo && (
                      <Button
                        size="sm"
                        className="flex-1 glass-effect hover:bg-primary/90"
                        onClick={openLink(project.liveUrl)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </Button>
                    )}

                    {project.private && (
                      <Button
                        size="sm"
                        className="flex-1 glass-effect hover:bg-primary/90 text-xs"
                        onClick={bookMeeting}
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        Private Demo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Badge for Private/Demo */}
                {project.private && (
                  <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Private
                  </div>
                )}
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs md:text-sm font-medium">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div className="animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center gradient-text">
            Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {otherProjects.map((project, index) => (
              <Card
                key={index}
                className="group card-hover overflow-hidden flex flex-col border hover:border-primary/50"
                style={{
                  animationDelay: `${(index + featuredProjects.length) * 100}ms`,
                }}
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {project.private && (
                    <div className="absolute top-3 right-3 glass-effect px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Lock className="h-2.5 w-2.5" />
                      Private
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3 flex-grow">
                  <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button
                        onClick={openLink(project.githubUrl)}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs hover:border-primary hover:text-primary"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </Button>
                    )}

                    {project.liveUrl && project.demo && (
                      <Button
                        onClick={openLink(project.liveUrl)}
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    )}

                    {project.liveUrl && !project.demo && (
                      <Button
                        onClick={openLink(project.liveUrl)}
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                      </Button>
                    )}

                    {project.private && (
                      <Button
                        onClick={bookMeeting}
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    )}
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
