import Window from '@/components/Window';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Trainings from '@/components/Trainings';
import Achievements from '@/components/Achievements';

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

export default async function Home() {
  const profile = await getData('profile');
  const skills = await getData('skills');
  const experiences = await getData('experience');
  const projects = await getData('projects');
  const education = await getData('education');
  const trainings = await getData('training');
  const achievements = await getData('achievements');

  return (
    <div>
      <div id="about-me">
        <Window title="About Me">
          <Hero profile={profile} />
        </Window>
      </div>
      <div id="skills">
        <Window title="Skills">
          <Skills skills={skills} />
        </Window>
      </div>
      <div id="experience">
        <Window title="Experience">
          <Experience experiences={experiences} />
        </Window>
      </div>
      <div id="projects">
        <Window title="Projects">
          <Projects projects={projects} />
        </Window>
      </div>
      <div id="education">
        <Window title="Education">
          <Education education={education} />
        </Window>
      </div>
      <div id="trainings">
        <Window title="Trainings">
          <Trainings trainings={trainings} />
.
        </Window>
      </div>
      <div id="achievements">
        <Window title="Achievements">
          <Achievements achievements={achievements} />
        </Window>
      </div>
    </div>
  );
}
