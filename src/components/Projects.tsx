import { useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      longDescription: 'A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Implemented responsive design and optimized for performance.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      github: '#',
      live: '#',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates and team features',
      longDescription: 'A powerful task management application designed for teams. Features real-time collaboration, drag-and-drop task organization, project timelines, team chat, file sharing, and progress tracking. Built with React and Node.js with WebSocket integration for real-time updates.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'Material-UI'],
      github: '#',
      live: '#',
      category: 'Web App'
    },
    {
      id: 3,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Data visualization dashboard with machine learning insights and predictions',
      longDescription: 'An advanced analytics dashboard that leverages AI and machine learning to provide business insights. Features include interactive charts, predictive analytics, custom reports, data export capabilities, and integration with multiple data sources. Built with React, Python, and TensorFlow.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
      github: '#',
      live: '#',
      category: 'AI/ML'
    },
    {
      id: 4,
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for fitness tracking with social features',
      longDescription: 'A comprehensive fitness tracking mobile application built with React Native. Features include workout logging, progress tracking, social challenges, nutrition tracking, and integration with popular fitness devices. Includes both iOS and Android apps with cloud synchronization.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'GraphQL', 'AWS'],
      github: '#',
      live: '#',
      category: 'Mobile'
    },
    {
      id: 5,
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting platform built on blockchain technology',
      longDescription: 'A revolutionary voting system that ensures transparency and security through blockchain technology. Features include voter authentication, encrypted voting, real-time results, audit trails, and mobile accessibility. Built with Solidity, Web3.js, and React.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
      github: '#',
      live: '#',
      category: 'Blockchain'
    },
    {
      id: 6,
      title: 'Real-time Chat Platform',
      description: 'Modern messaging platform with video calls and file sharing capabilities',
      longDescription: 'A feature-rich messaging platform supporting text, voice, and video communication. Includes group chats, file sharing, message encryption, emoji reactions, and integration with popular productivity tools. Built for scalability with microservices architecture.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Node.js', 'Socket.io', 'WebRTC', 'Redis'],
      github: '#',
      live: '#',
      category: 'Real-time'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary-glow text-primary-foreground"
                      onClick={() => window.open(project.live, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live
                    </Button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Learn More Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary-glow hover:bg-primary/10 w-full"
                      >
                        Learn More →
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl glass-card border-glass-border">
                      <div className="p-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                        <h3 className="text-2xl font-bold mb-4 gradient-text">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.longDescription}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-primary">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Github size={16} className="mr-2" />
                            View Code
                          </Button>
                          <Button
                            className="bg-primary hover:bg-primary-glow text-primary-foreground"
                            onClick={() => window.open(project.live, '_blank')}
                          >
                            <ExternalLink size={16} className="mr-2" />
                            Live Demo
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;