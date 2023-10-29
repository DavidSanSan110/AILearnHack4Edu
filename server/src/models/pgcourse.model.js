export class PGCourse {
    constructor(subject, difficulty, code = null, isGenerated = false, isSV = false, id = null) {
        this.id = id;
        this.subject = subject;
        this.difficulty = difficulty;
        this.code = code;
        this.isGenerated = isGenerated;
        this.isSV = isSV;
    }
}