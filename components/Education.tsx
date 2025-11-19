import { GraduationCap } from 'lucide-react';

interface Education {
  _id: string;
  institution: string;
  program: string;
  cgpa: string;
  start_date: string;
  end_date: string;
  location: string;
}

const Education = ({ education }: { education: Education[] }) => {
  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <div key={edu._id} className="relative pl-8 border-l border-border hover:border-primary/50 transition-colors duration-300 pb-2">
          {/* Timeline Node */}
          <div className="absolute -left-[9px] top-0 p-1 bg-background rounded-full border border-border">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-lg font-bold text-foreground">{edu.institution}</h3>
              <p className="text-base text-primary/80">{edu.program}</p>
              <p className="text-sm text-muted-foreground mt-1">{edu.location}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="font-mono text-xs text-muted-foreground bg-muted inline-block px-2 py-1 rounded mb-1">
                {edu.start_date} — {edu.end_date}
              </div>
              <div className="text-sm font-medium text-foreground/80">
                CGPA: {edu.cgpa}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;