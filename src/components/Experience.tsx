import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Full Stack Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: [
        'Led development of scalable web applications using React, Node.js, and PostgreSQL',
        'Improved application performance by 40% through code optimization and caching strategies',
        'Mentored junior developers and conducted code reviews to maintain high code quality',
        'Collaborated with cross-functional teams to deliver features on time and within budget'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      location: 'Remote',
      period: '2020 - 2022',
      description: [
        'Developed and maintained multiple client-facing web applications',
        'Implemented responsive designs and ensured cross-browser compatibility',
        'Built RESTful APIs and integrated third-party services',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Firebase', 'Stripe API']
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Co.',
      location: 'New York, NY',
      period: '2019 - 2020',
      description: [
        'Created interactive user interfaces using modern JavaScript frameworks',
        'Collaborated with UX/UI designers to implement pixel-perfect designs',
        'Optimized applications for maximum speed and scalability',
        'Wrote unit tests and maintained code documentation'
      ],
      technologies: ['React', 'TypeScript', 'Sass', 'Jest', 'Git']
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-300 slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-primary mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={18} />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;