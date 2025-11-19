
import mongoose, { Schema, models } from 'mongoose';

const educationSchema = new Schema({
  institution: { type: String, required: true },
  program: { type: String, required: true },
  cgpa: { type: String },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  portal_url: { type: String },
  relevant_coursework: [{ type: String }],
  percentage: { type: String },
  year_of_completion: { type: String },
  location: { type: String },
  order: { type: Number, required: true },
  image: { type: String },
  imageType: { type: String },
}, { timestamps: true });

const Education = models.Education || mongoose.model('Education', educationSchema);

export default Education;
