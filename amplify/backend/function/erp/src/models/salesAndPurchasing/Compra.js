const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class Compra extends Model {}

Compra.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        precio_ud: DataTypes.BIGINT,  
        cantidad: DataTypes.INTEGER
    },
    {
        sequelize
    }
);



(async ()=> {
    await sequelize.sync();
})();

module.exports = Compra;