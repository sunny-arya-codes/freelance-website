interface Experience {
  _id: string;
  title: string;
  company: string;
  company_website: string;
  location: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  tech_stack: string[];
}

const Experience = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <div>
      {experiences.map((exp) => (
        <div key={exp._id} className="mt-4">
          <h3 className="text-xl font-semibold">{exp.title} at <a href={exp.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{exp.company}</a></h3>
          <p className="text-md">{exp.location} | {exp.start_date} - {exp.end_date}</p>
          <ul className="list-disc list-inside mt-2">
            {exp.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-2">
            {exp.tech_stack.map((tech, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
