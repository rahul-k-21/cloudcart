import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'user-service',
    status: 'healthy'
  });
});

router.get('/ready', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'user-service',
    status: 'ready'
  });
});

export default router;
