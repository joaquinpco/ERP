const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class MateriaPrima extends Model {}

MateriaPrima.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: DataTypes.STRING,
        peso: DataTypes.DOUBLE,
        precio: DataTypes.DOUBLE,
        cantidad: DataTypes.INTEGER
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = MateriaPrima;