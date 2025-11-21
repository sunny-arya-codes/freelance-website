import { Navbar } from '@/components/Navbar';
import { LiquidChat } from '@/components/LiquidChat';
import Hero from '@/components/Hero';
import WhoIHelp from '@/components/WhoIHelp';
import FadeIn from '@/components/FadeIn';
import { getProfile, getSkills, getProjects, getExperience, getEducation, getAchievements, getTrainings } from '@/lib/data';
import ProblemsSolved from '@/components/ProblemsSolved';
import AISolutions from '@/components/AISolutions';
import CaseStudies from '@/components/CaseStudies';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import WhyMe from '@/components/WhyMe';

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
      {/* Global Background Effect */}
      <div className="aurora-grid fixed inset-0 z-0 pointer-events-none" />

      <Navbar />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-40 space-y-32">

        <section id="about-me">
          <Hero profile={profileData} />
        </section>

        <FadeIn delay={0.2}>
          <WhoIHelp />
        </FadeIn>

        <FadeIn delay={0.2}>
          <ProblemsSolved />
        </FadeIn>

        <section id="ai-solutions">
          <FadeIn delay={0.3}>
            <AISolutions />
          </FadeIn>
        </section>

        <section id="case-studies">
          <FadeIn delay={0.3}>
            <CaseStudies />
          </FadeIn>
        </section>

        <FadeIn delay={0.3}>
          <Testimonials />
        </FadeIn>

        <section id="pricing">
          <FadeIn delay={0.3}>
            <Pricing />
          </FadeIn>
        </section>

        <section id="why-me">
          <FadeIn delay={0.3}>
            <WhyMe />
          </FadeIn>
        </section>

      </div>

      <LiquidChat />
    </div>
  );
}