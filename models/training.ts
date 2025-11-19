
import mongoose, { Schema, models } from 'mongoose';

const trainingSchema = new Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  certificate_url: { type: String },
  order: { type: Number, required: true },
  image: { type: String },
  imageType: { type: String },
}, { timestamps: true });

const Training = models.Training || mongoose.model('Training', trainingSchema);

export default Training;
