import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** Devicon SVGs (CDN) — avoids empty `public/tech-icons` breaking local `<img>` paths. */
const DEVICON_ICONS_BASE =
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Product Engineering",
    description: "Full-stack development with modern frameworks",
    skills: [
      { name: "React", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Node.js", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "GraphQL", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "DevOps", level: "Advanced" },
    ],
  },
  {
    title: "AI Engineering",
    description: "Machine learning and intelligent systems",
    skills: [
      { name: "Machine Learning", level: "Expert" },
      { name: "Deep Learning", level: "Expert" },
      { name: "NLP", level: "Expert" },
      { name: "Computer Vision", level: "Advanced" },
      { name: "Data Science", level: "Advanced" },
      { name: "MLOps", level: "Advanced" },
      { name: "LangChain", level: "Advanced" },
      { name: "OpenAI API", level: "Expert" },
      { name: "Hugging Face", level: "Advanced" },
    ],
  },
  {
    title: "Leadership & Consulting",
    description: "Strategy, architecture, and team leadership",
    skills: [
      { name: "Solution Architecture", level: "Expert" },
      { name: "Technical Communication", level: "Expert" },
      { name: "Project Management", level: "Expert" },
      { name: "Agile & Scrum", level: "Advanced" },
      { name: "Requirements Analysis", level: "Expert" },
      { name: "Team Leadership", level: "Expert" },
      { name: "Cloud Strategy", level: "Advanced" },
    ],
  },
];

interface TechIcon {
  name: string;
  /** Fully qualified SVG URL (Devicon registry on jsDelivr). */
  iconUrl: string;
}

const techStack: TechIcon[] = [
  { name: "React", iconUrl: `${DEVICON_ICONS_BASE}/react/react-original.svg` },
  {
    name: "TypeScript",
    iconUrl: `${DEVICON_ICONS_BASE}/typescript/typescript-original.svg`,
  },
  {
    name: "JavaScript",
    iconUrl: `${DEVICON_ICONS_BASE}/javascript/javascript-original.svg`,
  },
  { name: "HTML5", iconUrl: `${DEVICON_ICONS_BASE}/html5/html5-original.svg` },
  { name: "CSS3", iconUrl: `${DEVICON_ICONS_BASE}/css3/css3-original.svg` },
  {
    name: "Next.js",
    iconUrl: `${DEVICON_ICONS_BASE}/nextjs/nextjs-original.svg`,
  },
  {
    name: "Node.js",
    iconUrl: `${DEVICON_ICONS_BASE}/nodejs/nodejs-original.svg`,
  },
  {
    name: "Express",
    iconUrl: `${DEVICON_ICONS_BASE}/express/express-original.svg`,
  },
  { name: "Vue.js", iconUrl: `${DEVICON_ICONS_BASE}/vuejs/vuejs-original.svg` },
  {
    name: "Angular",
    iconUrl: `${DEVICON_ICONS_BASE}/angular/angular-original.svg`,
  },
  {
    name: "TailwindCSS",
    iconUrl: `${DEVICON_ICONS_BASE}/tailwindcss/tailwindcss-original.svg`,
  },
  { name: "Sass", iconUrl: `${DEVICON_ICONS_BASE}/sass/sass-original.svg` },
];

// Distinct colors for each skill level
const levelStyles: Record<Skill["level"], string> = {
  Expert: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Advanced: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Proficient: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow">What I work with</p>
          <h2 className="text-display-sm mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and frameworks proven across government, enterprise,
            and high-growth environments—selected for impact, not trends
          </p>
        </div>

        {/* Tech Stack Icons */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-2"
              >
                <div className="size-12 rounded-xl bg-card border border-border p-2.5 transition-colors duration-200 group-hover:border-primary/45 group-hover:shadow-md group-hover:shadow-primary/5">
                  <img
                    src={tech.iconUrl}
                    alt=""
                    width={28}
                    height={28}
                    className="size-full object-contain dark:[filter:brightness(1.08)]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-4">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className="border-border hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-6">
                <div className="mb-5">
                  <h3 className="text-heading-md text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className={`text-xs px-2.5 py-1 border font-medium ${levelStyles[skill.level]}`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-blue-500/20 border border-blue-500/40" />
            <span className="text-xs text-muted-foreground">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            <span className="text-xs text-muted-foreground">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <span className="text-xs text-muted-foreground">Proficient</span>
          </div>
        </div>
      </div>
    </section>
  );
}
