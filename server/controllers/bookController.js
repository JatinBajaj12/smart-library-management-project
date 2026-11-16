import Book from '../models/Book.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';
import { broadcast } from '../sockets/index.js';
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const list = async (req, res) => {
  const { q, category } = req.query;
  const f = {};
  if (q) f.$or = [{ title: new RegExp(esc(q), 'i') }, { author: new RegExp(esc(q), 'i') }];
  if (category && mongoose.isValidObjectId(category)) f.category = category;
  res.json(await Book.find(f).populate('category', 'categoryName').sort('-createdAt'));
};
export const get = async (req, res) => {
  const b = await Book.findById(req.params.id).populate('category', 'categoryName');
  b ? res.json(b) : res.status(404).json({ message: 'Book not found' });
};
const catOk = async (req, res) => {
  if (await Category.exists({ _id: req.body.category })) return true;
  res.status(400).json({ message: 'Category does not exist' });
};
export const create = async (req, res) => {
  if (!(await catOk(req, res))) return;
  const b = await (await Book.create(req.body)).populate('category', 'categoryName');
  broadcast('bookAdded', b, `New book added: ${b.title}`);
  res.status(201).json(b);
};
export const update = async (req, res) => {
  if (!(await catOk(req, res))) return;
  const b = await Book.findById(req.params.id);
  if (!b) return res.status(404).json({ message: 'Book not found' });
  b.set(req.body);
  await b.save();
  await b.populate('category', 'categoryName');
  broadcast('bookUpdated', b, `Book updated: ${b.title}`);
  res.json(b);
};
export const remove = async (req, res) => {
  const b = await Book.findByIdAndDelete(req.params.id);
  if (!b) return res.status(404).json({ message: 'Book not found' });
  broadcast('bookDeleted', { _id: b._id }, `Book removed: ${b.title}`);
  res.json({ message: 'Book deleted' });
};
