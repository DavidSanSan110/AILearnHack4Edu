import { MongoDB } from '../database/db.js';
import { SupervisedCourse } from '../models/svcourse.model.js';
import { SupervisedCourseModel } from '../models/svcourse.model.js';
import { TaskModel } from '../models/task.model.js';
import { Student } from '../models/svcourse.model.js';
import { makeAPIRequest } from '../helpers.js';
import { PostgresSingleton } from '../database/pdb.js';
import crypto from 'crypto';

export class SVCoursesModel {

    async pgAddSVCourse(user_id, subject, difficulty) {

        const client = await PostgresSingleton.getInstance().client;
        const queryAddCourse = 'INSERT INTO public.course(subject, difficulty, issv, code) VALUES($1, $2, $3, $4) RETURNING *';
        const queryAddEnrollment = 'INSERT INTO public.enrollment(user_id, course_id) VALUES($1, $2) RETURNING *';
        const code = crypto.randomBytes(4).toString('hex');
        const valuesAddCourse = [subject, difficulty, true, code];
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
                            makeAPIRequest(`http://${serverIp}:10003/task-api/v1/tasks/create`, 'POST', {
                                "course_id": course_id,
                                "url": `http://${serverIp}:10002/ailearn-ai/v1/courses/create`,
                                "method": "POST",
                                "params": { "subject": subject, "difficulty": difficulty, "isSupervised": true },
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
                        }
                        );
                })
                .catch((error) => {
                    reject({ message: error.message });
                }
                );
        });
    }

    async pgUpdateSVCourse(task_id) {

        const client = await PostgresSingleton.getInstance().client;
        const queryGetTask = 'SELECT * FROM public.task WHERE id = $1';
        const valuesGetTask = [task_id];
        const queryInsertSections = 'INSERT INTO public.section(course_id, title, text) VALUES ';
        const queryInsertLessons = 'INSERT INTO public.lesson(section_id, title, text) VALUES ';
        const queryInsertExercises = 'INSERT INTO public.exercise(lesson_id, type, question, explanation, options, correct_option) VALUES ';
        const updateIsGenerated = 'UPDATE public.course SET isgenerated = true WHERE id = $1';

        let course_id;
        let contador = 1;

        return new Promise((resolve, reject) => {
            client.query(queryGetTask, valuesGetTask)
                .then((resultTasks) => {
                    console.log(resultTasks.rows[0]);
                    course_id = resultTasks.rows[0].course_id;
                    let course = resultTasks.rows[0].result.course;
                    /*
                    let valuesInsertSections = '';
                    for (let i = 0; i < resultTasks.rows[0].result.sections.length; i++) {
                        let section = resultTasks.rows[0].result.sections[i];
                        valuesInsertSections += `(${course_id}, '${section.title}', '${section.text}'),`;
                    }
                    valuesInsertSections = valuesInsertSections.slice(0, -1);
                    */

                    //valuePlaceholder = resultTasks.rows[0].result.sections.map((_, i) => `($${i*3+1}, $${i*3+2}, $${i*3+3})`).join(', ');
                    //valuesInsertSections = [].concat(...resultTasks.rows[0].result.sections.map((section) => [section.title, section.text, course_id]))
                    //client.query(queryInsertSections + valuePlaceholder, valuesInsertSections)

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
                                .then((resultLessons) => {
                                    console.log(resultLessons);
                                    let valuesInsertExercises = '';
                                    //console.log(resultTasks.rows[0].result.sections.length)
                                    //console.log(resultTasks.rows[0].result.sections[0].lessons.length)
                                    //console.log(resultTasks.rows[0].result.sections[0].lessons[0].exercises.length)
                                    for (let i = 0; i < course.sections.length; i++) {
                                        for (let j = 0; j < course.sections[i].lessons.length; j++) {
                                            for (let k = 0; k < course.sections[i].lessons[j].exercises.length; k++) {
                                                let exercise = course.sections[i].lessons[j].exercises[k];
                                                valuesInsertExercises += `(${resultLessons.rows[i * 2 + j].id}, '${exercise.type}', '${exercise.question}', '${exercise.explanation}', '{${exercise.options.join(',')}}', '${exercise.correct_option}'),`;
                                            }
                                        }
                                    }
                                    valuesInsertExercises = valuesInsertExercises.slice(0, -1);
                                    client.query(queryInsertExercises + valuesInsertExercises + ' RETURNING *')
                                        .then((resultExercises) => {
                                            console.log(resultExercises);
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
                })
                .catch((error) => {
                    reject({ "m5": error.message });
                });
        });
    }

    async pgJoinSVCourse(user_id, code) {

        const client = await PostgresSingleton.getInstance().client;
        const queryGetCourse = 'SELECT * FROM public.course WHERE code = $1';
        const queryAddEnrollment = 'INSERT INTO public.enrollment(user_id, course_id) VALUES($1, $2) RETURNING *';
        const valuesGetCourse = [code];
        let course_id;

        return new Promise((resolve, reject) => {
            client.query(queryGetCourse, valuesGetCourse)
                .then((result) => {
                    course_id = result.rows[0].id;
                    let valuesAddEnrollment = [user_id, course_id];
                    client.query(queryAddEnrollment, valuesAddEnrollment)
                        .then((result) => {
                            console.log(result);
                            resolve({
                                'course_id': course_id,
                            });
                        })
                        .catch((error) => {
                            reject({ message: error.message });
                        }
                        );
                })
                .catch((error) => {
                    reject({ message: error.message });
                }
                );
        });
    }

    async pgDeleteSVCourse(course_id) {

        const client = await PostgresSingleton.getInstance().client;
        const queryDeleteCourse = 'DELETE FROM public.course WHERE id = $1';
        const valuesDeleteCourse = [course_id];

        return new Promise((resolve, reject) => {
            client.query(queryDeleteCourse, valuesDeleteCourse)
                .then((result) => {
                    console.log(result);
                    resolve('Course deleted successfully');
                })
                .catch((error) => {
                    reject({ message: error.message });
                }
                );
        });
    }

}
