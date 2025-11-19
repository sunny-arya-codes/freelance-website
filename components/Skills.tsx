import { Card } from '@/components/ui/card';

const Skills = ({ skills }: { skills: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((skill) => (
        <div key={skill._id} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-4 bg-border"></span>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {skill.category}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {skill.skills.map((skillName: string, index: number) => (
              <div
                key={index}
                className="px-3 py-1.5 rounded-lg bg-muted border border-border hover:border-primary hover:bg-muted/80 text-sm text-foreground transition-all duration-300 cursor-default"
              >
                {skillName}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;