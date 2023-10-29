export class PGExercise {
    constructor(lesson_id, type, question, explanation, options, correct_option, id = null) {
        this.id = id;
        this.lesson_id = lesson_id;
        this.type = type;
        this.question = question;
        this.explanation = explanation;
        this.options = options;
        this.correct_option = correct_option;
    }
}