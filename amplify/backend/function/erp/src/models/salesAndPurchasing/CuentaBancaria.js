const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class CuentaBancaria extends Model {}

CuentaBancaria.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        IBAN: DataTypes.STRING  
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = CuentaBancaria;