import { Card, CardContent } from '@/components/ui/card';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Training {
  _id: string;
  name: string;
  provider: string;
  start_date: string;
  end_date: string;
  certificate_url: string;
}

const Trainings = ({ trainings }: { trainings: Training[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {trainings.map((train) => (
        <div
          key={train._id}
          className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border border-border bg-card/50 hover:bg-card/80 hover:border-border transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 transition-colors">
              <Award className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-foreground group-hover:text-emerald-400 dark:group-hover:text-emerald-200 transition-colors">
                {train.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {train.provider} • <span className="font-mono text-xs opacity-70">{train.start_date}</span>
              </p>
            </div>
          </div>

          {train.certificate_url && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 sm:mt-0 text-muted-foreground hover:text-foreground hover:bg-muted"
              asChild
            >
              <a href={train.certificate_url} target="_blank" rel="noopener noreferrer">
                Certificate <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Trainings;