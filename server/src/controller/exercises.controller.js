import { ExercisesModel } from "../services/exercises.service.js";

export class ExercisesController {

    constructor() {
        this.exercisesModel = new ExercisesModel();
    }

    async pgAddExercise(req, res) {
        const { lesson_id } = req.body;
        if (!lesson_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.exercisesModel.pgAddExercise(lesson_id)
            .then((result) => {
                res.status(200).json({ message: result.message });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }

    async pgAnswerQuestion(req, res) {
        const { exercise_id, answer } = req.body;
        if (!exercise_id || !answer) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.exercisesModel.pgAnswerQuestion(req.id, exercise_id, answer)
            .then((result) => {
                res.status(200).json({ message: result.message });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }

    async pgModifyOpenExercise(req, res) {
        const { exercise_id, question, explanation } = req.body;
        if (!exercise_id || !question || !explanation) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.exercisesModel.pgModifyOpenExercise(exercise_id, question, explanation)
            .then((result) => {
                res.status(200).json({ message: result.message });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }

    async pgModifyMultipleChoiceExercise(req, res) {
        const { exercise_id, question, explanation, options, correct_option } = req.body;
        if (!exercise_id || !question || !explanation || !options || !correct_option) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.exercisesModel.pgModifyMultipleChoiceExercise(exercise_id, question, explanation, options, correct_option)
            .then((result) => {
                res.status(200).json({ message: result.message });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }
}
