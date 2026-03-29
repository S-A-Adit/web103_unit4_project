import { pool } from '../config/database.js'

const getCars = async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to retrieve cars' })
    }
}

const getCarById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to retrieve car' })
    }
}

const createCar = async (req, res) => {
    const { make, model, color, wheels, engine, interior, price } = req.body
    try {
        const result = await pool.query(
            `INSERT INTO cars (make, model, color, wheels, engine, interior, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [make, model, color, wheels, engine, interior, price]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create car' })
    }
}

const updateCar = async (req, res) => {
    const { id } = req.params
    const { make, model, color, wheels, engine, interior, price } = req.body
    try {
        const result = await pool.query(
            `UPDATE cars
             SET make = $1, model = $2, color = $3, wheels = $4, engine = $5, interior = $6, price = $7
             WHERE id = $8
             RETURNING *`,
            [make, model, color, wheels, engine, interior, price, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update car' })
    }
}

const deleteCar = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json({ message: 'Car deleted successfully', car: result.rows[0] })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete car' })
    }
}

export { getCars, getCarById, createCar, updateCar, deleteCar }
