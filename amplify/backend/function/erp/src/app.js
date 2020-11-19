/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


//For local development
require('dotenv').config();

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var cors = require('cors')

// declare a new express app
var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const AWS = require('aws-sdk');

const sequelize = require("./sequelize");

//Load Models
const Audit = require('./models/Audit');
const Nomina = require('./models/Nomina');
const Categoria = require('./models/Categoria');
const Valoracion = require('./models/Valoracion');
const Concepto = require('./models/Concepto');

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
   
   const attributes  = user.UserAttributes;

   let normalizeAttr = {};
   for( attr of attributes)
   {
     normalizeAttr[attr.Name] = attr.Value;
   }

   user.normalizeAttr = normalizeAttr;
  
   return user;
 }

 function normalizeListUser(userList)
 {
   let usersNormalizedAttr = [];

   for(user of userList.Users)
   {
    const attributes = user.Attributes;
    let normalizeAttr = {};
    
    for(attr of attributes)
    {
      normalizeAttr[attr.Name] = attr.Value;
    }
    
    //Incluimos la propiedad enable
    normalizeAttr['Enabled'] = user.Enabled;

    user.normalizeAttr = normalizeAttr;
    usersNormalizedAttr.push(user.normalizeAttr);
   }

   return usersNormalizedAttr;
 }
/**********************
 * Route methods  *
 **********************/

app.put('/erp/normalizeUser', async function(req, res){
  try
  {
    //Normalize user for admins
    var paramsPut = {
      UserPoolId: process.env.POOL_ID, /* required */
      Username: req.query.Username /* required */
    }

    const currentUser = await cognito.adminGetUser(paramsPut).promise();

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
            Value: 'ADMIN'
          },
          {
            Name: 'custom:NIF',
            Value: '32079350P'
          },
          {
            Name: 'custom:STR_PHONE',
            Value: '000000000'
          },
          {
            Name: 'custom:ADDRESS',
            Value: 'default address'
          },
          {
            Name: 'custom:STR_NSS',
            Value: '00000000'
          },
          {
            Name: 'custom:PROFILE_PICTURE',
            Value: 'default'
          }
        ],
        UserPoolId: process.env.POOL_ID,
        Username: req.query.Username
      };

      await cognito.adminUpdateUserAttributes(paramsPut).promise();
      
    }

    res.json(currentUser);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/getNormalizeUser', async function(req, res) {

  //Normalize user for admins
  var paramsPut = {
    UserPoolId: process.env.POOL_ID, /* required */
    Username: req.query.Username /* required */
  }

  try
  {
    const currentUser = await cognito.adminGetUser(paramsPut).promise();
    const currentUserNormalized = normalizeUser(currentUser);
    res.json(currentUserNormalized);
  }
  catch(err)
  {
    res.json(err);
  }

});

app.post('/erp/rrhh/newEmployee', async function(req, res) {
  //
  try
  {
    let email = req.body.email;

    var params = {
      UserPoolId: process.env.POOL_ID, /* required */
      Username: email, /* required */
      TemporaryPassword: req.body.tempPassword,
      UserAttributes: [
        {
          Name: 'email', /* required */
          Value: email
        },
        {
          Name: 'custom:FIRST_NAME', /* required */
          Value: req.body.firstname
        },
        {
          Name: 'custom:LAST_NAME',
          Value: req.body.lastname
        },
        {
          Name: 'custom:ROLE',
          Value: req.body.role
        },
        {
          Name: 'custom:NIF',
          Value: req.body.nif
        },
        {
          Name: 'custom:PHONE',
          Value: req.body.phone
        },
        {
          Name:'custom:ADDRESS',
          Value: req.body.address
        }
      ]
    };

    const user = await cognito.adminCreateUser(params).promise();
    req.json(user);
  }
  catch(err)
  {
    console.error(err);
    res.json(err);
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
        'custom:ROLE',
        'sub',
        'custom:NIF',
        'custom:STR_PHONE',
        'custom:ADDRESS',
        'custom:STR_NSS'
        /* more items */
      ]
    };

    const dataUsers = await cognito.listUsers(params).promise();
    const usersNormalized = normalizeListUser(dataUsers);

    res.json(usersNormalized);
  }
  catch(err)
  {
    console.error(err);
    res.json(err);
  }
});

app.put('/erp/rrhh/disableUser', async function(req, res) {
  try
  {
    var params = {
      UserPoolId: process.env.POOL_ID, /* required */
      Username: req.body.sub /* required */
    };
    const user = await cognito.adminDisableUser(params).promise();
    res.json(user);
  }
  catch(err)
  {
    console.error(err);
    res.json(err);
  }
});

app.get('/erp/concepto', async function(req, res) {
  try
  {
    let conceptos = await Concepto.findAll();
    res.json(conceptos);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.put('/erp/rrhh/enableUser', async function(req, res) {
  try
  {
    var params = {
      UserPoolId: process.env.POOL_ID, /* required */
      Username: req.body.sub /* required */
    };
    const user = await cognito.adminEnableUser(params).promise();
    res.json(user);
  }
  catch(err)
  {
    console.error(err);
    res.json(err);
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
