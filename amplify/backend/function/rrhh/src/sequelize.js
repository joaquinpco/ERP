const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const { Sequelize } = require('sequelize');

async function getSequelize()
{

    const configuration = await lambda.getFunctionConfiguration({
        FunctionName: "configuration-dev",
    }).promise();

    const env = configuration.Environment.Variables;
    
    const sequelize = new Sequelize(
        env.DATABASE_URL,
        {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    );

    return sequelize;
}

module.exports = getSequelize;