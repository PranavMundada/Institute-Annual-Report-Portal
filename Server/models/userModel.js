import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['faculty', 'admin', 'user'],
    required: true,
    default: 'user',
  },
  department: {
    type: String,
    required: function () {
      return this.role === 'faculty';
    },
  },
  institute: {
    type: String,
    required: function () {
      return !this.role === 'user';
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  hashedPassword,
  originalPassword
) {
  const same = await bcrypt.compare(originalPassword, this.password);
  return same;
};

export const User = mongoose.model('User', userSchema);
