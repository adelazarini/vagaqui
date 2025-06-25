const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: console.log
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão bem-sucedida!');
    } catch (error) {
        console.error('Erro de conexão:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
