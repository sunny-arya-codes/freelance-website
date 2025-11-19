import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface Experience {
  _id: string;
  title: string;
  company: string;
  company_website: string;
  location: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  tech_stack: string[];
}

const Experience = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <div className="relative space-y-12">
      {/* Vertical Line */}
      <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-border md:left-1/2 md:-ml-[0.5px]" />

      {experiences.map((exp, index) => (
        <div key={exp._id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

          {/* Timeline Dot */}
          <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-ml-[5px]" />

          {/* Date (Desktop) */}
          <div className="hidden md:block md:w-1/2 md:text-right px-4">
            {index % 2 === 0 ? (
              <div className="text-sm text-muted-foreground font-mono">{exp.start_date} — {exp.end_date}</div>
            ) : null}
          </div>

          {/* Content Card */}
          <div className="ml-6 md:ml-0 md:w-1/2 px-4">
            {/* Date (Mobile) */}
            <div className="md:hidden text-xs text-muted-foreground font-mono mb-2">{exp.start_date} — {exp.end_date}</div>

            <div className="group relative p-6 rounded-2xl bg-card/50 hover:bg-card/80 border border-border transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <a
                    href={exp.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1"
                  >
                    {exp.company}
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {exp.responsibilities[0]} {/* Displaying first responsibility as summary */}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech_stack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-muted text-foreground/80 hover:bg-muted/80 hover:text-foreground border-border text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date for alternating side (Desktop) */}
            <div className="hidden md:block absolute top-0 -right-[100%] w-full">
              {index % 2 !== 0 ? (
                <div className="text-sm text-muted-foreground font-mono text-left -ml-[200%]">{exp.start_date} — {exp.end_date}</div>
              ) : null}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;