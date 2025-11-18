
import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
});

const User = models.User || mongoose.model('User', userSchema);

export default User;
