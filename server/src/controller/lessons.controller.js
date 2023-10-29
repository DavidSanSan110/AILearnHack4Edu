import { LessonsModel } from "../services/lessons.service.js";

export class LessonsController {

    constructor() {
        this.lessonsModel = new LessonsModel();
    }

    async pgSetDoneLesson(req, res) {
        const { lesson_id } = req.body;
        if (!lesson_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.lessonsModel.pgSetDoneLesson(req.id, lesson_id)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }

    async pgModifyLesson(req, res) {
        const { lesson_id, title, text } = req.body;
        if (!lesson_id || !title || !text) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.lessonsModel.pgModifyLesson(lesson_id, title, text)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json({ message: error.message });
            });
    }
}