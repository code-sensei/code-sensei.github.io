import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Lock, Calendar } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  demo?: boolean;
  private?: boolean;
}

const projects: Project[] = [
  {
    title: "AI-Powered Intelligence Platform",
    description:
      "Developed a big-data and AI-enabled intelligence system for the Federal Ministry of Foreign Affairs, enabling advanced policy analysis and real-time security insights.",
    image: "/projects/mfa-project.svg",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Big Data",
      "AI",
    ],
    featured: true,
    demo: false,
    private: true,
  },
  {
    title: "National Youth Investment Fund Portal",
    description:
      "Developed a prototype for the NYIF portal, enhancing user experience and accessibility for Nigerian youth seeking investment opportunities.",
    image: "/projects/fmyd-nyif.svg",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
    liveUrl: "https://nyif-portal.vercel.app/",
    featured: true,
    demo: true,
  },
  {
    title: "NCC Licencing Management System",
    description:
      "Frontend developer on a team modernizing license management for the Nigerian Communications Commission (NCC).",
    image: "/projects/lamsy.svg",
    technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "Semantic UI"],
    liveUrl: "https://licensing.ncc.gov.ng/",
    featured: true,
  },
  {
    title: "NCC Type Approval System",
    description:
      "Contributed to the Type Approval Management System for the NCC, enhancing regulatory compliance and device approval processes.",
    image: "/projects/tamsy.svg",
    technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "Semantic UI"],
    liveUrl: "https://tamsy.ncc.gov.ng/",
    featured: true,
  },
  {
    title: "PowerPulse – AI Energy Management",
    description:
      "A personal project leveraging AI to manage & optimize energy consumption in homes with prepaid meters in Nigeria.",
    image: "/projects/power-pulse.svg",
    technologies: ["React.js", "Next.js", "TypeScript", "AI", "LangChain"],
    liveUrl: "https://power-pulse-vercel.vercel.app/",
    featured: false,
    demo: true,
  },
  {
    title: "Market Intelligence AI Agent",
    description:
      "Developed an AI agent for market intelligence, enabling real-time data analysis and insights generation.",
    image: "/projects/mercatus.svg",
    technologies: [
      "LangChain",
      "HuggingFace",
      "OpenRouter",
      "AI",
      "TypeScript",
    ],
    featured: false,
    demo: false,
    private: true,
  },
  {
    title: "Clafiya Dashboard & Components",
    description:
      "Engineered frontend architecture and a reusable component system for Clafiya, supporting $610K Series A funding.",
    image: "/projects/clafiya-user.svg",
    technologies: ["React.js", "Next.js", "TypeScript", "UI/UX", "SSR"],
    liveUrl: "https://user-dashboard-liart.vercel.app/auth/login",
    featured: false,
    demo: true,
  },
  {
    title: "Web3 DApp & NFT Marketplace",
    description:
      "Frontend developer for decentralized applications integrating Web3 functionality with Vue 3 and blockchain APIs.",
    image: "/projects/web3-marketplace.svg",
    technologies: ["Vue 3", "Nuxt.js", "Web3.js", "Ethereum", "Polygon"],
    featured: false,
    demo: false,
    githubUrl: "https://github.com/code-sensei",
  },
];

const openLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const bookMeeting = () => {
  window.open(
    "https://app.reclaim.ai/m/babangida-tsowa",
    "_blank",
    "noopener,noreferrer",
  );
};

/**
 * Maps data URLs to real asset paths (`public/` + optional CDN), respecting Vite `base`.
 *
 * @param {string} src - Absolute URL or root-relative path such as `/projects/x.png`.
 * @returns {string} Loadable `src` for `<img>`.
 */
function resolveProjectImage(src: string): string {
  if (src.startsWith("https://") || src.startsWith("http://")) {
    return src;
  }
  return publicAsset(src.replace(/^\//, ""));
}

/**
 * Project tile with resilient preview: a missing project image falls back to `placeholder.svg`.
 *
 * @param {{ project: Project }} props - Card payload.
 * @returns {JSX.Element} Project card.
 */
function ProjectCard({ project }: { project: Project }) {
  const hasAction = project.githubUrl || project.liveUrl || project.private;
  const placeholderSrc = publicAsset("placeholder.svg");
  const [imgSrc, setImgSrc] = useState(() =>
    resolveProjectImage(project.image),
  );

  useEffect(() => {
    setImgSrc(resolveProjectImage(project.image));
  }, [project.image]);

  /**
   * Swaps to local placeholder once when the screenshot 404s or blocks loading.
   *
   * @returns {void}
   */
  const handleImageError = useCallback(() => {
    setImgSrc((current) =>
      current === placeholderSrc ? current : placeholderSrc,
    );
  }, [placeholderSrc]);

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/35 transition-colors duration-200 rounded-xl shadow-sm hover:shadow-md hover:shadow-primary/5">
      {/* Image - fixed height */}
      <div className="relative h-36 overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={project.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />

        {/* Private badge */}
        {project.private && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-background/90 text-xs"
          >
            <Lock className="size-3 mr-1" />
            Private
          </Badge>
        )}
      </div>

      {/* Content - fixed structure */}
      <CardContent className="p-4">
        {/* Title - fixed 2 lines */}
        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2 h-12 text-sm">
          {project.title}
        </h3>

        {/* Description - fixed 2 lines */}
        <p className="text-xs text-muted-foreground line-clamp-2 h-8 mb-3">
          {project.description}
        </p>

        {/* Tech stack - fixed height */}
        <div className="flex flex-wrap gap-1 mb-3 h-12 content-start overflow-hidden">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-muted/50 border-border text-muted-foreground px-1.5 py-0"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-border text-muted-foreground px-1.5 py-0"
            >
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions - always present */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button
              onClick={() => openLink(project.githubUrl!)}
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-8"
            >
              <Github className="size-3.5 mr-1" />
              Code
            </Button>
          )}

          {project.liveUrl && (
            <Button
              onClick={() => openLink(project.liveUrl!)}
              size="sm"
              className="flex-1 text-xs h-8"
            >
              <ExternalLink className="size-3.5 mr-1" />
              {project.demo ? "Demo" : "Live"}
            </Button>
          )}

          {project.private && !project.liveUrl && (
            <Button
              onClick={bookMeeting}
              size="sm"
              className="flex-1 text-xs h-8"
            >
              <Calendar className="size-3.5 mr-1" />
              Request Demo
            </Button>
          )}

          {/* Fallback button if no action */}
          {!hasAction && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-8"
              disabled
            >
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow">My work</p>
          <h2 className="text-display-sm mb-4">Selected Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions deployed across government, enterprise, and
            high-growth environments—where results speak louder than features
          </p>
        </div>

        {/* Featured Projects - 4 column grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Other Projects - same 4 column grid */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-heading-md text-center mb-6 text-muted-foreground">
              More Projects
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
