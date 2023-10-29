import mongoose from "mongoose";

import { UserModel } from "./user.model.js";

const courseSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    difficulty: String,
    withExercises: Boolean,
    totalCourseScore: {
        $type: Number,
        default: 0
    },
    sections: [{
        name: String,
        totalSectionScore: {
            $type: Number,
            default: 0
        },
        lessons: [{
            name: String,
            text: String,
            isDone: {
                $type: Boolean,
                default: false
            },
            totalLessonScore: {
                $type: Number,
                default: 0
            },
            exercises: [{
                name: String,
                type: String,
                openExercise: {
                    $type: Object,
                    question: String,
                    explanation: String,
                    user_answer: {
                        $type: String,
                        default: null
                    },
                    result: {
                        $type: Object,
                        correct: Boolean,
                        feedback: String,
                        default: null
                    },
                    default: null
                },
                multipleChoiceExercise: {
                    $type: Object,
                    question: String,
                    explanation: String,
                    options: [String],
                    answer: String,
                    user_answer: {
                        $type: String,
                        default: null
                    },
                    result: {
                        $type: Object,
                        correct: Boolean,
                        feedback: String,
                        default: null
                    },
                    default: null
                },
            }],
        }]
    }]
}, { typeKey: '$type' });

export const CourseModel = mongoose.model("Course", courseSchema);
export class Course {
    constructor(user_id, name, difficulty, withExercises, sections = []) {
        this.user_id = user_id;
        this.name = name;
        this.difficulty = difficulty;
        this.withExercises = withExercises;
        this.sections = sections;
    }
}

export class Exercise {
    constructor(type, question, explanation, options, correct_option) {
        this.type = type;
        this.question = question;
        this.explanation = explanation;
        this.options = options;
        this.correct_option = correct_option;
    }
}