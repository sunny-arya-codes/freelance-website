interface Project {
  _id: string;
  name: string;
  type: string;
  repo_url: string;
  notebook_url: string;
  description: string;
  tech_stack: string[];
}

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <div>
      {projects.map((proj) => (
        <div key={proj._id} className="mt-4">
          <h3 className="text-xl font-semibold">{proj.name}</h3>
          <p className="text-md">{proj.type}</p>
          <p className="mt-2">{proj.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {proj.tech_stack.map((tech, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tech}</span>
            ))}
          </div>
          <div className="mt-2 flex gap-4">
            {proj.repo_url && <a href={proj.repo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Repo</a>}
            {proj.notebook_url && <a href={proj.notebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Notebook</a>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
