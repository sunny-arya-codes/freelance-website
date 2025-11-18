import Image from 'next/image';

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

const Hero = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex items-center">
      <Image
        src={profile.high_res_image_url}
        alt={profile.name}
        width={250}
        height={250}
        className="rounded-full"
      />
      <div className="ml-8">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-xl mt-2">{profile.title}</p>
        <p className="text-lg mt-2">{profile.location}</p>
        <p className="mt-4 max-w-2xl">{profile.summary}</p>
        <div className="mt-4 flex gap-4">
          <a href={`mailto:${profile.contact.email}`} className="text-blue-600 hover:underline">Email</a>
          <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
