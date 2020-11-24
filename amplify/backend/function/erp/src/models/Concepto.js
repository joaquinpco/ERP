const { DataTypes, Model } = require('sequelize');
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
        nombre: DataTypes.STRING,
        tipo: DataTypes.ENUM('DEVENGO', 'DEDUCCION')
    },
    {
        sequelize
    }
);

(async ()=> {
  await sequelize.sync();
})();

module.exports = Concepto;