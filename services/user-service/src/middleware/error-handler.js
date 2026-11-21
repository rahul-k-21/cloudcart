import { logger } from '../config/logger.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(err, req, res, _next) {
  logger.error(
    { err, method: req.method, path: req.originalUrl },
    'Request failed'
  );

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Internal server error' : err.message
  });
}
