import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
  department: String,
  year: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'dept-approved', 'admin-approved', 'rejected'],
    default: 'pending',
  },
  institute: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', entrySchema);
