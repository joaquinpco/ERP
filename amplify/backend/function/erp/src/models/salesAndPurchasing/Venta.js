const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const Producto = require('./Producto');
const VentaProducto = require('./VentaProducto');

class Venta extends Model {}

Venta.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        total: DataTypes.DOUBLE,
        sub: DataTypes.STRING
    },
    {
        sequelize
    }
);

Venta.belongsToMany(Producto, { through: VentaProducto });
Producto.belongsToMany(Venta, { through: VentaProducto });

(async ()=> {
    await sequelize.sync();
})();

module.exports = Venta;