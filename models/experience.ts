
import mongoose, { Schema, models } from 'mongoose';

const experienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  company_website: { type: String },
  location: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String },
  responsibilities: [{ type: String, required: true }],
  tech_stack: [{ type: String, required: true }],
  order: { type: Number, required: true },
  image: { type: String },
  imageType: { type: String },
}, { timestamps: true });

const Experience = models.Experience || mongoose.model('Experience', experienceSchema);

export default Experience;
