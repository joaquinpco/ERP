const { DataTypes, Model } = require('sequelize');
const Nomina = require('./Nomina');
const sequelize = require('../sequelize');

class Concepto extends Model {}

Concepto.init({
    id: {
        type:          DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey:    true
    },
    codigo: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    porcentaje: DataTypes.DOUBLE
    },
    {
        sequelize,
        modelName: 'concepto'
    }
);

const Nomina_Concepto = sequelize.define('nomina_conceptos', {}, { timestamps: false });
Concepto.belongsToMany(Nomina, { through: Nomina_Concepto });
Nomina.belongsToMany(Concepto, { through: Nomina_Concepto });

(async ()=> {
  await sequelize.sync();
})();

module.exports = Concepto;