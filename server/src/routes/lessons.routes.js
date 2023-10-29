import { Router } from 'express';
import { LessonsController } from '../controller/lessons.controller.js';
import { verify } from '../middleware/auth.js';

const router = Router();
const lessonsController = new LessonsController();

/**
 * @swagger
 * /pgSetDoneLesson:
 *   post:
 *     summary: Create a new course in the database
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 description: The subject of the course.
 *                 example: Math
 *               difficulty:
 *                  type: number
 *                  description: The difficulty of the course.
 *                  example: 2
 * /pgModifyLesson:
 *   post:
 *     summary: Update a course in the database
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: string
 *                 description: The task_id of the course.
 *                 example: 'dsfdsaf3432-342342adsf'
 */

router.post('/pgSetDoneLesson', verify(false, true), lessonsController.pgSetDoneLesson.bind(lessonsController));
router.post('/pgModifyLesson', verify(true, true), lessonsController.pgModifyLesson.bind(lessonsController));

export default router;