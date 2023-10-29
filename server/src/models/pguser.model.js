export class PGUser {
    constructor(name, surname, email, password, role, id = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}