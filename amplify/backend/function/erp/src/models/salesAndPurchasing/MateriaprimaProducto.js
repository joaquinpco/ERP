const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class MateriaprimaProducto extends Model {}

MateriaprimaProducto.init(
   {},
   {
     sequelize
   }
);

(async ()=> {
  await sequelize.sync();
})();

module.exports = MateriaprimaProducto;