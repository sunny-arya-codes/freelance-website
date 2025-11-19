
import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  repo_url: { type: String },
  notebook_url: { type: String },
  description: { type: String, required: true },
  tech_stack: [{ type: String, required: true }],
  order: { type: Number, required: true },
  image: { type: String }, // Base64 encoded image
  imageType: { type: String }, // MIME type
}, { timestamps: true });

const Project = models.Project || mongoose.model('Project', projectSchema);

export default Project;
