import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ExternalLink } from 'lucide-react';

interface Achievement {
  _id: string;
  title: string;
  description: string;
  badge_url: string;
  certificate_url: string;
  event: string;
}

const Achievements = ({ achievements }: { achievements: Achievement[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((ach) => (
        <Card key={ach._id} className="border border-border bg-card/50 hover:bg-card/80 transition-colors duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500">
                <Trophy className="w-5 h-5" />
              </div>
              {(ach.certificate_url || ach.badge_url) && (
                <a
                  href={ach.certificate_url || ach.badge_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <h3 className="text-lg font-bold text-foreground mb-1">{ach.title}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{ach.event}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{ach.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Achievements;