const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class MateriaprimaProducto extends Model {}

MateriaprimaProducto.init(
   {
     cantidad: DataTypes.INTEGER
   },
   {
     sequelize
   }
);

(async ()=> {
  await sequelize.sync();
})();

module.exports = MateriaprimaProducto;