import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';
import { broadcast } from '../sockets/index.js';

export const myBorrows = async (req, res) => {
  const borrows = await Borrow.find({ student: req.user._id })
    .populate('book', 'title author availableCopies totalCopies').sort('-borrowedAt');
  res.json(borrows);
};

export const adminBorrows = async (req, res) => {
  const borrows = await Borrow.find()
    .populate('book', 'title author')
    .populate('student', 'name email').sort('-borrowedAt');
  res.json(borrows);
};

export const borrow = async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.availableCopies < 1) return res.status(400).json({ message: 'No copies available' });
  const already = await Borrow.findOne({ student: req.user._id, book: book._id, status: 'borrowed' });
  if (already) return res.status(400).json({ message: 'You already have this book borrowed' });
  book.availableCopies -= 1;
  await book.save();
  await book.populate('category', 'categoryName');
  const borrow = await (await Borrow.create({ student: req.user._id, book: book._id }))
    .populate('book', 'title author availableCopies totalCopies');
  broadcast('bookUpdated', book, `Book borrowed: ${book.title}`);
  res.status(201).json(borrow);
};

export const returnBook = async (req, res) => {
  const record = await Borrow.findOne({ _id: req.params.id, student: req.user._id, status: 'borrowed' });
  if (!record) return res.status(404).json({ message: 'Borrow record not found' });
  const book = await Book.findById(record.book);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.availableCopies = Math.min(book.availableCopies + 1, book.totalCopies);
  await book.save();
  await book.populate('category', 'categoryName');
  record.status = 'returned';
  record.returnedAt = new Date();
  await record.save();
  await record.populate('book', 'title author availableCopies totalCopies');
  broadcast('bookUpdated', book, `Book returned: ${book.title}`);
  res.json(record);
};
