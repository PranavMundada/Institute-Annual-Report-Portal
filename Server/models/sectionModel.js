import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Section', sectionSchema);
