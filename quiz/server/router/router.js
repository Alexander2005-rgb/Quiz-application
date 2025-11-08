//router/router.js

import { Router } from "express"; // import Router from express
import * as controller from '../controller/controller.js'; // import all controller functions

const router = Router();// create a new instance of Router

router.route('/')// define route

// Auth routes
router.route('/auth/register')
        .post(controller.registerUser);

router.route('/auth/login')
        .post(controller.loginUser);

// Protected routes
router.route('/questions')
        .get(controller.authenticateToken, controller.getQuestions)
        .post(controller.authenticateToken, controller.requireAdmin, controller.insertQuestions)
        .delete(controller.authenticateToken, controller.requireAdmin, controller.dropQuestions); // this line handles GET, POST, DELETE requests for /questions

router.route('/result')
        .get(controller.authenticateToken, controller.getResult)
        .post(controller.authenticateToken, controller.storeResult)
        .delete(controller.authenticateToken, controller.requireAdmin, controller.dropResult);
        // this line handles GET, POST, DELETE requests for /result

// Admin routes for quiz management
router.route('/quizzes')
        // .get(controller.authenticateToken, controller.getQuizzes)
        .get(controller.authenticateToken, controller.getQuizzes)
        .post(controller.authenticateToken,  controller.createQuiz);

router.route('/questions/add')
        .post(controller.authenticateToken, controller.requireAdmin, controller.addQuestion);

export default router;
