
import mongoose, { Schema, models } from 'mongoose';

const achievementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  badge_url: { type: String },
  certificate_url: { type: String },
  event: { type: String },
  order: { type: Number, required: true },
});

const Achievement = models.Achievement || mongoose.model('Achievement', achievementSchema);

export default Achievement;
