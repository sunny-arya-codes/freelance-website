
import mongoose, { Schema, models } from 'mongoose';

const additionalSchema = new Schema({
  languages: [{ type: String, required: true }],
  hobbies: [{ type: String, required: true }],
});

const Additional = models.Additional || mongoose.model('Additional', additionalSchema);

export default Additional;
