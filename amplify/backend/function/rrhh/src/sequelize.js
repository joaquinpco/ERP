const env = require('./event.json');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

module.exports = sequelize