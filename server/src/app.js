// Imports & Configuration
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { createHandler } from 'graphql-http/lib/use/express';

// Routes
import AuthRoutes from './routes/auth.routes.js';
import CoursesRoutes from './routes/courses.routes.js';
import ExercisesRoutes from './routes/exercises.routes.js';
import LessonsRoutes from './routes/lessons.routes.js';
import SVCoursesRoutes from './routes/svcourses.routes.js';
import { Schema } from './services/graphql/Schema.js';
import { verifyToken } from './middleware/auth.js';

const serverIp = process.env.HOST || 'localhost';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'AILearn API',
      version: '1.0.0',
      description:
        'This is a the AILearn API documentation.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://' + serverIp + ':10000',
        description: 'Development server',
      },
    ],
  };

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerDocument = swaggerJsdoc(swaggerOptions);

export class Application {

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
        });
    }

    config() {
        dotenv.config();
        this.app.use(function(req, res, next) {
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Origin', req.headers.origin); //solve error
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie'); //solve error
          if ('OPTIONS' == req.method) {
               res.sendStatus(200);
           } else {
               next();
           }
        });
        this.app.use(cookieParser());
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(compression());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(express.static('../web/build'));
        this.app.get('/', (req, res) => {
            res.send('Express + TypeScript Server Hello!!!!');
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/api', verifyToken, createHandler({ schema: Schema, context: async (req) => ({ id: req.raw.id, role: req.raw.role, email: req.raw.email  }) }));
        //this.app.use('/api', createHandler({ schema: Schema }));
        this.app.use('/auth', AuthRoutes);
        this.app.use('/courses', CoursesRoutes);
        this.app.use('/exercises', ExercisesRoutes);
        this.app.use('/lessons', LessonsRoutes);
        this.app.use('/svcourses', SVCoursesRoutes);

        this.app.get('*', (req, res) => {
          res.sendFile('index.html', {root: '../web/build'});
        });
        this.app.use((req, res) => {
            res.status(404).send('404 Not Found');
        });
    }
}