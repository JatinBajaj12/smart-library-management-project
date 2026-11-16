import { z } from 'zod';
export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
}).strict();
export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
export const bookSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  author: z.string().trim().min(1, 'Author is required'),
  isbn: z.string().trim().regex(/^[0-9-]{10,17}$/, 'ISBN must be 10-13 digits (hyphens allowed)'),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category'),
  publisher: z.string().trim().optional().default(''),
  publicationYear: z.coerce.number().int().min(1000).max(2100).optional(),
  totalCopies: z.coerce.number().int('Must be a whole number').min(0, 'Cannot be negative'),
  availableCopies: z.coerce.number().int().min(0, 'Cannot be negative').optional(),
  description: z.string().trim().optional().default(''),
}).transform(d => ({ ...d, availableCopies: d.availableCopies ?? d.totalCopies }))
  .refine(d => d.availableCopies <= d.totalCopies, { path: ['availableCopies'], message: 'Cannot exceed total copies' });
export const categorySchema = z.object({
  categoryName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  description: z.string().trim().optional().default(''),
});
