const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Nomina = require('./Nomina');

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
        tableName: 'devengo'
    }
);

Devengo.hasOne(Nomina, { foreignKey: 'id' });

(async ()=> {
  await sequelize.sync();
})();

module.exports = Devengo;