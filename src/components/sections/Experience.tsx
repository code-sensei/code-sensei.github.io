import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Ministry of Foreign Affairs, Nigeria",
      role: "Software & AI Consultant",
      duration: "Oct 2023 – Present",
      description:
        "Retained to architect AI-driven intelligence systems and full-stack platforms that modernize critical government operations—delivering sustainable transformation at scale.",
      highlights: [
        "Architected real-time intelligence platforms processing national security data—35% faster insights, exponentially better decision-making (AI, Fullstack).",
        "Engineered responsive UIs with React, TypeScript, and Next.js that replaced legacy systems and streamlined cross-departmental workflows (Fullstack).",
        "Delivered AI-powered automation tools that eliminated manual bottlenecks across multiple government agencies (AI, Consulting).",
        "Facilitated strategic alignment sessions with senior stakeholders—translating technical complexity into executive clarity (Consulting).",
        "Established AI integration standards now adopted across ministry departments (AI, Consulting).",
      ],
    },
    {
      company: "SweetRide Nigeria LTD",
      role: "Chief Technology Officer (CTO)",
      duration: "Oct 2022 – Aug 2024",
      description:
        "Brought in to rebuild technical infrastructure and lead product strategy for a high-growth mobility startup—transforming engineering culture while scaling operations.",
      highlights: [
        "Rebuilt core platform from ground up—25% faster delivery, 15% higher engagement, zero downtime during migration (Fullstack).",
        "Authored strategic PRDs and conducted SWOT analyses that shaped AI roadmap and secured executive buy-in (Consulting, AI).",
        "Elevated engineering team from ad-hoc to world-class—implementing code standards, testing protocols, and mentorship programs (Consulting, Fullstack).",
        "Automated critical workflows that previously required manual intervention—unlocking operational scale (Fullstack, Consulting).",
      ],
    },
    {
      company: "Federal Ministry of Foreign Affairs",
      role: "Development Team Lead (Contractor)",
      duration: "Jan 2023 – Oct 2023",
      description:
        "Selected to lead high-stakes delivery of AI-powered big-data platforms for national intelligence—where failure wasn't an option.",
      highlights: [
        "Architected and delivered big-data AI systems handling millions of records—directly informing policy decisions at the highest levels (AI, Fullstack).",
        "Built secure RESTful APIs with Node.js, Express, and JWT—meeting government-grade security standards on the first audit (Fullstack).",
        "Led technical integration across multiple teams—ensuring zero discrepancies between frontend and backend features (Fullstack).",
        "Introduced agile methodologies that cut delivery cycles in half while improving code quality (Consulting, Fullstack).",
      ],
    },
    {
      company: "Clafiya",
      role: "Lead Frontend Engineer",
      duration: "Jan 2021 – Oct 2022",
      description:
        "Recruited to lead frontend architecture for a venture-backed health-tech platform scaling from MVP to Series A—where execution determined funding.",
      highlights: [
        "Architected component libraries and frontend systems that supported $610K Series A raise—proving technical capability to investors (Fullstack).",
        "Scaled platform to 1,000+ active users with React.js and Next.js—doubling admin efficiency while maintaining sub-second load times (Fullstack).",
        "Built modular UI systems that compressed feature delivery cycles from weeks to days (Fullstack).",
        "Orchestrated frontend-backend alignment across distributed teams—zero blocked releases over 18 months (Consulting, Fullstack).",
      ],
    },
    {
      company: "Quantum Tech LLC",
      role: "Frontend Developer (Web3, Blockchain)",
      duration: "Mar 2022 – Aug 2022",
      description:
        "Brought in to architect DApp interfaces for NFT marketplace launching on Ethereum and Polygon—where user experience directly impacted transaction volume.",
      highlights: [
        "Built production-ready DApp interfaces in Vue 3/Nuxt.js—seamlessly connecting Web3 wallets with smart contracts (Fullstack).",
        "Launched NFT marketplace UI handling thousands of transactions across Ethereum and Polygon networks (Fullstack).",
        "Bridged frontend-blockchain gap with Solidity developers—eliminating integration issues before production (Fullstack, Consulting).",
      ],
    },
    {
      company: "Asusu Technology",
      role: "Full Stack Developer",
      duration: "Feb 2020 – Mar 2021",
      description:
        "Built foundational full-stack systems for a digital finance platform—establishing patterns for scale before scale was needed.",
      highlights: [
        "Engineered API-frontend integrations for fintech workflows handling sensitive financial data—zero security incidents (Fullstack).",
        "Built CI/CD pipelines that reduced deployment time from hours to minutes while increasing release confidence (Fullstack).",
        "Optimized payment processing flows—directly improving transaction success rates and customer satisfaction (Fullstack, Consulting).",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made at various
            organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full hidden md:block"></div>
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full md:hidden"></div>

          <div className="space-y-8 md:space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`relative flex items-center animate-fadeIn ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-background z-10 shadow-lg">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  } ml-12 md:ml-0`}
                >
                  <Card className="card-hover group border-2 hover:border-primary/50 overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                                {experience.role}
                              </CardTitle>
                              <CardDescription className="text-base md:text-lg font-semibold text-primary mt-1">
                                {experience.company}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full glass-effect w-fit">
                          <Calendar className="w-3.5 h-3.5" />
                          {experience.duration}
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {experience.description}
                      </p>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2.5">
                        {experience.highlights.map(
                          (highlight, highlightIndex) => (
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
                          ),
                        )}
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
      <section className="pt-16 md:pt-20">
        <div className="text-center mb-10 md:mb-12 animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
            Key Achievements
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Selected highlights across my professional and community journey.
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="funding"
                >
                  🚀
                </span>
                <span className="font-semibold text-sm md:text-base">
                  Series A Funding
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Contributed to securing $610,000 in Series A funding at Clafiya
                by driving and leading frontend innovation.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="ai"
                >
                  🤖
                </span>
                <span className="font-semibold text-sm md:text-base">
                  AI Solution Delivery
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Delivered a big-data AI solution for the Ministry of Foreign
                Affairs, improving national security reporting processes.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="event"
                >
                  🏆
                </span>
                <span className="font-semibold text-sm md:text-base">
                  Major Event Leadership
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Organized the NACOSS National Hackathon and coordinated two
                Google Hash Code Competitions.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="github"
                >
                  💻
                </span>
                <span className="font-semibold text-sm md:text-base">
                  Community Training
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Led a GitHub workshop attended by over 100 participants,
                focusing on platform best practices.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="ds"
                >
                  📊
                </span>
                <span className="font-semibold text-sm md:text-base">
                  AI Bootcamp Organizer
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Organized a two-week Data Science and Artificial Intelligence
                Bootcamp in partnership with DSN Nigeria.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full card-hover border-l-4 border-primary flex flex-col group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-5 pb-5 flex flex-col flex-1 relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  role="img"
                  aria-label="policy"
                >
                  📄
                </span>
                <span className="font-semibold text-sm md:text-base">
                  National Policy Contributor
                </span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                Participated in reviewing the National AI Strategy and NITDA's
                Software Development Guidelines.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
};

export default Experience;
