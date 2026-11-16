import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date, default: null },
  status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
});
export default mongoose.model('Borrow', schema);
