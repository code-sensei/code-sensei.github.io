import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BookOpen, Heart, Sparkles, Globe } from "lucide-react";

const communityActivities = [
  {
    icon: "🤝",
    iconComponent: <Globe className="w-6 h-6" />,
    title: "Ethical AI & Digital Transformation Advocate",
    description:
      "Actively promoted discussions and initiatives on ethical AI, governance, and AI's role in the public sector, while driving digital transformation in various sectors.",
    color: "text-blue-500",
  },
  {
    icon: "📢",
    iconComponent: <Sparkles className="w-6 h-6" />,
    title: "Community Facilitator",
    description:
      "Facilitated discussions in AI, data science, and digital transformation, raising awareness and fostering knowledge-sharing within the tech community.",
    color: "text-purple-500",
  },
  {
    icon: "🌱",
    iconComponent: <Heart className="w-6 h-6" />,
    title: "Mentor & Programs Supporter",
    description:
      "Mentored students and aspiring professionals via FUTMINNA DevCircle, supporting GDSC, GDGoC, Ingressive for Good, Women Tech Makers, and GitHub Campus Ambassadors to foster a collaborative and learning-focused tech community.",
    color: "text-green-500",
  },
  {
    icon: "🏆",
    iconComponent: <Award className="w-6 h-6" />,
    title: "NACOSS National Hackathon Organizer",
    description:
      "Organized the NACOSS National Hackathon, enabling students to collaborate and innovate while solving real-world challenges through technology.",
    color: "text-orange-500",
  },
  {
    icon: "💻",
    iconComponent: <Users className="w-6 h-6" />,
    title: "GitHub Workshop Host",
    description:
      "Led a GitHub workshop with 100+ attendees, sharing platform best practices and improving participant skills in version control and collaborative development.",
    color: "text-pink-500",
  },
  {
    icon: "📚",
    iconComponent: <BookOpen className="w-6 h-6" />,
    title: "Google Hash Code Coordinator",
    description:
      "Organized two Google Hash Code Competitions while serving as Director of Software, SICT, FUTMINNA, fostering competitive programming culture.",
    color: "text-cyan-500",
  },
];

const Community = () => (
  <section id="community" className="py-16 md:py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16 animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Community & Mentorship
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Activities and impact through events, mentorship, and thought
          leadership in the broader tech community
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {communityActivities.map(
          ({ icon, iconComponent, title, description, color }, idx) => (
            <Card
              key={title + idx}
              className="h-full card-hover border-2 hover:border-primary/50 flex flex-col group overflow-hidden"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="pt-6 pb-6 flex flex-col flex-1 relative z-10">
                <div className="mb-4 flex items-start gap-3">
                  {/* Emoji Icon */}
                  <span
                    className="text-3xl md:text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    role="img"
                    aria-label={title}
                  >
                    {icon}
                  </span>

                  {/* Lucide Icon */}
                  <div
                    className={`${color} flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0`}
                  >
                    {iconComponent}
                  </div>
                </div>

                <h3 className="font-semibold text-base md:text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>

                <p className="text-muted-foreground text-xs md:text-sm flex-1 leading-relaxed">
                  {description}
                </p>

                {/* Decorative Bottom Border */}
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 rounded-full group-hover:w-full transition-all duration-500" />
              </CardContent>
            </Card>
          ),
        )}
      </div>

      {/* Additional Stats or Call to Action */}
      <div className="mt-12 md:mt-16 text-center animate-fadeIn">
        <div className="glass-effect inline-block px-8 py-6 rounded-2xl">
          <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
            1000+
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Students & Professionals Mentored
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Community;
