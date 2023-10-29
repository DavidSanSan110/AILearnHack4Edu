import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String
});

export const UserModel = mongoose.model('User', userSchema);

export class User {
    constructor(name, username, password, role) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

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