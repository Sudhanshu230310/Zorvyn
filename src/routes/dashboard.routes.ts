import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { protect, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { dashboardFilterSchema } from '../schemas';

const router = Router();

router.use(protect);

// Viewers, Analysts, and Admins can access the dashboard.
router.get(
  '/summary',
  requireRole('VIEWER', 'ANALYST', 'ADMIN'),
  validate(dashboardFilterSchema),
  getDashboardSummary
);

export default router;
