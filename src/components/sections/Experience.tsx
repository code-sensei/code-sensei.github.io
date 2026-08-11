import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  Rocket,
  Brain,
  Trophy,
  Code,
  BarChart3,
  FileText,
  Building2,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: React.ElementType;
  accent: string;
}

const experiences: Experience[] = [
  {
    company: "Ministry of Foreign Affairs",
    role: "Software & AI Consultant",
    duration: "Oct 2023 – Present",
    description:
      "Architecting AI-driven intelligence systems and full-stack platforms that modernize critical government operations.",
    highlights: [
      "35% faster insights with real-time intelligence platforms",
      "AI integration standards adopted ministry-wide",
    ],
    tags: ["AI", "Fullstack", "Consulting"],
    icon: Building2,
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    company: "SweetRide Nigeria",
    role: "Chief Technology Officer",
    duration: "Oct 2022 – Aug 2024",
    description:
      "Rebuilt technical infrastructure and led product strategy for a high-growth mobility startup.",
    highlights: [
      "25% faster delivery, 15% higher engagement",
      "Automated critical workflows unlocking scale",
    ],
    tags: ["Leadership", "Strategy"],
    icon: Zap,
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    company: "Federal Ministry of Foreign Affairs",
    role: "Development Team Lead",
    duration: "Jan 2023 – Oct 2023",
    description:
      "Led high-stakes delivery of AI-powered big-data platforms for national intelligence.",
    highlights: [
      "Big-data AI systems handling millions of records",
      "Agile methodologies cutting delivery cycles in half",
    ],
    tags: ["AI", "Big Data", "Team Lead"],
    icon: Brain,
    accent: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    company: "Clafiya",
    role: "Lead Frontend Engineer",
    duration: "Jan 2021 – Oct 2022",
    description:
      "Led frontend architecture for a venture-backed health-tech platform scaling from MVP to Series A.",
    highlights: [
      "Architected systems supporting $610K Series A",
      "Scaled to 1,000+ users with sub-second loads",
    ],
    tags: ["React", "Architecture"],
    icon: TrendingUp,
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    company: "Quantum Tech LLC",
    role: "Frontend Developer (Web3)",
    duration: "Mar 2022 – Aug 2022",
    description:
      "Architected DApp interfaces for NFT marketplace on Ethereum and Polygon.",
    highlights: ["Production-ready DApp interfaces in Vue 3/Nuxt.js"],
    tags: ["Web3", "Vue"],
    icon: Code,
    accent: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    company: "Asusu Technology",
    role: "Full Stack Developer",
    duration: "Feb 2020 – Mar 2021",
    description:
      "Built foundational full-stack systems for a digital finance platform.",
    highlights: ["CI/CD pipelines reducing deployment from hours to minutes"],
    tags: ["Fintech", "DevOps"],
    icon: Briefcase,
    accent: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
];

interface Achievement {
  icon: React.ElementType;
  title: string;
  metric: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    icon: Rocket,
    title: "Series A",
    metric: "$610K",
    description: "Funding secured at Clafiya",
  },
  {
    icon: Brain,
    title: "AI Delivery",
    metric: "35%",
    description: "Faster government insights",
  },
  {
    icon: Trophy,
    title: "Events Led",
    metric: "5+",
    description: "Major hackathons organized",
  },
  {
    icon: Users,
    title: "Mentored",
    metric: "1000+",
    description: "Students & professionals",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow">My journey</p>
          <h2 className="text-display-sm mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions across government, enterprise, and
            high-growth startups
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {/* Featured Experience - Large Card */}
          <Card className="md:col-span-2 lg:col-span-2 border-border hover:border-primary/30 transition-colors group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${experiences[0].accent}`}
                >
                  <Building2 className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {experiences[0].role}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-xs border-border text-muted-foreground"
                    >
                      <Calendar className="size-3 mr-1" />
                      {experiences[0].duration}
                    </Badge>
                  </div>
                  <p className="text-primary text-sm">
                    {experiences[0].company}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                {experiences[0].description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {experiences[0].highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-2 text-sm bg-muted/50 rounded-lg p-3"
                  >
                    <span className="text-primary mt-0.5 shrink-0">
                      <TrendingUp className="size-4" />
                    </span>
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {experiences[0].tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Stats Card */}
          <Card className="border-border bg-muted/30">
            <CardContent className="p-6 h-full flex flex-col">
              <h4 className="font-semibold text-sm text-muted-foreground mb-4">
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.title} className="text-center">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div className="text-xl font-semibold text-foreground">
                        {achievement.metric}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Medium Cards - Other experiences */}
          {experiences.slice(1, 4).map((exp) => {
            const Icon = exp.icon;
            return (
              <Card
                key={exp.company + exp.role}
                className="border-border hover:border-primary/30 transition-colors group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${exp.accent}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {exp.role}
                      </h3>
                      <p className="text-primary text-xs">{exp.company}</p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="text-xs border-border text-muted-foreground mb-3"
                  >
                    <Calendar className="size-3 mr-1" />
                    {exp.duration}
                  </Badge>

                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-0 px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Earlier Roles - Compact Row */}
          <Card className="md:col-span-2 lg:col-span-3 border-border">
            <CardContent className="p-5">
              <h4 className="font-semibold text-sm text-muted-foreground mb-4">
                Earlier Roles
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {experiences.slice(4).map((exp) => {
                  const Icon = exp.icon;
                  return (
                    <div
                      key={exp.company + exp.role}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${exp.accent}`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-medium text-sm text-foreground">
                            {exp.role}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {exp.company} • {exp.duration}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policy & Community Work */}
        <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  Policy & National Impact
                </h4>
                <p className="text-sm text-muted-foreground">
                  Beyond engineering, shaping technology strategy at scale
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <h5 className="font-medium text-sm text-foreground mb-1">
                  National AI Strategy
                </h5>
                <p className="text-xs text-muted-foreground">
                  Reviewed and contributed to Nigeria's AI policy framework
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <h5 className="font-medium text-sm text-foreground mb-1">
                  NITDA Guidelines
                </h5>
                <p className="text-xs text-muted-foreground">
                  Contributed to software development standards
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <h5 className="font-medium text-sm text-foreground mb-1">
                  AI Tinkerers Abuja
                </h5>
                <p className="text-xs text-muted-foreground">
                  Founded and organize local AI builder community
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
