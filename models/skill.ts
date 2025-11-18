
import mongoose, { Schema, models } from 'mongoose';

const skillSchema = new Schema({
  category: { type: String, required: true },
  skills: [{ type: String, required: true }],
});

const Skill = models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;
