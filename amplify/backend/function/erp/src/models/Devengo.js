const { DataTypes, Model } = require('sequelize');
const Nomina = require('./Nomina');
const sequelize = require('../sequelize');

class Devengo extends Model {}

Devengo.init({
    id: {
        type:          DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey:    true
    },
    concepto: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    deduccion: DataTypes.DOUBLE
    },
    {
        sequelize,
        modelName: 'devengo'
    }
);

Devengo.hasOne(Nomina, { foreignKey: 'id' });

(async ()=> {
  await sequelize.sync();
})();

module.exports = Devengo;