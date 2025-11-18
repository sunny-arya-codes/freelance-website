import MenuBar from '@/components/MenuBar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Trainings from '@/components/Trainings';
import Achievements from '@/components/Achievements';
import Chat from '@/components/Chat';
import Dock from '@/components/Dock';
import FadeIn from '@/components/FadeIn';
// import { Window } from '@/components/Window'; // Only if you need draggable/resizable windows
// Example Data (Replace with your actual data fetching)
const profileData = {
  name: 'Sunni Kumar',
  title: 'Full Stack Developer',
  location: 'Bangalore, India',
  summary: 'Passionate full-stack developer with a focus on building robust and scalable web applications. Experienced in React, Next.js, Node.js, and various database technologies.',
  high_res_image_url: '/path/to/your/profile-pic.jpg', // Update this
  contact: {
    email: 'sunni@example.com',
    phone: '+91 98765 43210',
    linkedin: 'https://linkedin.com/in/sunni',
    github: 'https://github.com/sunni',
    portfolio: 'https://sunni-kumar.vercel.app',
  },
};

const skillsData = [
  { _id: '1', category: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
  { _id: '2', category: 'Frameworks & Libraries', skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Shadcn/ui'] },
  { _id: '3', category: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { _id: '4', category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes'] },
];

const experienceData = [
  {
    _id: 'exp1',
    title: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    company_website: 'https://techsolutions.com',
    location: 'Bangalore, India',
    start_date: 'Jan 2022',
    end_date: 'Present',
    responsibilities: [
      'Led the development of scalable microservices using Node.js and TypeScript.',
      'Designed and implemented robust APIs for front-end consumption.',
      'Mentored junior developers and conducted code reviews.',
    ],
    tech_stack: ['Node.js', 'TypeScript', 'React', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    _id: 'exp2',
    title: 'Software Developer',
    company: 'Innovate Corp.',
    company_website: 'https://innovatecorp.com',
    location: 'Hyderabad, India',
    start_date: 'Jun 2019',
    end_date: 'Dec 2021',
    responsibilities: [
      'Developed and maintained features for a large-scale e-commerce platform.',
      'Collaborated with product teams to translate requirements into technical specifications.',
    ],
    tech_stack: ['Python', 'Django', 'React', 'PostgreSQL', 'Azure'],
  },
];

const projectsData = [
  {
    _id: 'proj1',
    name: 'Portfolio Website',
    type: 'Personal',
    repo_url: 'https://github.com/sunni/portfolio',
    notebook_url: '', // if applicable
    description: 'A personal portfolio site built with Next.js and Tailwind CSS, showcasing projects and skills.',
    tech_stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    _id: 'proj2',
    name: 'E-commerce API',
    type: 'Backend',
    repo_url: 'https://github.com/sunni/ecommerce-api',
    notebook_url: '',
    description: 'RESTful API for an e-commerce platform with user authentication, product management, and order processing.',
    tech_stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
];

const educationData = [
    { _id: 'edu1', institution: 'University of XYZ', program: 'Master of Science in Computer Science', cgpa: '9.0', start_date: 'Aug 2017', end_date: 'May 2019', location: 'City, Country' },
    { _id: 'edu2', institution: 'Another University', program: 'Bachelor of Technology in Information Technology', cgpa: '8.5', start_date: 'Aug 2013', end_date: 'May 2017', location: 'Another City, Country' },
];

const trainingsData = [
    { _id: 'trn1', name: 'AWS Certified Developer - Associate', provider: 'Amazon Web Services', start_date: 'Jan 2023', end_date: 'Feb 2023', certificate_url: 'https://www.credly.com/badges/aws-dev' },
    { _id: 'trn2', name: 'Advanced React Patterns', provider: 'Frontend Masters', start_date: 'Mar 2022', end_date: 'Apr 2022', certificate_url: 'https://frontendmasters.com/certificates/react-patterns' },
];

const achievementsData = [
    { _id: 'ach1', title: 'Top Performer Award', description: 'Recognized for outstanding contributions to project Alpha.', badge_url: '', certificate_url: '', event: 'Tech Solutions Inc. 2023' },
    { _id: 'ach2', title: 'Hackathon Winner', description: 'Led a team to victory at the annual innovation hackathon.', badge_url: '', certificate_url: 'https://example.com/hackathon-cert', event: 'Innovate Corp. 2021' },
];


export default function HomePage() {
  return (
    <div className="relative text-white min-h-screen overflow-x-hidden">
      <MenuBar /> 

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        
        <FadeIn>
          <section id="about-me">
            <Hero profile={profileData} />
          </section>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="skills" title="Skills">
            <Skills skills={skillsData} />
          </SectionWrapper>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="experience" title="Experience">
            <Experience experiences={experienceData} />
          </SectionWrapper>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="projects" title="Projects">
            <Projects projects={projectsData} />
          </SectionWrapper>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="education" title="Education">
            <Education education={educationData} />
          </SectionWrapper>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="trainings" title="Trainings">
            <Trainings trainings={trainingsData} />
          </SectionWrapper>
        </FadeIn>

        <FadeIn>
          <SectionWrapper id="achievements" title="Achievements">
            <Achievements achievements={achievementsData} />
          </SectionWrapper>
        </FadeIn>

        <div className="pb-24" /> {/* Spacing for Dock */}
      </div>

      <Chat /> 
      <Dock /> 
    </div>
  );
}

// Enhanced Section Wrapper
function SectionWrapper({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative z-10">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      {children}
    </section>
  );
}