const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Nomina = require('./Nomina');

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
        sequelize,
        tableName: 'categoria'
    }
)

Categoria.belongsToMany(Nomina, {foreignKey: 'id'});
Nomina.belongsToMany(Categoria, {foreignKey: 'id'});

(async ()=>{
    await sequelize.sync();
})()

module.exports = Categoria;