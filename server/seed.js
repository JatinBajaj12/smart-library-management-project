import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User.js';
import Category from './models/Category.js';
import Book from './models/Book.js';
export async function seed() {
  if (await User.countDocuments()) return;
  await User.create([
    { name: 'Admin', email: 'admin@library.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
    { name: 'Student One', email: 'student@library.com', password: await bcrypt.hash('student123', 10), role: 'student' },
  ]);
  const [cs, sci, lit] = await Category.create([
    { categoryName: 'Computer Science', description: 'Programming and computing' },
    { categoryName: 'Science', description: 'Natural sciences' },
    { categoryName: 'Literature', description: 'Fiction and classics' },
  ]);
  const b = (title, author, isbn, category, total, avail, year) =>
    ({ title, author, isbn, category: category._id, publisher: 'Sample Press', publicationYear: year, totalCopies: total, availableCopies: avail, description: `${title} by ${author}.` });
  await Book.create([
    b('Clean Code', 'Robert C. Martin', '9780132350884', cs, 5, 3, 2008),
    b('Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', cs, 4, 4, 2009),
    b('A Brief History of Time', 'Stephen Hawking', '9780553380163', sci, 3, 0, 1998),
    b('Cosmos', 'Carl Sagan', '9780345539434', sci, 2, 1, 2013),
    b('1984', 'George Orwell', '9780451524935', lit, 6, 5, 1961),
    b('Pride and Prejudice', 'Jane Austen', '9780141439518', lit, 3, 2, 2002),
  ]);
  console.log('Database seeded');
}
if (process.argv[1].endsWith('seed.js')) {
  await mongoose.connect(process.env.MONGO_URI);
  await seed();
  await mongoose.disconnect();
}
