import { Router } from 'express';
import { SVCoursesController } from '../controller/svcourses.controller.js';
import { verify } from '../middleware/auth.js';

const router = Router();
const svcoursesController = new SVCoursesController();

/**
 * @swagger
 * /pgAddSVCourse:
 *   post:
 *     summary: Create a new course in the database
 *     tags: [SVCourses]
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
 * /pgUpdateSVCourse:
 *   post:
 *     summary: Update a course in the database
 *     tags: [SVCourses]
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
 * /pgJoinSVCourse:
 *   post:
 *     summary: Update a course in the database
 *     tags: [SVCourses]
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
 * /pgDeleteSVCourse:
 *   post:
 *     summary: Delete a course in the database
 *     tags: [SVCourses]
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

router.post('/pgAddSVCourse', verify(true, false), svcoursesController.pgAddSVCourse.bind(svcoursesController));
router.post('/pgUpdateSVCourse', verify(true, false), svcoursesController.pgUpdateSVCourse.bind(svcoursesController));
router.post('/pgJoinSVCourse', verify(false, false), svcoursesController.pgJoinSVCourse.bind(svcoursesController));
router.post('/pgDeleteSVCourse', verify(true, true), svcoursesController.pgDeleteSVCourse.bind(svcoursesController));

export default router;