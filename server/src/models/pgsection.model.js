export class PGSection {
    constructor(course_id, title, text, id = null) {
        this.id = id;
        this.course_id = course_id;
        this.title = title;
        this.text = text;
    }
}