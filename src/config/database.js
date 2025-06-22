require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'andrelazarini',
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || 'vagaqui',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        define: {
            timestamps: true,
            underscored: true
        },
        logging: false
    }
};
