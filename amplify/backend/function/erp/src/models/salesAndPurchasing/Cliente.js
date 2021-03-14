const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');
const Factura = require('./Factura');

class Cliente extends Model {}

Cliente.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: {
            type: DataTypes.STRING,
            unique: true
        },
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING
    },
    {
        sequelize
    }
);

Cliente.hasMany(Factura, { foreignKey: 'cliente_id' });

(async ()=> {
    await sequelize.sync();
})();

module.exports = Cliente;