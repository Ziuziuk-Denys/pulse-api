const config = require(`../config.js`);
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({error: 'No token'});
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.id;
        next();
    } catch {
        return res.status(401).json({error: 'Invalid token'});
    }

}

module.exports = authMiddleware;