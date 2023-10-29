import { AuthModel } from '../services/auth.service.js';

export class AuthController {

    constructor() {
        this.authModel = new AuthModel();
    }

    async pgLogin(req, res) {
            
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(404).json({ message: 'Email and password are required!' });
        }

        return await this.authModel.pgLogin(req.body.email, req.body.password)
            .then((result) => {
            res.cookie('token', result.token, { httpOnly: true, secure: false });
            res.status(200).json({ message: 'Login successful!', data: result });
        })
            .catch((error) => {
            res.status(401).json({ message: error });
        });
    }

    async pgRegister(req, res) {
        const { name, surname, email, password, role } = req.body || {};
        if (!name || !surname || !email || !password || !role) {
            return res.status(404).json({ message: 'Name, surname, email, password and role are required!' });
        }

        return await this.authModel.pgRegister(req.body.name, req.body.surname, req.body.email, req.body.password, req.body.role)
            .then((result) => {
            res.status(200).json({ message: result });
        })
            .catch((error) => {
            res.status(401).json({ message: error.message });
        });
    }

    // Logout function
    pgLogout(req, res) {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful!' });
    }

    // WIP => Delete this function
    whoAmI(req, res) {
        return res.status(200).json({ message: this.authModel.whoAmI(req.id, req.username, req.role) });
    }

    // WIP => Delete this function
    verifyTest(req, res) {
        return res.status(200).json({ message: 'Test passed!' });
    }

    // WIP => Delete this function
    saludarACarras(req, res) {
        console.log('Hola Carras!');
        return res.status(200).json({ message: 'Hola Carras!' });
    }
}