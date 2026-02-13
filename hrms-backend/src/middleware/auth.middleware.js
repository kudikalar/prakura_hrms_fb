import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

/**
 * 🔐 Authentication Middleware
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Unauthorized: Token missing'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Fetch latest user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: User no longer exists'
      });
    }

    // Attach full user object
    req.user = user;

    next();

  } catch (error) {
    console.error('AUTH ERROR:', error.message);

    return res.status(401).json({
      message: 'Unauthorized: Invalid or expired token'
    });
  }
};

/**
 * 🔒 Role Authorization Middleware
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: Access denied'
      });
    }

    next();
  };
};

// Named export
export const authenticate = authMiddleware;

// Default export
export default authMiddleware;