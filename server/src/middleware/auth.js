import jwt from 'jsonwebtoken';

import { PostgresSingleton } from '../database/pdb.js';


const verifyToken = (req, res, next) => {
    console.log(req)
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
        if (error && error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired!' });
        }
        else if (error && error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token!' });
        }
        else if (error) {
            return res.status(500).send({ message: 'Failed to authenticate token!' });
        }
        req.email = decoded.email;
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    });
}

const verifyRol = (req, res, next) => {
    console.log(req)
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
        if (error && error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired!' });
        }
        else if (error && error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token!' });
        }
        else if (error) {
            return res.status(500).send({ message: 'Failed to authenticate token!' });
        }
        req.username = decoded.username;
        req.id = decoded.id;
        req.role = decoded.role;

        if (req.role !== 'admin') {
            return res.status(403).send({ message: 'Require Admin Role!' });
        }

        next();
    });
}

const verify = (role, enrolled) => {
    return (req, res, next) => {

        const token = req.cookies.token;
        const course_id = req.body.course_id;

        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }

        jwt.verify(token, process.env.JWTSECRET, async (error, decoded) => {

            if (error && error.name === 'TokenExpiredError') {
                return res.status(401).send({ message: 'Token expired!' });
            }
            else if (error && error.name === 'JsonWebTokenError') {
                return res.status(401).send({ message: 'Invalid token!' });
            }
            else if (error) {
                return res.status(500).send({ message: 'Failed to authenticate token!' });
            }

            req.email = decoded.email;
            req.id = decoded.id;
            req.role = decoded.role;

            if (role) {
                if (req.role !== 'admin') {
                    return res.status(403).send({ message: 'Require Admin Role!' });
                }
            }

            if (enrolled) {
                if (course_id === undefined || course_id === null) {
                    return res.status(403).send({ message: 'Require Enrolled Course!' });
                }

                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM enrollment WHERE user_id = ${req.id} AND course_id = ${course_id}`;
                let enrollResponse = await client.query(query);
                if (enrollResponse.rowCount === 0) {
                    return res.status(403).send({ message: 'Require Enrolled Course!' });
                }
            }
            
            next();
        });
    }
}

export { verifyToken };
export { verifyRol };
export { verify };

