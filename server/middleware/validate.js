import mongoose from 'mongoose';
export const validate = schema => (req, res, next) => {
  const r = schema.safeParse(req.body);
  if (!r.success) {
    const errors = r.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
    return res.status(400).json({ message: errors[0].message, errors });
  }
  req.body = r.data;
  next();
};
export const validateId = (req, res, next, id) =>
  mongoose.isValidObjectId(id) ? next() : res.status(400).json({ message: 'Invalid ID' });
