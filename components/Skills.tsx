interface Skill {
  _id: string;
  category: string;
  skills: string[];
}

const skillCategoryColors: Record<string, string> = {
  'Programming Languages': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-50',
  'Frameworks & Libraries': 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-50',
  'Databases': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-50',
  'Tools & Platforms': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-50',
  'Cloud & DevOps': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-50',
  'Design': 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-50',
  'Testing': 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-50',
};

const getCategoryColor = (category: string): string => {
  return skillCategoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-50';
};

const Skills = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="space-y-6">
      {skills.map((skill) => (
        <div key={skill._id} className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${getCategoryColor(skill.category).split(' ')[0]}`} />
              {skill.category}
            </h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {skill.skills.map((skillName, index) => (
                <span 
                  key={index} 
                  className={`${getCategoryColor(skill.category)} px-3 py-1 rounded-full text-sm font-medium border transition-colors`}
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
