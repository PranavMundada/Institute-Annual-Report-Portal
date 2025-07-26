import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
});

export default mongoose.model('Type', typeSchema);
