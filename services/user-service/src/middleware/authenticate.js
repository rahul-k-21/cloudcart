import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token required'
    });
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (
      typeof decoded === 'string' ||
      typeof decoded.sub !== 'string'
    ) {
      throw new Error('Invalid token payload');
    }

    req.auth = { sub: decoded.sub };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token'
    });
  }
}
