const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const MateriaPrima = require('./MateriaPrima');
const Compra = require('./Compra');

class Proveedor extends Model {}

Proveedor.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: {
            type: DataTypes.STRING,
            unique: true
        },
        email: DataTypes.STRING,
        telefono: DataTypes.STRING
    },
    {
        sequelize
    }
);

Proveedor.hasMany(MateriaPrima, {foreignKey: 'proveedor_id'});
Proveedor.hasMany(Compra, { foreignKey: 'proveedor_id' });

(async ()=> {
    await sequelize.sync();
})();

module.exports = Proveedor;