const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const MateriaPrima = require('./MateriaPrima');
const MateriaprimaProducto = require('./MateriaprimaProducto');

class Producto extends Model {}

Producto.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        tipo: DataTypes.STRING,
        marca: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        precio: DataTypes.DOUBLE,
        cantidad: DataTypes.INTEGER
    },
    {
        sequelize
    }
);

Producto.belongsToMany(MateriaPrima, { through: MateriaprimaProducto });
MateriaPrima.belongsToMany(Producto, { through: MateriaprimaProducto });

(async ()=> {
    await sequelize.sync();
})();

module.exports = Producto;