import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const protect = async (req, res, next) => {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const { id } = jwt.verify(h.slice(7), process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired token' }); }
};
export const adminOnly = (req, res, next) =>
  req.user.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required' });
