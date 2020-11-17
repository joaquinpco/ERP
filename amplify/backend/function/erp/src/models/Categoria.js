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
        sequelize,
        modelName: 'categoria'
    }
)

CategoriaNomina = sequelize.define('categoria_nomina', {
    id: {
        type:          DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey:    true
    }
  });

Categoria.belongsToMany(Nomina, { through: CategoriaNomina });
Nomina.belongsToMany(Categoria, { through: CategoriaNomina });

(async ()=>{
    await sequelize.sync();
})()

module.exports = Categoria;