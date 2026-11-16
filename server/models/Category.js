import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
});
export default mongoose.model('Category', schema);
