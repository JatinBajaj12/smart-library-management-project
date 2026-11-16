import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const bookSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  author: z.string().trim().min(1, 'Author is required'),
  isbn: z.string().trim().regex(/^[0-9-]{10,17}$/, 'ISBN must be 10-13 digits'),
  category: z.string().min(1, 'Select a category'),
  publisher: z.string().optional(),
  publicationYear: z.coerce.number().int().min(1000, 'Invalid year').max(2100, 'Invalid year').optional().or(z.literal('')),
  totalCopies: z.coerce.number({ invalid_type_error: 'Enter a number' }).int('Whole number').min(0, 'Cannot be negative'),
  availableCopies: z.coerce.number({ invalid_type_error: 'Enter a number' }).int('Whole number').min(0, 'Cannot be negative'),
  description: z.string().optional(),
}).refine(d => d.availableCopies <= d.totalCopies, { path: ['availableCopies'], message: 'Cannot exceed total copies' });
export const check = (schema, values) => {
  const r = schema.safeParse(values);
  if (r.success) return { data: r.data };
  const errors = {};
  r.error.issues.forEach(i => { errors[i.path[0]] ??= i.message; });
  return { errors };
};
