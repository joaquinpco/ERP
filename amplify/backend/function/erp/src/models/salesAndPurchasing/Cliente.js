const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize');

class Cliente extends Model {}

Cliente.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        nombre: DataTypes.STRING,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING
    },
    {
        sequelize
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = Cliente;