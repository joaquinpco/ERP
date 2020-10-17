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

const sequelize = require('./sequelize');
const User = require('./User');

const env = require('./event.json');

const AWS = require('aws-sdk');

const USER_POOL_REGION = "eu-west-1";

AWS.config.update({ 
                    region: USER_POOL_REGION, 
                    'accessKeyId': env.ACCESS_KEY_ID, 
                    'secretAccessKey': env.SECRET_ACCESS_KEY 
                  });
const cognito = new AWS.CognitoIdentityServiceProvider();

var params = {
  UserPoolId: env.POOL_ID
};

/**********************
 * Example get method *
 **********************/

app.get('/rrhh', async function(req, res) {
  // Add your code here
 

  try
  {
    const dataUsers = await cognito.listUsers(params).promise();
    console.log(dataUsers);
    res.json({
      success: 'get call success!',
      url: req.url,
      users: dataUsers
    });
  }
  catch(err)
  {
    console.error(err);
  }
  /*await sequelize.sync();
  res.json({
    success: 'get call succeed!', 
    url: req.url,
    user: await User.findAll()
  });*/
});

app.get('/rrhh/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/rrhh', async function(req, res) {
  // Add your code here
  await User.create({
    username: 'perico',
    password: 'perico',
    fullname: 'perico perez',
    isActive: true
  });
  await sequelize.sync();
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/rrhh/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/rrhh', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/rrhh/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/rrhh', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/rrhh/*', function(req, res) {
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
