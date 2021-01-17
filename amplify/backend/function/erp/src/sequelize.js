const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: {
        },
        logging: process.env.LOGGING_SEQUELIZE === "true"
    }
);

module.exports = sequelize;