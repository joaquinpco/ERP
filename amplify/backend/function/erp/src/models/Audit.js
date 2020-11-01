const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Audit extends Model { }

Audit.init(
    {
        id: {
            type:          DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        title:       DataTypes.STRING,
        endpoint:    DataTypes.STRING,
        data:        DataTypes.STRING,
        result:      DataTypes.STRING,
        infoFront:   DataTypes.STRING,
        description: DataTypes.STRING,
        time:        DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'Audit',
        indexes: [
            {
                unique: false,
                fields: [ 'time' ] 
            }
        ]
    }
);

(async () => {
    await sequelize.sync();
}) ();

module.exports = Audit;