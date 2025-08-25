import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  Palette,
  Cpu
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Cpu size={32} />,
      title: 'AI/ML & Data Science',
      skills: [
        'PyTorch & TensorFlow',
        'Scikit-learn & OpenCV',
        'Pandas & NumPy',
        'Machine Learning',
        'Deep Learning & CV'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Server size={32} />,
      title: 'Backend Development',
      skills: [
        'Python & Java',
        'Node.js & Express',
        'Spring Boot & FastAPI',
        'REST APIs',
        'Microservices'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Database size={32} />,
      title: 'Database & Storage',
      skills: [
        'PostgreSQL',
        'MongoDB',
        'MySQL',
        'Redis',
        'Firebase'
      ],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <Cloud size={32} />,
      title: 'Cloud & DevOps',
      skills: [
        'AWS',
        'Docker',
        'Kubernetes',
        'CI/CD Pipelines',
        'Vercel'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Code2 size={32} />,
      title: 'Frontend Development',
      skills: [
        'React',
        'Next.js',
        'TypeScript',
        'Angular',
        'Tailwind CSS'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <GitBranch size={32} />,
      title: 'Tools & Workflow',
      skills: [
        'Git',
        'Jupyter Notebook',
        'VS Code',
        'Figma',
        'Agile/Scrum'
      ],
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Skills & Technologies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className="glass-card rounded-2xl p-6 glow-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group-hover:translate-x-1"
                    >
                      <span className="text-foreground">{skill}</span>
                      <div className="w-2 h-2 rounded-full bg-primary opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>

                {/* Skill level indicator */}
                <div className="mt-4 pt-4 border-t border-glass-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Proficiency</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'
                            } group-hover:animate-pulse`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Technologies */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-8 text-primary">
              Also Experienced With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'GraphQL',
                'WebSockets',
                'Testing (Jest, Cypress)',
                'UI/UX Design',
                'Performance Optimization',
                'Security Best Practices',
                'Supabase',
                'Vue.js',
                'Jira',
                'Slack'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-card rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;