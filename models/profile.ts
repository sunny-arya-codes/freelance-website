
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
  image: { type: String }, // Base64 encoded image
  imageType: { type: String }, // MIME type (e.g., 'image/jpeg', 'image/png')
}, { timestamps: true });

const Profile = models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
