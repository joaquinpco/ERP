const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Nomina extends Model {}

Nomina.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        sub: DataTypes.STRING,
        total_dias: DataTypes.INTEGER,
        rem_total_bruto: DataTypes.DOUBLE,
        base_ss: DataTypes.DOUBLE,
        base_at_des: DataTypes.DOUBLE,
        base_irpf: DataTypes.DOUBLE,
        total_devengado: DataTypes.DOUBLE,
        total_deducir: DataTypes.DOUBLE,
        start_periodo: DataTypes.DATE,
        end_periodo: DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'nomina',
        indexes: [
            {
                unique: false,
                fields: ['sub']
            }
        ]
    }
);

(async () =>{
    await sequelize.sync();
})()

module.exports = Nomina;