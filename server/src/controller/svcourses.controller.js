import { SVCoursesModel } from "../services/svcourses.service.js";

export class SVCoursesController {

    constructor() {
        this.svcoursesModel = new SVCoursesModel();
    }

    // Add a course for a user in Postgres
    async pgAddSVCourse(req, res) {
        const { subject, difficulty } = req.body;
        if (!subject || !difficulty) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.svcoursesModel.pgAddSVCourse(req.id, subject, difficulty)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(401).json(error.message);
            });
    }

    //Update a course when created in Postgres
    async pgUpdateSVCourse(req, res) {
        const { task_id } = req.body;
        if (!task_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.svcoursesModel.pgUpdateSVCourse(task_id)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json(error);
            });
    }

    // Join a supervised course
    async pgJoinSVCourse(req, res) {
        const { code } = req.body;
        if (!code) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.svcoursesModel.pgJoinSVCourse(req.id, code)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(401).json(error.message);
            });
    }

    // Delete a course
    async pgDeleteSVCourse(req, res) {
        const { course_id } = req.body;
        if (!course_id) {
            return res.status(404).json({ message: 'Missing required fields' });
        }

        return await this.svcoursesModel.pgDeleteSVCourse(course_id)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((error) => {
                res.status(401).json(error);
            });
    }
}