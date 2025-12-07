import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, TrendingUp, Users, Code } from "lucide-react";

const About = () => {
  const stats = [
    {
      label: "Years Experience",
      value: "7+",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      label: "Projects Completed",
      value: "20+",
      icon: <Code className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      label: "Happy Clients",
      value: "18+",
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      label: "Lines of Code",
      value: "500K+",
      icon: <Award className="w-6 h-6" />,
      color: "text-orange-500",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about my journey, experience, and what drives me as a
            developer
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-start">
          {/* Content */}
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 gradient-text">
                My Story
              </h3>

              {/* Updated About Section */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p className="text-base md:text-lg">
                  Babangida Tsowa is a dynamic IT professional, digital
                  transformation strategist, and AI governance expert committed
                  to ethical innovation and societal impact. With extensive
                  experience in frontend engineering (React.js, Angular,
                  Next.js), Web3 integrations, and cloud computing, he has led
                  transformative projects across startups, enterprises, and
                  government agencies.
                </p>

                <div className="space-y-4 pl-4 border-l-4 border-primary/50">
                  <div className="space-y-2">
                    <p className="text-base md:text-lg">
                      <span className="font-semibold text-foreground">
                        For the Federal Ministry of Foreign Affairs
                      </span>
                      , he developed a big‑data AI‑powered intelligence platform
                      that enhanced data processing efficiency by 35%, informing
                      policy adaptation and strengthening national security
                      insights.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-base md:text-lg">
                      <span className="font-semibold text-foreground">
                        At Clafiya
                      </span>
                      , his frontend architecture and reusable component
                      libraries secured $610,000 in funding and doubled Admin
                      Dashboard usability.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-base md:text-lg">
                      <span className="font-semibold text-foreground">
                        As CTO of Sweet Ride Nigeria LTD
                      </span>
                      , he optimized workflows and software infrastructure,
                      accelerating delivery speed by 25% and boosting user
                      engagement by 15%.
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg">
                  Beyond his technical achievements, Babangida is a passionate
                  mentor and community builder, having organized:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="glass-effect p-4 rounded-lg transition-smooth hover:scale-[1.02]">
                    <p className="font-semibold text-primary mb-2">
                      🏆 NACOSS National Hackathon
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Organized as a key leader, fostering student innovation
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded-lg transition-smooth hover:scale-[1.02]">
                    <p className="font-semibold text-primary mb-2">
                      💻 Google Hash Code Competitions
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Directed two competitions as Director of Software, SICT,
                      FUTMINNA
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded-lg transition-smooth hover:scale-[1.02]">
                    <p className="font-semibold text-primary mb-2">
                      📚 GitHub Workshop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Led workshop for 100+ attendees on best practices
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded-lg transition-smooth hover:scale-[1.02]">
                    <p className="font-semibold text-primary mb-2">
                      🤖 AI & Data Science Bootcamp
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Partnered with DSN Nigeria as NACOSS Director
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg">
                  He has facilitated discussions on AI, Data Science, and
                  Digital Transformation, and reviewed draft public policies
                  including the{" "}
                  <span className="font-semibold text-foreground">
                    National AI Strategy
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">
                    NITDA's Guidelines to Software Development
                  </span>
                  .
                </p>

                <div className="glass-effect p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-base md:text-lg italic text-foreground">
                    "Guided by a commitment to youth empowerment and governance
                    transparency, he bridges cutting‑edge technology with
                    real‑world impact, making him an invaluable asset to any
                    forward‑thinking organization."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="card-hover text-center group overflow-hidden relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-4 md:p-6 relative z-10">
                <div
                  className={`${stat.color} mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
