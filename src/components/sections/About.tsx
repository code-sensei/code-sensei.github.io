import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Code,
  Users,
  Zap,
  Building2,
  Rocket,
  Award,
} from "lucide-react";

const highlights = [
  {
    org: "Federal Ministry of Foreign Affairs",
    description:
      "Architected a big-data AI-powered intelligence platform that enhanced data processing efficiency by 35%—directly informing policy decisions.",
    icon: Building2,
  },
  {
    org: "Clafiya",
    description:
      "Frontend architecture and reusable component libraries that helped secure $610,000 in funding—scaling to 1,000+ users.",
    icon: Rocket,
  },
  {
    org: "Sweet Ride Nigeria (CTO)",
    description:
      "Rebuilt workflows and software infrastructure—25% faster delivery, 15% higher user engagement.",
    icon: Zap,
  },
] as const;

const initiatives = [
  {
    title: "NACOSS National Hackathon",
    description: "Organized as a key leader, fostering student innovation",
  },
  {
    title: "Google Hash Code Competitions",
    description:
      "Directed two competitions as Director of Software, SICT, FUTMINNA",
  },
  {
    title: "GitHub Workshop",
    description: "Led workshop for 100+ attendees on best practices",
  },
  {
    title: "AI & Data Science Bootcamp",
    description: "Partnered with DSN Nigeria as NACOSS Director",
  },
] as const;

const stats = [
  {
    value: "7+",
    label: "Years Experience",
    icon: TrendingUp,
  },
  {
    value: "20+",
    label: "Projects Completed",
    icon: Code,
  },
  {
    value: "18+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "500K+",
    label: "Lines of Code",
    icon: Award,
  },
] as const;

export default function About() {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2 text-sm uppercase tracking-wide">
            Get to know me
          </p>
          <h2 className="text-display-sm mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming complex challenges into elegant solutions across
            enterprise, government, and high-growth startups
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Intro */}
          <div className="space-y-4">
            <h3 className="text-heading-lg text-foreground">
              Engineered Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Trusted by government institutions, venture-backed startups, and
              enterprise organizations to architect systems where precision
              matters. Specializing in AI-driven platforms, full-stack product
              engineering, and strategic technology consulting—delivering
              solutions that don't just work, but scale.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.org}
                  className="flex gap-4 items-start p-5 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.org}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Beyond client work, I invest in the next generation—organizing and
              leading initiatives that shape how developers think about
              technology:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {initiatives.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-semibold text-foreground mb-1 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Work */}
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Invited to shape national policy—reviewing and contributing to the{" "}
              <span className="font-medium text-foreground">
                National AI Strategy
              </span>{" "}
              and{" "}
              <span className="font-medium text-foreground">
                NITDA's Guidelines to Software Development
              </span>
              —while facilitating strategic discussions on AI, Data Science, and
              Digital Transformation.
            </p>

            {/* Quote */}
            <blockquote className="p-5 rounded-lg bg-muted border-l-2 border-primary">
              <p className="text-foreground italic">
                "Where cutting-edge technology meets measurable impact—bridging
                innovation with execution for organizations ready to lead, not
                follow."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="text-center border-border hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex justify-center">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-display-sm text-foreground font-semibold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
