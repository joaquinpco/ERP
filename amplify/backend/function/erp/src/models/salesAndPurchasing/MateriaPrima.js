const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const Proveedor = require('./Proveedor');

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

MateriaPrima.hasMany(Proveedor, {foreignKey: 'materiaprima_id'});

(async ()=> {
    await sequelize.sync();
})();

module.exports = MateriaPrima;