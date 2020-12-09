const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const Cliente = require('./Cliente');

class Oferta extends Model {}

Oferta.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        fecha: DataTypes.DATE,
        idVenta: DataTypes.INTEGER,
        sub: DataTypes.STRING
    },
    {
        sequelize
    }
);

Oferta.hasOne(Cliente);

(async ()=> {
    await sequelize.sync();
})();

module.exports = Oferta;