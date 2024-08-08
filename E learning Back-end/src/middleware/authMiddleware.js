import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/user.model.js';

dotenv.config({ path: path.resolve('C:/Users/fafaf/Desktop/E learning/.env') });

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // req.user = decoded.user;
    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden', role: req.user.role, user: req.user.id });
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    // console.log(req.user , "rfuijhgniujtdfrh");
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;