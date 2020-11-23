const { DataTypes, Model } = require('sequelize');
const Nomina = require('./Nomina');
const sequelize = require('../sequelize');

class Concepto extends Model {}

Concepto.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        codigo: {
            type: DataTypes.INTEGER,
            unique: true
        },
        nombre: DataTypes.STRING
    },
    {
        sequelize,
        modelName: 'concepto'
    }
);

const Nomina_Concepto = sequelize.define('nomina_concepto', {
    porcentaje: DataTypes.DOUBLE,
    precio: DataTypes.DOUBLE,
    tipo: DataTypes.INTEGER
}, { timestamps: false });
Concepto.belongsToMany(Nomina, { through: Nomina_Concepto });
Nomina.belongsToMany(Concepto, { through: Nomina_Concepto });

(async ()=> {
  await sequelize.sync();
})();

module.exports = Concepto;