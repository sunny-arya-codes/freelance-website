import { Navbar } from '@/components/Navbar';
import { LiquidChat } from '@/components/LiquidChat';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import Trainings from '@/components/Trainings';
import { getProfile, getSkills, getProjects, getExperience, getEducation, getAchievements, getTrainings } from '@/lib/data';

export default async function HomePage() {
  const profileData = await getProfile();
  const skills = await getSkills();
  const projects = await getProjects();
  const experiences = await getExperience();
  const education = await getEducation();
  const achievements = await getAchievements();
  const trainings = await getTrainings();

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-40 space-y-32">

        <section id="about-me">
          <Hero profile={profileData} />
        </section>

        <section id="experience" className="max-w-4xl mx-auto scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-12 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            Work Experience
          </h2>
          <Experience experiences={experiences} />
        </section>

        <section id="skills" className="max-w-4xl mx-auto scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-12 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            Technical Arsenal
          </h2>
          <Skills skills={skills} />
        </section>

        <section id="projects" className="max-w-5xl mx-auto scroll-mt-24">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">Selected Works</h2>
            <a href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">View all archive &rarr;</a>
          </div>
          <Projects projects={projects.slice(0, 4)} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <section id="education" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8">Education</h2>
            <Education education={education} />
          </section>

          <section id="achievements" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8">Achievements</h2>
            <Achievements achievements={achievements} />
          </section>
        </div>

        <section id="training" className="max-w-5xl mx-auto scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-8">Certifications & Training</h2>
          <Trainings trainings={trainings} />
        </section>

      </div>

      <LiquidChat />
    </div>
  );
}