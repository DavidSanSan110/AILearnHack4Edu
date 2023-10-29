export class PGEnrollment {
    constructor(user_id, course_id, id = null) {
        this.id = id;
        this.user_id = user_id;
        this.course_id = course_id;
    }
}