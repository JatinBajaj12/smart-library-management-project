export const notFound = (req, res) => res.status(404).json({ message: 'Route not found' });
export const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) return res.status(409).json({ message: `${Object.keys(err.keyValue)[0]} already exists` });
  if (err.name === 'ValidationError') return res.status(400).json({ message: Object.values(err.errors)[0].message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
