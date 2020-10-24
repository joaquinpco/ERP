const getSequelize = require('./sequelize');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

( async () =>{
    
    const sequelize = await getSequelize();

    User.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        fullname: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN
    }, { sequelize, modelName: 'user' });

})();

module.exports = User