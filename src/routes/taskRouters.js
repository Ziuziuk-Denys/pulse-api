const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware.js');
router.get('/', authMiddleware, taskController.getTasks)

router.post('/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('title').isLength({max: 255}).withMessage('Title is too long'),
        body('description').isLength({max: 1000}).withMessage('Description is too long')
    ],
    taskController.createTask
);

module.exports = router;