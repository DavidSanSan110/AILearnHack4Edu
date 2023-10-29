import { exercisesData } from '../services/data.js';
import { PostgresSingleton } from '../database/pdb.js';
import { PGExercise } from '../models/pgexercise.model.js';

export class ExercisesModel {

  async pgAddExercise(lesson_id) {
    const client = PostgresSingleton.getInstance().client;
    const exercises = exercisesData.map((exercise) => {
      return new PGExercise(lesson_id, exercise.type, exercise.question, exercise.explanation, exercise.options, exercise.correct_option);
    });
    const query = `INSERT INTO exercise (lesson_id, type, question, explanation, options, correct_option) VALUES `;
    let values = '';
    exercises.forEach((exercise) => {
      const options = `{${exercise.options.join(',')}}`;
      values += `(${lesson_id}, '${exercise.type}', '${exercise.question}', '${exercise.explanation}', '${options}', '${exercise.correct_option}'),`;
    });
    values = values.slice(0, -1);
    return new Promise((resolve, reject) => {
      client.query(query + values)
        .then((result) => {
          resolve({ message: 'Exercise added successfully!' });
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  }

  async pgAnswerQuestion(student_id, exercise_id, answer) {
    const client = PostgresSingleton.getInstance().client;
    const isCorrect = Math.random() >= 0.5;
    const feedback = isCorrect ? 'Correct' : 'Incorrect';
    const query = `INSERT INTO answer (exercise_id, user_id, answer, isCorrect, feedback) VALUES (${exercise_id}, ${student_id}, '${answer}', ${isCorrect}, '${feedback}')`;
    return new Promise((resolve, reject) => {
      client.query(query)
        .then((result) => {
          resolve({ message: 'Exercise answered successfully!' });
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  }

  async pgModifyOpenExercise(exercise_id, question, explanation) {
    const client = PostgresSingleton.getInstance().client;
    const query = `UPDATE exercise SET question = '${question}', explanation = '${explanation}' WHERE id = ${exercise_id}`;
    return new Promise((resolve, reject) => {
      client.query(query)
        .then((result) => {
          resolve({ message: 'Exercise modified successfully!' });
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  }

  async pgModifyMultipleChoiceExercise(exercise_id, question, explanation, options, correct_option) {
    const client = PostgresSingleton.getInstance().client;
    const query = `UPDATE exercise SET question = '${question}', explanation = '${explanation}', options = '{${options.join(',')}}', correct_option = '${correct_option}' WHERE id = ${exercise_id}`;
    return new Promise((resolve, reject) => {
      client.query(query)
        .then((result) => {
          resolve({ message: 'Exercise modified successfully!' });
        })
        .catch((error) => {
          reject({ message: error.message });
        });
    });
  }

}