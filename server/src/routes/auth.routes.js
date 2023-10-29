import { Router } from 'express';
import { AuthController } from '../controller/auth.controller.js';
import { verify } from '../middleware/auth.js';

const router = Router();
const authController = new AuthController();

//Doc all routes using swagger-jsdoc

/**
 * @swagger
 * /pgRegister:
 *   post:
 *     summary: Register a new user in the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               password:
 *                  type: string
 *                  description: The user's password.
 *                  example: 123456
 * /pgLogin:
 *   post:
 *     summary: Login a user in the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               password:
 *                  type: string
 *                  description: The user's password.
 *                  example: 123456
 * /pgLogout:
 *   get:
 *     summary: Logout a user
 *     tags: [Users]
 */
router.get('/whoami', verify(false, false), authController.whoAmI.bind(authController));
router.post('/saludar', authController.saludarACarras.bind(authController));

router.post('/pgRegister', authController.pgRegister.bind(authController));
router.post('/pgLogin', authController.pgLogin.bind(authController));
router.post('/pgLogout', verify(false, false), authController.pgLogout.bind(authController));

router.post('/verifynoauth', authController.verifyTest.bind(authController));
router.post('/verifyauth', verify(false, false), authController.verifyTest.bind(authController));
router.post('/verifyauthadmin', verify(true, false), authController.verifyTest.bind(authController));
router.post('/verifyauthenroll', verify(false, true), authController.verifyTest.bind(authController));
router.post('/verifyauthadminenroll', verify(true, true), authController.verifyTest.bind(authController));


export default router;
