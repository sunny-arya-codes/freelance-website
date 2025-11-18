import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Phone, ExternalLink } from 'lucide-react';


interface Profile {
  name: string;
  title: string;
  location: string;
  summary: string;
  high_res_image_url: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: (profile: Profile) => `mailto:${profile.contact.email}`,
    variant: 'default' as const,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: (profile: Profile) => profile.contact.linkedin,
    variant: 'outline' as const,
  },
  {
    name: 'GitHub',
    icon: Github,
    href: (profile: Profile) => profile.contact.github,
    variant: 'outline' as const,
  },
  {
    name: 'Portfolio',
    icon: ExternalLink,
    href: (profile: Profile) => profile.contact.portfolio,
    variant: 'outline' as const,
  },
];

const Hero = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg bg-card shadow-sm">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image
          src={profile.high_res_image_url}
          alt={profile.name}
          fill
          className="rounded-full object-cover border-4 border-primary/20"
          sizes="(max-width: 768px) 12rem, 16rem"
          priority
        />
      </div>
      
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-xl text-muted-foreground mt-1">{profile.title}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {profile.location}
            </span>
            {profile.contact.phone && (
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {profile.contact.phone}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {profile.summary}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
          {socialLinks.map(({ name, icon: Icon, href, variant }) => (
            <Button
              key={name}
              variant={variant}
              size="sm"
              className="gap-2"
              asChild
            >
              <a 
                href={href(profile)} 
                target={name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
