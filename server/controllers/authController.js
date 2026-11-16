import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const sign = u => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
const pub = u => ({ _id: u._id, name: u.name, email: u.email, role: u.role });
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), role: 'student' });
  res.status(201).json({ token: sign(user), user: pub(user) });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: sign(user), user: pub(user) });
};
export const me = (req, res) => res.json({ user: pub(req.user) });
