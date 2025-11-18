import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, BookOpen, ArrowUpRight } from 'lucide-react';

interface Project {
  _id: string;
  name: string;
  type: string;
  repo_url: string;
  notebook_url: string;
  description: string;
  tech_stack: string[];
}

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((proj) => (
        <Card 
          key={proj._id} 
          className="group flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {proj.name}
              </CardTitle>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-xs font-mono text-white/60 uppercase tracking-widest">
                {proj.type}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 pt-2">
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.tech_stack.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-4 pt-4 pb-6 border-t border-white/5 mt-auto">
            {proj.repo_url && (
              <a 
                href={proj.repo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-white/50 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-2" /> Code
              </a>
            )}
            {proj.notebook_url && (
              <a 
                href={proj.notebook_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-white/50 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Notebook
              </a>
            )}
            {/* View Project Arrow usually looks premium */}
            <div className="ml-auto">
               <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Projects;