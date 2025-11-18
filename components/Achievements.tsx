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
    <div>
      {achievements.map((ach) => (
        <div key={ach._id} className="mt-4">
          <h3 className="text-xl font-semibold">{ach.title}</h3>
          <p className="text-md">{ach.event}</p>
          <p className="mt-2">{ach.description}</p>
          <div className="mt-2 flex gap-4">
            {ach.badge_url && <a href={ach.badge_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Badge</a>}
            {ach.certificate_url && <a href={ach.certificate_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Certificate</a>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
