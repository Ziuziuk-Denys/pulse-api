require('dotenv').config();

const config = {
    port: Number(process.env.PORT) || 3000,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    jwtSecret: process.env.JWT_SECRET
}

const required = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const key of required) {
    if (!process.env[key]) {
        console.log(`Missing required environment variable - ${key}`);
    }
}

module.exports = config;