const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const Cliente = require('./Cliente');

class Factura extends Model {}

Factura.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        idVenta: DataTypes.INTEGER,
        sub: DataTypes.STRING
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = Factura;