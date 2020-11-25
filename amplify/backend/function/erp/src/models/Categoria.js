const { DataTypes, Model } = require('sequelize');
const Nomina = require('./Nomina');
const sequelize = require('../sequelize');

class Categoria extends Model {}

Categoria.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: DataTypes.STRING
    },
    {
        sequelize
    }
)

Categoria.hasMany(Nomina, { foreignKey: 'categoria_id' });

(async ()=>{
    await sequelize.sync();
})()

module.exports = Categoria;