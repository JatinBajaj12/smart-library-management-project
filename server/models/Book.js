import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  author: { type: String, required: true, trim: true, index: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  publisher: { type: String, default: '' },
  publicationYear: { type: Number, min: 1000, max: 2100 },
  totalCopies: { type: Number, required: true, min: 0 },
  availableCopies: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
}, { timestamps: true });
schema.pre('validate', function () {
  if (this.availableCopies > this.totalCopies) this.invalidate('availableCopies', 'Available copies cannot exceed total copies');
});
export default mongoose.model('Book', schema);
