
import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  repo_url: { type: String },
  notebook_url: { type: String },
  description: { type: String, required: true },
  tech_stack: [{ type: String, required: true }],
  order: { type: Number, required: true },
});

const Project = models.Project || mongoose.model('Project', projectSchema);

export default Project;
