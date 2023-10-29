import { Router } from 'express';
import { CoursesController } from '../controller/courses.controller.js';
import { verify } from '../middleware/auth.js';

const router = Router();
const coursesController = new CoursesController();

/**
 * @swagger
 * /pgAddCourse:
 *   post:
 *     summary: Create a new course in the database
 *     tags: [Courses]
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
 * /pgUpdateCourse:
 *   post:
 *     summary: Update a course in the database
 *     tags: [Courses]
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
 * /pgDeleteCourse:
 *   post:
 *     summary: Delete a course in the database
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: number
 *                 description: The course_id of the course.
 *                 example: 55
 */
router.post('/pgAddCourse', verify(false, false), coursesController.pgAddCourse.bind(coursesController));
router.post('/pgUpdateCourse', verify(false, false), coursesController.pgUpdateCourse.bind(coursesController));
router.post('/pgDeleteCourse', verify(false, true), coursesController.pgDeleteCourse.bind(coursesController));

export default router;