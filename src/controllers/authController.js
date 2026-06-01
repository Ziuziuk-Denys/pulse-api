const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require("../db");
const config = require(`../config.js`);

async function register (req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password || !email) {
        return res.status(400).send({message: 'Username or password of email is required'})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
        );

        return res.json({status: 'success', message: 'Registered successfully.'});
    } catch (error) {
        res.status(500).json({status: 'error', error: error});
    }
}

async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email or password is required' });
    }
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = jwt.sign(
            { userId: rows[0].id },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        return res.json({ status: 'success', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { register, login };