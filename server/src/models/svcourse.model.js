import mongoose from "mongoose";

const supervisedCourseSchema = new mongoose.Schema({
    name: String,
    code: String,
    difficulty: String,
    withExercises: Boolean,
    instructorId: String,
    sections: [{
        name: String,
        lessons: [{
            name: String,
            text: String,
            exercises: [{
                name: String,
                type: String,
                openExercise: {
                    $type: Object,
                    question: String,
                    explanation: String,
                    default: null
                },
                multipleChoiceExercise: {
                    $type: Object,
                    question: String,
                    explanation: String,
                    options: [String],
                    answer: String,
                    default: null
                }
            }],
        }]
    }],
    enrolledStudents: [{
        $type: Object,
        studentId: String,
        progress:{
            $type: Object,
            lessonsProgress: [{
                sectionId: String,
                lessonId: String,
                isDone: Boolean,
            }],
            exercisesProgress: [{
                sectionId: String,
                lessonId: String,
                exerciseId: String,
                user_answer: String,
                result: {
                    correct: Boolean,
                    feedback: String,
                }
            }],
            default: null
        },
        default: null
    }],
}, { typeKey: '$type' });

export const SupervisedCourseModel = mongoose.model('supervisedCourses', supervisedCourseSchema);

export class SupervisedCourse {
    constructor(name, code, difficulty, withExercises, instructorId, sections = [], enrolledStudents = []) {
        this.name = name;
        this.code = code;
        this.difficulty = difficulty;
        this.withExercises = withExercises;
        this.instructorId = instructorId;
        this.sections = sections;
        this.enrolledStudents = enrolledStudents;
    }
}

export class Progress {
    constructor(lessonsProgress = [], exercisesProgress = []) {
        this.lessonsProgress = lessonsProgress;
        this.exercisesProgress = exercisesProgress;
    }
}

export class Student {
    constructor(studentId) {
        this.studentId = studentId;
        this.progress = new Progress();
    }
}

export class LessonsProgress {
    constructor(sectionId, lessonId, isDone) {
        this.sectionId = sectionId;
        this.lessonId = lessonId;
        this.isDone = isDone;
    }
}

export class ExercisesProgress {
    constructor(sectionId, lessonId, exerciseId, user_answer, result={}) {
        this.sectionId = sectionId;
        this.lessonId = lessonId;
        this.exerciseId = exerciseId;
        this.user_answer = user_answer;
        this.result = result;
    }
}