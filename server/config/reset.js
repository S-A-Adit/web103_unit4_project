import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

const { pool } = await import('./database.js')

const createTable = async () => {

    await pool.query(`
        DROP TABLE IF EXISTS cars;

        CREATE TABLE cars (
            id       SERIAL PRIMARY KEY,
            make     VARCHAR(50)    NOT NULL,
            model    VARCHAR(50)    NOT NULL,
            color    VARCHAR(50)    NOT NULL,
            wheels   VARCHAR(50)    NOT NULL,
            engine   VARCHAR(50)    NOT NULL,
            interior VARCHAR(50)    NOT NULL,
            price    NUMERIC(10, 2) NOT NULL
        );
    `)
    console.log('cars table created')
    await pool.end()
}

createTable()
