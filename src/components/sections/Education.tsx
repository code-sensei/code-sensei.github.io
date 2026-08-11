import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Award,
  ExternalLink,
  Calendar,
  BookOpen,
} from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  highlights: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  level: string;
  link: string;
}

const education: EducationItem[] = [
  {
    institution: "Federal University of Technology, Minna",
    degree: "B.Tech., Computer Science (Second Class, Upper Division)",
    duration: "2014 – 2021",
    grade: "3.65/5.00",
    highlights: [
      "Director of Software, SICT: Organized Google Hash Code Competitions and hackathons",
      "Co-founded FUTMINNA DevCircle, nurturing developer communities (GDG, GDSC, I4G, WTM)",
      "Developed a faculty payment portal adopted across departments",
      "Organized a two-week Data Science and AI Bootcamp with DSN Nigeria",
    ],
  },
];

const certifications: Certification[] = [
  {
    name: "AI Engineering Professional Certification",
    issuer: "IBM Skills Network",
    date: "Expected: November 2025",
    level: "In Progress",
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">Academic background</p>
          <h2 className="text-display-sm mb-4">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic foundation and professional credentials that underpin
            strategic technical execution at scale
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education */}
          <div>
            <h3 className="text-heading-lg text-center mb-8">Education</h3>

            {education.map((edu) => (
              <Card key={edu.institution} className="border-border">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="size-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {edu.degree}
                        </h4>
                        <p className="text-primary text-sm">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="gap-1.5 text-xs border-border text-muted-foreground"
                      >
                        <Calendar className="size-3" />
                        {edu.duration}
                      </Badge>
                      <Badge className="bg-primary/10 text-primary border-0 text-xs">
                        GPA: {edu.grade}
                      </Badge>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h5 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Award className="size-4 text-primary" />
                      Highlights
                    </h5>
                    <ul className="space-y-1.5">
                      {edu.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-primary mt-1 shrink-0">•</span>
                          <span className="text-muted-foreground">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-heading-lg text-center mb-8">Certifications</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <Card
                  key={cert.name}
                  className="border-border hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="shrink-0 size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="size-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm leading-tight mb-1">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-muted text-muted-foreground text-xs"
                      >
                        {cert.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {cert.date}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="size-3.5" />
                        View Program
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Continuous Learning */}
          <div>
            <Card className="border-border bg-muted/50">
              <CardContent className="p-6 text-center">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="size-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Continuous Learning</h4>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                  Committed to staying at the forefront of technology through
                  continuous learning, online courses, and hands-on projects in
                  AI, cloud computing, and modern web development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
