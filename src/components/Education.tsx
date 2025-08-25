import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      period: '2017 - 2019',
      gpa: '3.8/4.0',
      description: 'Specialized in Software Engineering and Machine Learning. Completed thesis on distributed systems optimization.',
      courses: ['Advanced Algorithms', 'Machine Learning', 'Distributed Systems', 'Software Engineering'],
      achievements: ['Dean\'s List', 'Graduate Research Assistant', 'CS Department Award']
    },
    {
      degree: 'Bachelor of Technology in Computer Engineering',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: '2013 - 2017',
      gpa: '3.7/4.0',
      description: 'Comprehensive foundation in computer science fundamentals with focus on software development and system design.',
      courses: ['Data Structures', 'Computer Networks', 'Database Systems', 'Operating Systems'],
      achievements: ['Summa Cum Laude', 'Programming Contest Winner', 'IEEE Student Member']
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: <Award size={20} />
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
      icon: <Award size={20} />
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2021',
      icon: <Award size={20} />
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Education & Certifications
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Education */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                <GraduationCap size={28} />
                Education
              </h3>
              
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-300 slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-primary mb-2">
                      {edu.degree}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground mb-2">
                      <span className="font-medium">{edu.school}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {edu.description}
                  </p>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-primary mb-2">Key Courses:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-primary mb-2">Achievements:</h5>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                <Award size={28} />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="glass-card rounded-xl p-6 hover:shadow-glow transition-all duration-300 slide-up"
                    style={{ animationDelay: `${(index + 2) * 0.2}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/20 text-primary rounded-lg">
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>Earned: {cert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;