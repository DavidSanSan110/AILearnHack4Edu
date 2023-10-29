import { makeAPIRequest } from '../helpers.js';
import { PostgresSingleton } from '../database/pdb.js';

const serverIp = process.env.HOST || 'localhost';

export class CoursesModel {

    async pgAddCourse(user_id, subject, difficulty) {

        const client = await PostgresSingleton.getInstance().client;
        const queryAddCourse = 'INSERT INTO public.course(subject, difficulty) VALUES($1, $2) RETURNING *';
        const queryAddEnrollment = 'INSERT INTO public.enrollment(user_id, course_id) VALUES($1, $2) RETURNING *';
        const valuesAddCourse = [subject, difficulty];
        let valuesAddEnrollment;
        let course_id;

        return new Promise((resolve, reject) => {
            client.query(queryAddCourse, valuesAddCourse)
                .then((result) => {
                    course_id = result.rows[0].id;
                    valuesAddEnrollment = [user_id, course_id];
                    console.log(result.rows[0]);
                    client.query(queryAddEnrollment, valuesAddEnrollment)
                        .then((result) => {
                            console.log(result);
                            makeAPIRequest(`http://${serverIp}10003/task-api/v1/tasks/create`, 'POST', {
                                "course_id": course_id,
                                "url": `http://${serverIp}:10002/ailearn-ai/v1/courses/create`,
                                "method": "POST",
                                "params": { "subject": subject, "difficulty": difficulty, "isSupervised": false },
                            })
                                .then((resultTask) => {
                                    console.log(resultTask);
                                    resolve({
                                        'course_id': course_id,
                                        'task_id': resultTask.id
                                    });
                                })
                                .catch((error) => {
                                    reject({ message: error.message });
                                });
                        })
                        .catch((error) => {
                            reject({ message: error.message });
                        });
                })
                .catch((error) => {
                    reject({ message: error.message });
                });
        });
    }

    async pgUpdateCourse(task_id) {
        const client = await PostgresSingleton.getInstance().client;
        const queryGetTask = 'SELECT * FROM public.task WHERE id = $1';
        const valuesGetTask = [task_id];
        const queryInsertSections = 'INSERT INTO public.section(course_id, title, text) VALUES ';
        const queryInsertLessons = 'INSERT INTO public.lesson(section_id, title, text) VALUES ';
        const updateIsGenerated = 'UPDATE public.course SET isgenerated = true WHERE id = $1';
        let contador = 1;

        let course_id;

        return new Promise((resolve, reject) => {
            client.query(queryGetTask, valuesGetTask)
                .then((resultTasks) => {
                    console.log(resultTasks.rows[0]);
                    let course = resultTasks.rows[0].result.course;
                    course_id = resultTasks.rows[0].course_id;

                    const valueSectionsPlaceholders = course.sections.map(() => `($${contador++}, $${contador++}, $${contador++})`).join(',');
                    console.log(valueSectionsPlaceholders);
                    const valuesInsertSections = course.sections.reduce((acc, section) => [...acc, course_id, section.title, section.text], []);
                    console.log(valuesInsertSections);

                    client.query(queryInsertSections + valueSectionsPlaceholders + ' RETURNING *', valuesInsertSections)
                        .then((resultSections) => {

                            contador = 1;
                            const valueLessonsPlaceholders = course.sections.reduce((acc, section) => {
                                return [...acc, ...section.lessons.map(() => `($${contador++}, $${contador++}, $${contador++})`)];
                            }, []).join(',');
                            
                            let valuesInsertLessons = [].concat(...course.sections.map((section, index) => {
                                return (section.lessons.map((lesson) => {
                                    return [resultSections.rows[index].id, lesson.title, lesson.text];
                                }));
                            }));
                            valuesInsertLessons = [].concat(...valuesInsertLessons);

                            client.query(queryInsertLessons + valueLessonsPlaceholders + ' RETURNING *', valuesInsertLessons)
                                .then((result) => {
                                    console.log(result);
                                    client.query(updateIsGenerated, [course_id])
                                        .then((result) => {
                                            console.log(result);
                                            resolve('Course updated successfully');
                                        })
                                        .catch((error) => {
                                            reject({ "m1": error.message });
                                        });
                                })
                                .catch((error) => {
                                    reject({ "m2": error.message });
                                });
                        })
                        .catch((error) => {
                            reject({ "m3": error.message });
                        });
                })
                .catch((error) => {
                    reject({ "m4": error.message });
                });
        });
    }

    async pgDeleteCourse(course_id) {
        const client = await PostgresSingleton.getInstance().client;
        const queryDeleteCourse = 'DELETE FROM public.course WHERE id = $1';
        const valuesDeleteCourse = [course_id];

        return new Promise((resolve, reject) => {
            client.query(queryDeleteCourse, valuesDeleteCourse)
                .then((result) => {
                    resolve('Course deleted successfully');
                })
                .catch((error) => {
                    reject({ message: error.message });
                });
        });
    }
}