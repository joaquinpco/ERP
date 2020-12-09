const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class VentaProducto extends Model {}

VentaProducto.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        cantidad: DataTypes.INTEGER
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = VentaProducto;