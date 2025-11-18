import { ReactNode } from 'react';

import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Trainings from '@/components/Trainings';
import Achievements from '@/components/Achievements';
import ChatWrapper from '@/components/ChatWrapper';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

async function getData(endpoint: string) {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error(`Failed to fetch ${endpoint} data:`, errorData);
    throw new Error(`Failed to fetch ${endpoint} data: ${errorData.message || res.statusText}`);
  }
  return res.json();
}

type SectionConfig = {
  id: string;
  title: string;
  description: string;
  accent: string;
  content: ReactNode;
  className?: string;
};

type GlassSectionProps = Omit<SectionConfig, 'content'> & {
  children: ReactNode;
};

const GlassSection = ({
  id,
  title,
  description,
  accent,
  className,
  children,
}: GlassSectionProps) => (
  <section id={id} className={cn('group', className)}>
    <Card className="glass-card relative overflow-hidden">
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 opacity-60 blur-3xl transition duration-500 group-hover:opacity-80',
          accent,
        )}
      />
      <CardHeader className="relative z-10 space-y-3">
        <Badge
          variant="outline"
          className="w-fit border-white/20 bg-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white/80"
        >
          {title}
        </Badge>
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-base text-slate-200/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {children}
      </CardContent>
    </Card>
  </section>
);

export default async function Home() {
  const profile = await getData('profile');
  const skills = await getData('skills');
  const experiences = await getData('experience');
  const projects = await getData('projects');
  const education = await getData('education');
  const trainings = await getData('training');
  const achievements = await getData('achievements');

  const sections: SectionConfig[] = [
    {
      id: 'skills',
      title: 'Skills Matrix',
      description: 'A curated mix of languages, frameworks, and tools I reach for daily.',
      accent: 'bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent',
      content: <Skills skills={skills} />,
    },
    {
      id: 'experience',
      title: 'Experience Timeline',
      description: 'Highlights from roles where I crafted human-centered products.',
      accent: 'bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-transparent',
      content: <Experience experiences={experiences} />,
    },
    {
      id: 'projects',
      title: 'Project Playbook',
      description: 'Selected builds that blend thoughtful UX with reliable engineering.',
      accent: 'bg-gradient-to-br from-rose-500/30 via-orange-500/20 to-transparent',
      content: <Projects projects={projects} />,
      className: 'lg:col-span-2',
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Academic path and certifications that shaped my rigor.',
      accent: 'bg-gradient-to-br from-emerald-400/30 via-teal-500/20 to-transparent',
      content: <Education education={education} />,
    },
    {
      id: 'trainings',
      title: 'Training & Workshops',
      description: 'Immersive learning moments keeping my skills future-ready.',
      accent: 'bg-gradient-to-br from-amber-400/30 via-yellow-500/20 to-transparent',
      content: <Trainings trainings={trainings} />,
    },
    {
      id: 'achievements',
      title: 'Milestones & Achievements',
      description: 'Recognitions that celebrate curiosity, grit, and impact.',
      accent: 'bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-transparent',
      content: <Achievements achievements={achievements} />,
      className: 'lg:col-span-2',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-grid pointer-events-none" aria-hidden />
      <div className="liquid-blobs pointer-events-none" aria-hidden />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:py-24">
        <section id="about-me">
          <Card className="glass-card relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/30 via-blue-600/20 to-transparent opacity-80 blur-[140px]"
            />
            <CardHeader className="relative z-10 space-y-4">
              <Badge
                variant="outline"
                className="w-fit border-white/20 bg-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white/80"
              >
                About Me
              </Badge>
              <CardTitle className="text-3xl text-white md:text-4xl">
                Building thoughtful products with equal parts empathy and engineering.
              </CardTitle>
              <CardDescription className="text-lg text-slate-200/80">
                A quick snapshot of who I am, how I work, and the values that shape my craft.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Hero profile={profile} />
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {sections.map(({ content, ...section }) => (
            <GlassSection key={section.id} {...section}>
              {content}
            </GlassSection>
          ))}
        </div>

        <GlassSection
          id="chat"
          title="AI Pairing"
          description="Ask questions, explore the work, or request tailored walkthroughs via the integrated assistant."
          accent="bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-transparent"
          className="lg:col-span-2"
        >
          <ChatWrapper />
        </GlassSection>
      </main>
    </div>
  );
}
