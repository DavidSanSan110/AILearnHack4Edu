import { PostgresSingleton } from "../database/pdb.js";
import { PGProgress } from "../models/pgprogress.model.js";

export class LessonsModel {

    async pgSetDoneLesson(user_id, lesson_id) {

        const pgprogress = new PGProgress(user_id, lesson_id);
        let client = PostgresSingleton.getInstance().client;
        let query = `INSERT INTO progress (user_id, lesson_id) VALUES (${pgprogress.user_id}, ${pgprogress.lesson_id})`;
        return new Promise((resolve, reject) => {
            client.query(query)
                .then(res => {
                    resolve('Lesson done successfully');
                })
                .catch(err => {
                    reject({ message: err.stack });
                });
        });
    }

    async pgModifyLesson(lesson_id, title, text) {
            
        let client = PostgresSingleton.getInstance().client;
        let query = `UPDATE lesson SET title = '${title}', text = '${text}' WHERE id = ${lesson_id}`;
        return new Promise((resolve, reject) => {
            client.query(query)
                .then(res => {
                    resolve('Lesson modified successfully');
                })
                .catch(err => {
                    reject({ message: err.stack });
                });
        });
    }
}   