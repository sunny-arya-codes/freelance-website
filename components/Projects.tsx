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
          className="group flex flex-col border border-border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:bg-card/80 hover:border-border hover:shadow-lg dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {proj.name}
              </CardTitle>
              <Badge variant="outline" className="bg-muted border-border text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {proj.type}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pt-2">
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.tech_stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-md bg-muted border border-border text-xs text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-4 pt-4 pb-6 border-t border-border mt-auto">
            {proj.repo_url && (
              <a
                href={proj.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4 mr-2" /> Code
              </a>
            )}
            {proj.notebook_url && (
              <a
                href={proj.notebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Notebook
              </a>
            )}
            {/* View Project Arrow usually looks premium */}
            <div className="ml-auto">
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Projects;