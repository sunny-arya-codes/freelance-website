interface Education {
  _id: string;
  institution: string;
  program: string;
  cgpa: string;
  start_date: string;
  end_date: string;
  location: string;
}

const Education = ({ education }: { education: Education[] }) => {
  return (
    <div>
      {education.map((edu) => (
        <div key={edu._id} className="mt-4">
          <h3 className="text-xl font-semibold">{edu.institution}</h3>
          <p className="text-md">{edu.program}</p>
          <p>{edu.location} | {edu.start_date} - {edu.end_date}</p>
          <p>CGPA: {edu.cgpa}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;
