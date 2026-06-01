const config = require('./src/config')
const taskTouters = require("./src/routes/taskRouters.js");
const authRouts = require('./src/routes/authRoutes.js');
const express = require('express');

const PORT=config.port;
const app = express();
app.use(express.json());

app.use('/auth', authRouts)

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        port: PORT
    })
})

app.use('/tasks', taskTouters)





app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})