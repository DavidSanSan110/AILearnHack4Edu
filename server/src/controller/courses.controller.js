import { CoursesModel } from "../services/courses.service.js";

export class CoursesController {

    constructor() {
        this.coursesModel = new CoursesModel();
    }

    // Add a course for a user in Postgres
    async pgAddCourse(req, res) {
        const { subject, difficulty } = req.body;
        if (!subject || !difficulty) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.coursesModel.pgAddCourse(req.id, subject, difficulty)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(401).json(error.message);
            });
    }

    //Update a course when created in Postgres
    async pgUpdateCourse(req, res) {
        const { task_id } = req.body;
        if (!task_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.coursesModel.pgUpdateCourse(task_id)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json(error);
            });
    }

    // Delete a course
    async pgDeleteCourse(req, res) {
        const { course_id } = req.body;
        if (!course_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.coursesModel.pgDeleteCourse(course_id)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json(error);
            });
    }
}