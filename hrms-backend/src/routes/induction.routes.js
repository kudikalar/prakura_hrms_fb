import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

import {
  assignInduction,
  getEmployeeInduction,
  updateInductionStatus
} from '../controllers/induction.controller.js';

const router = Router();

// HR/Admin assigns induction
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'HR'),
  assignInduction
);

// Get induction by employee
router.get(
  '/employee/:employeeId',
  authenticate,
  getEmployeeInduction
);

// Update induction status
router.put(
  '/:id',
  authenticate,
  updateInductionStatus
);

export default router;
