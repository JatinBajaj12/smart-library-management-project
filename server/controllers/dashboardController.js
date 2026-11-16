import Book from '../models/Book.js';
import User from '../models/User.js';
import Borrow from '../models/Borrow.js';
export const stats = async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const [totalBooks, availableBooks, totalStudents, activeBorrows, recentBooks, recent] = await Promise.all([
    Book.countDocuments(),
    Book.countDocuments({ availableCopies: { $gt: 0 } }),
    isAdmin ? User.countDocuments({ role: 'student' }) : null,
    isAdmin ? Borrow.countDocuments({ status: 'borrowed' }) : Borrow.countDocuments({ student: req.user._id, status: 'borrowed' }),
    Book.find().sort('-createdAt').limit(5).populate('category', 'categoryName'),
    Book.find().sort('-updatedAt').limit(5),
  ]);
  const recentActivity = recent.map(b => ({
    message: `${b.createdAt.getTime() === b.updatedAt.getTime() ? 'Added' : 'Updated'}: ${b.title}`, at: b.updatedAt,
  }));
  res.json({ totalBooks, availableBooks, totalStudents, activeBorrows, recentBooks, recentActivity });
};
