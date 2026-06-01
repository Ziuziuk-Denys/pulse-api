const pool = require('../db');
const { validationResult } = require('express-validator');

async function getTasks(req, res) {
    try {
        const [rows] = await pool.execute('SELECT * FROM tasks');
        res.json({tasks: rows});
    } catch (error) {
        res.status(500).json({error: 'Database error'});
    }
}


async function createTask(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            const title = req.body.title;
            const description = req.body.description;
            const [rows] = await pool.execute('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
            res.json({message: 'Task created'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database error'})
    }
}

module.exports = { getTasks, createTask };