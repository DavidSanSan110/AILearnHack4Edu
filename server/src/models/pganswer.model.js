export class PGAnswer {
    constructor(exercise_id, user_id, answer, isCorrect, feedback = null, id = null) {
        this.id = id;
        this.exercise_id = exercise_id;
        this.user_id = user_id;
        this.answer = answer;
        this.isCorrect = isCorrect;
        this.feedback = feedback;
    }
}