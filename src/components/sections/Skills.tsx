
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Database, 
  Globe, 
  Server, 
  Smartphone, 
  Terminal,
  Settings,
  Cloud,
  GitBranch,
  Palette,
  Monitor,
  Cpu
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Monitor className="w-6 h-6" />,
      skills: [
        { name: 'React', level: 95, icon: <Code className="w-4 h-4" /> },
        { name: 'TypeScript', level: 90, icon: <Code className="w-4 h-4" /> },
        { name: 'Next.js', level: 85, icon: <Globe className="w-4 h-4" /> },
        { name: 'Tailwind CSS', level: 90, icon: <Palette className="w-4 h-4" /> },
        { name: 'Vue.js', level: 75, icon: <Code className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', level: 90, icon: <Terminal className="w-4 h-4" /> },
        { name: 'Python', level: 80, icon: <Code className="w-4 h-4" /> },
        { name: 'PostgreSQL', level: 85, icon: <Database className="w-4 h-4" /> },
        { name: 'MongoDB', level: 80, icon: <Database className="w-4 h-4" /> },
        { name: 'GraphQL', level: 75, icon: <Globe className="w-4 h-4" /> },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: <Settings className="w-6 h-6" />,
      skills: [
        { name: 'AWS', level: 80, icon: <Cloud className="w-4 h-4" /> },
        { name: 'Docker', level: 85, icon: <Server className="w-4 h-4" /> },
        { name: 'Git', level: 95, icon: <GitBranch className="w-4 h-4" /> },
        { name: 'CI/CD', level: 80, icon: <Settings className="w-4 h-4" /> },
        { name: 'Kubernetes', level: 70, icon: <Cpu className="w-4 h-4" /> },
      ],
    },
  ];

  const technologies = [
    { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
    { name: 'React', icon: <Code className="w-4 h-4" /> },
    { name: 'Node.js', icon: <Terminal className="w-4 h-4" /> },
    { name: 'TypeScript', icon: <Code className="w-4 h-4" /> },
    { name: 'Python', icon: <Code className="w-4 h-4" /> },
    { name: 'AWS', icon: <Cloud className="w-4 h-4" /> },
    { name: 'Docker', icon: <Server className="w-4 h-4" /> },
    { name: 'PostgreSQL', icon: <Database className="w-4 h-4" /> },
    { name: 'MongoDB', icon: <Database className="w-4 h-4" /> },
    { name: 'GraphQL', icon: <Globe className="w-4 h-4" /> },
    { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
    { name: 'Vue.js', icon: <Code className="w-4 h-4" /> },
    { name: 'Tailwind CSS', icon: <Palette className="w-4 h-4" /> },
    { name: 'Git', icon: <GitBranch className="w-4 h-4" /> },
    { name: 'Kubernetes', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Redis', icon: <Database className="w-4 h-4" /> },
    { name: 'Express.js', icon: <Terminal className="w-4 h-4" /> },
    { name: 'FastAPI', icon: <Code className="w-4 h-4" /> }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skill Categories with Progress Bars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="text-primary">{category.icon}</div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
