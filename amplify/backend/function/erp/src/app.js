/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const AWS = require('aws-sdk');

const sequelize = require("./sequelize");

//const Audit = require('./models/Audit');

AWS.config.update({ 
  region: process.env.REGION, 
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY 
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const customUsersPoolParams = require('./cognito');

(async ()=>{
  try
  {
    await cognito.addCustomAttributes(customUsersPoolParams).promise();
  }
  catch(err){}
})();

/********************
 * KeyVal User funcs *
 ********************/

 function normalizeUser(user)
 {
   const { attributes } = user;

   let normalizeAttr = {};
   for(const attr of attributes)
   {
     normalizeAttr[attr.Name] = attr.Value;
   }

   user.normalizeAttr = normalizeAttr;

   return user;
 }

/**********************
 * Route methods  *
 **********************/

app.put('/erp/normalizeUser', async function(req, res){
  try
  {

    var paramsGet = {
      UserPoolId: process.env.POOL_ID, /* required */
      Username: req.query.Username /* required */
    }

    const currentUser = await cognito.adminGetUser(paramsGet).promise();

    console.log(currentUser);

    const currentUserNormalized = normalizeUser(currentUser);

    if(currentUserNormalized.normalizeAttr['custom:FIRST_NAME'] === undefined)
    {
      var paramsPut = {
        UserAttributes: [
          {
            Name: 'custom:FIRST_NAME',
            Value: 'DEFAULT'
          },
          {
            Name: 'custom:LAST_NAME',
            Value: 'DEFAULT'
          },
          {
            Name: 'custom:ROLE',
            Value: 'DEFAULT'
          }
        ],
        UserPoolId: process.env.POOL_ID,
        Username: req.params.Username
      };

      await cognito.adminUpdateUserAttributes(paramsPut).promise();

    }

    res.json(currentUser);
  }
  catch(err)
  {
    console.error(err);
  }
});


app.get('/erp', function(req, res) {
  // Add your code here
});

app.get('/erp/rrhh/listUsers', async function(req, res){
  try
  {
    var params = {
      UserPoolId: process.env.POOL_ID,
      AttributesToGet: [
        'email',
        'custom:FIRST_NAME',
        'custom:LAST_NAME',
        'custom:ROLE'
        /* more items */
      ]
    };
    const dataUsers = await cognito.listUsers(params).promise();

    res.json(dataUsers);
  }
  catch(err)
  {
    console.error(err);
  }
});

app.get('/erp/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/erp', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/erp/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/erp', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/erp/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/erp', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/erp/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
