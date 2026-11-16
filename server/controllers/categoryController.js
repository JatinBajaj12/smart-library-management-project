import Category from '../models/Category.js';
import Book from '../models/Book.js';
export const list = async (req, res) => res.json(await Category.find().sort('categoryName'));
export const create = async (req, res) => res.status(201).json(await Category.create(req.body));
export const update = async (req, res) => {
  const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  c ? res.json(c) : res.status(404).json({ message: 'Category not found' });
};
export const remove = async (req, res) => {
  if (await Book.exists({ category: req.params.id })) return res.status(409).json({ message: 'Category is used by existing books' });
  const c = await Category.findByIdAndDelete(req.params.id);
  c ? res.json({ message: 'Category deleted' }) : res.status(404).json({ message: 'Category not found' });
};
