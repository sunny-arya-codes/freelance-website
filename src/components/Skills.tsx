interface Skill {
  _id: string;
  category: string;
  skills: string[];
}

const Skills = ({ skills }: { skills: Skill[] }) => {
  return (
    <div>
      {skills.map((skill) => (
        <div key={skill._id} className="mt-4">
          <h3 className="text-xl font-semibold">{skill.category}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skill.skills.map((s, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
