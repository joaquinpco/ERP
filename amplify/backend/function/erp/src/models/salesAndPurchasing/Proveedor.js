const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class Proveedor extends Model {}

Proveedor.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        telefono: DataTypes.STRING
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = Proveedor;