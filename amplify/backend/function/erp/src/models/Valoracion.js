const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Valoracion extends Model {}

Valoracion.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        feedback: DataTypes.BOOLEAN,
        informe: DataTypes.STRING,
        periodo: DataTypes.ENUM('ANUAL', 'MENSUAL', 'SEMANAL')
    },
    {
        sequelize,
        modelName: 'valoracion'
    }
);

(async ()=> {
    await sequelize.sync();
})();

module.exports = Valoracion;