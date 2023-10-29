import { Router } from 'express';
import { ExercisesController } from '../controller/exercises.controller.js';
import { verify } from '../middleware/auth.js';

const router = Router();
const exercisesController = new ExercisesController();

/**
 * @swagger
 * /pgAddExercise:
 *   post:
 *     summary: Create a new course in the database
 *     tags: [Exercises]
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
 * /pgAnswerQuestion:
 *   post:
 *     summary: Update a course in the database
 *     tags: [Exercises]
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
 * /pgModifyOpenExercise:
 *   post:
 *     summary: Delete a course in the database
 *     tags: [Exercises]
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
 * /pgModifyMultipleChoiceExercise:
 *   post:
 *     summary: Delete a course in the database
 *     tags: [Exercises]
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
router.post('/pgAddExercise', verify(false, true), exercisesController.pgAddExercise.bind(exercisesController));
router.post('/pgAnswerQuestion', verify(false, true), exercisesController.pgAnswerQuestion.bind(exercisesController));
router.post('/pgModifyOpenExercise', verify(true, true), exercisesController.pgModifyOpenExercise.bind(exercisesController));
router.post('/pgModifyMultipleChoiceExercise', verify(true, true), exercisesController.pgModifyMultipleChoiceExercise.bind(exercisesController));

export default router;