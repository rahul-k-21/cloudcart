import { env } from './config/env.js';
import { logger } from './config/logger.js';
import app from './app.js';

const server = app.listen(env.PORT, '0.0.0.0', () => {
  logger.info(
    {
      service: 'user-service',
      port: env.PORT,
      environment: env.NODE_ENV
    },
    'User Service started'
  );
});

function shutdown(signal) {
  logger.info({ signal }, 'Shutting down User Service');

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Graceful shutdown failed');
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
