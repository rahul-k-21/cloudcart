import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import { requestLogger } from './middleware/request-logger.js';
import {
  notFoundHandler,
  errorHandler
} from './middleware/error-handler.js';

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(requestLogger);

app.use(healthRoutes);
app.use('/api/users', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
