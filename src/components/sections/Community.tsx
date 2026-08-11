import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Award,
  BookOpen,
  Heart,
  Sparkles,
  Globe,
  Code,
} from "lucide-react";

interface CommunityActivity {
  icon: React.ElementType;
  title: string;
  description: string;
}

const communityActivities: CommunityActivity[] = [
  {
    icon: Sparkles,
    title: "AI Tinkerers Abuja Organizer",
    description:
      "Founded and organize AI Tinkerers Abuja—a chapter of the global community of dedicated AI builders, fostering hands-on collaboration and innovation in AI solutions across Africa.",
  },
  {
    icon: Globe,
    title: "Ethical AI & Digital Transformation Advocate",
    description:
      "Actively promoted discussions and initiatives on ethical AI, governance, and AI's role in the public sector, while driving digital transformation in various sectors.",
  },
  {
    icon: Heart,
    title: "Mentor & Programs Supporter",
    description:
      "Mentored students and aspiring professionals via FUTMINNA DevCircle, supporting GDSC, GDGoC, Ingressive for Good, Women Tech Makers, and GitHub Campus Ambassadors.",
  },
  {
    icon: Award,
    title: "NACOSS National Hackathon Organizer",
    description:
      "Organized the NACOSS National Hackathon, enabling students to collaborate and innovate while solving real-world challenges through technology.",
  },
  {
    icon: Users,
    title: "GitHub Workshop Host",
    description:
      "Led a GitHub workshop with 100+ attendees, sharing platform best practices and improving participant skills in version control and collaborative development.",
  },
  {
    icon: BookOpen,
    title: "Google Hash Code Coordinator",
    description:
      "Organized two Google Hash Code Competitions while serving as Director of Software, SICT, FUTMINNA, fostering competitive programming culture.",
  },
  {
    icon: Code,
    title: "Community Facilitator",
    description:
      "Facilitated discussions in AI, data science, and digital transformation, raising awareness and fostering knowledge-sharing within the tech community.",
  },
];

export default function Community() {
  return (
    <section id="community" className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">Giving back</p>
          <h2 className="text-display-sm mb-4">Community & Mentorship</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Shaping the next generation of engineers through strategic
            mentorship, national-scale initiatives, and policy contributions
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {communityActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card
                key={activity.title}
                className="group border-border hover:border-primary/35 transition-colors duration-200 rounded-xl shadow-sm hover:shadow-md hover:shadow-primary/5"
              >
                <CardContent className="p-5">
                  {/* Icon */}
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 flex justify-center">
          <Card className="border-border bg-muted/50 inline-block">
            <CardContent className="p-8 text-center">
              <div className="text-display-md text-foreground font-semibold mb-2">
                1000+
              </div>
              <p className="text-muted-foreground">
                Students & Professionals Mentored
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
