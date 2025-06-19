
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '7+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Happy Clients', value: '18' },
    { label: 'Lines of Code', value: '500K+' },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about my journey, experience, and what drives me as a developer
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 items-start">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">My Story</h3>
              {/* Updated About Section */}
              <div className="mb-6 text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Babangida Tsowa is a dynamic IT professional, digital transformation strategist, and AI governance expert committed to ethical innovation and societal impact. With extensive experience in frontend engineering (React.js, Angular, Next.js), Web3 integrations, and cloud computing, he has led transformative projects across startups, enterprises, and government agencies.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    For the <span className="font-semibold">Federal Ministry of Foreign Affairs</span>, he developed a big‑data AI‑powered intelligence platform that enhanced data processing efficiency by 35%, informing policy adaptation and strengthening national security insights.
                  </li>
                  <li>
                    At <span className="font-semibold">Clafiya</span>, his frontend architecture and reusable component libraries secured $610,000 in funding and doubled Admin Dashboard usability.
                  </li>
                  <li>
                    As CTO of <span className="font-semibold">Sweet Ride Nigeria LTD</span>, he optimized workflows and software infrastructure, accelerating delivery speed by 25% and boosting user engagement by 15%.
                  </li>
                </ul>
                <p>
                  Beyond his technical achievements, Babangida is a passionate mentor and community builder, having organized:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold">NACOSS National Hackathon</span> as an organizer, fostering student innovation.
                  </li>
                  <li>
                    Two <span className="font-semibold">Google Hash Code Competitions</span> while serving as Director of Software, SICT, FUTMINNA.
                  </li>
                  <li>
                    A <span className="font-semibold">GitHub workshop</span> for 100+ attendees on best practices and platform capabilities.
                  </li>
                  <li>
                    A <span className="font-semibold">Data Science and Artificial Intelligence Bootcamp</span> in partnership with DSN Nigeria as the Director of Software, National Association of Computer Science Students (NACOSS), North Central region.
                  </li>
                </ul>
                <p>
                  He has facilitated discussions on AI, Data Science, and Digital Transformation, and reviewed draft public policies including the <span className="font-semibold">National AI Strategy</span> and <span className="font-semibold">NITDA’s Guidelines to Software Development</span>.
                </p>
                <p>
                  Guided by a commitment to youth empowerment and governance transparency, he bridges cutting‑edge technology with real‑world impact, making him an invaluable asset to any forward‑thinking organization.
                </p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          {/* <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=400&fit=crop"
                alt="Developer workspace"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div> */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
