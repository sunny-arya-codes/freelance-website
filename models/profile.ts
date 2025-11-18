
import mongoose, { Schema, models } from 'mongoose';

const profileSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    portfolio: { type: String, required: true },
  },
  summary: { type: String, required: true },
  high_res_image_url: { type: String, required: true },
});

const Profile = models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
