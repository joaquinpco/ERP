const { DataTypes, Model } = require('sequelize');
const Producto = require('./Producto');
const sequelize = require('../../sequelize');

class CategoriaProducto extends Model {}

CategoriaProducto.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize
    }
);

CategoriaProducto.hasMany(Producto, { foreignKey: 'categoriaproducto_id' });

(async ()=> {
    await sequelize.sync();
})();

module.exports = CategoriaProducto;