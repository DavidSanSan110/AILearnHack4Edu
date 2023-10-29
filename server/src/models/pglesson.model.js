export class PGLesson {
    constructor(section_id, title, text, id = null) {
        this.id = id;
        this.section_id = section_id;
        this.title = title;
        this.text = text;
    }
}