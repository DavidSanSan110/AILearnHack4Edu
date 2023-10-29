import pg from 'pg';

export class PostgresSingleton {

    static getInstance() {
        if (!PostgresSingleton.instance) {
            PostgresSingleton.instance = new PostgresSingleton();
        }

        return PostgresSingleton.instance;
    }

    constructor() {
        this._connect();
    }

    _connect() {
        this.client = new pg.Client({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        });
        this.client.connect();
        console.log('Connected to Postgres');
    }
}