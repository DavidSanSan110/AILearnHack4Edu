import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { PostgresSingleton } from '../database/pdb.js';
import { PGUser } from '../models/pguser.model.js';

export class AuthModel {

    async pgLogin(email, password) {
        const client = await PostgresSingleton.getInstance().client;
        const query = 'SELECT * FROM public.user WHERE email = $1';
        const values = [email];
        return new Promise((resolve, reject) => {
            client.query(query, values)
                .then((result) => {
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    bcrypt.compare(password, user.password)
                        .then((result) => {
                        if (result) {
                            //resolve(jwt.sign({ id: user['id'], email: email, role: user['role'] }, process.env.JWTSECRET, { expiresIn: '10m' }));
                            resolve({ id: user['id'], email: email, role: user['role'], token: jwt.sign({ id: user['id'], email: email, role: user['role'] }, process.env.JWTSECRET, { expiresIn: '1h' }) });
                        }
                        else {
                            reject('Invalid email or password');
                        }
                    })
                        .catch((error) => {
                        reject('Something went wrong');
                    });
                }
                else {
                    reject('No user found with this email');
                }
            })
                .catch((error) => {
                reject('Something went wrong');
            });
        });
    }

    async pgRegister(name, surname, email, password, role) {
        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
        const user = new PGUser(name, surname, email, hashedPassword, role);
        const client = await PostgresSingleton.getInstance().client;
        const query = 'INSERT INTO public.user (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5)';
        const values = [user.name, user.surname, user.email, user.password, user.role];
        return new Promise((resolve, reject) => {
            client.query(query, values)
                .then((result) => {
                resolve('User registered successfully!');
            })
                .catch((error) => {
                reject(error.message);
            });
        });
    }

    whoAmI(id, username, role) {
        return `Your id is ${id} and you are ${username} with role ${role}`;
    }
}