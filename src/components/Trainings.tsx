interface Training {
  _id: string;
  name: string;
  provider: string;
  start_date: string;
  end_date: string;
  certificate_url: string;
}

const Trainings = ({ trainings }: { trainings: Training[] }) => {
  return (
    <div>
      {trainings.map((train) => (
        <div key={train._id} className="mt-4">
          <h3 className="text-xl font-semibold">{train.name}</h3>
          <p className="text-md">{train.provider} | {train.start_date} - {train.end_date}</p>
          {train.certificate_url && <a href={train.certificate_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Certificate</a>}
        </div>
      ))}
    </div>
  );
};

export default Trainings;
