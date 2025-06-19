import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const communityActivities = [
  {
    icon: "🤝",
    title: "Ethical AI & Digital Transformation Advocate",
    description:
      "Actively promoted discussions and initiatives on ethical AI, governance, and AI’s role in the public sector, while driving digital transformation in various sectors."
  },
//   {
//     icon: "🏆",
//     title: "NACOSS National Hackathon Organizer",
//     description:
//       "Organized the NACOSS National Hackathon, enabling students to collaborate and innovate while solving real-world challenges through technology."
//   },
  {
    icon: "📢",
    title: "Community Facilitator",
    description:
      "Facilitated discussions in AI, data science, and digital transformation, raising awareness and fostering knowledge-sharing within the tech community."
  },
//   {
//     icon: "💻",
//     title: "GitHub Workshop Host",
//     description:
//       "Led a GitHub workshop with 100+ attendees, sharing platform best practices and improving participant skills in version control and collaborative development."
//   },
  {
    icon: "🌱",
    title: "Mentor & Programs Supporter",
    description:
      "Mentored students and aspiring professionals via FUTMINNA DevCircle, supporting GDSC, GDGoC, Ingressive for Good, Women Tech Makers, and GitHub Campus Ambassadors to foster a collaborative and learning-focused tech community."
  },
];

const Community = () => (
  <section id="community" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Community & Mentorship</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Activities and impact through events, mentorship, and thought leadership in the broader tech community
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {communityActivities.map(({ icon, title, description }, idx) => (
          <Card key={title + idx} className="h-full shadow-md border-l-8 border-primary flex flex-col">
            <CardContent className="pt-6 pb-6 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label={title}>
                  {icon}
                </span>
                <span className="font-semibold text-base">{title}</span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Community;