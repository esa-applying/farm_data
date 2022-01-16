import pg from 'pg';
import 'dotenv/config';

const {Pool} = pg

const pool = new Pool()

const db = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}

export default db