import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getDepartments } from '../controllers/department.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department APIs
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get('/', authenticate, getDepartments);

export default router;
