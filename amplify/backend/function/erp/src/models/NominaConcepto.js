const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class NominaConcepto extends Model {}

NominaConcepto.init(
    {
        porcentaje: DataTypes.DOUBLE,
        precio: DataTypes.DOUBLE
    },
    {   
        sequelize,
        timestamps: false 
    }
);

(async ()=> {
  await sequelize.sync();
})();

module.exports = NominaConcepto;