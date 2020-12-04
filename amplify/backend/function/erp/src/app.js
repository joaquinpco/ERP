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
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const AWS = require('aws-sdk');

const sequelize = require("./sequelize");

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

const s3 = new AWS.S3();

const cognito = new AWS.CognitoIdentityServiceProvider();

const customUsersPoolParams = require('./cognito');
const NominaConcepto = require('./models/NominaConcepto');

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
            Value: '000000000'
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
          Name: 'custom:STR_PHONE',
          Value: req.body.phone
        },
        {
          Name:'custom:ADDRESS',
          Value: req.body.address
        },
        {
          Name:'custom:STR_NSS',
          Value: req.body.nss
        },
        {
          Name:'custom:PROFILE_PICTURE',
          Value: 'profile.png'
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

app.put('/erp/updateEmployee', async function(req, res){
  try
  {
    let params = {}
    
    //update from emp profile

    let updateType = req.body.updateType;

    if(updateType == 1)
    {
      params = {
        UserAttributes: [ /* required */
          {
            Name: 'custom:FIRST_NAME', /* required */
            Value: req.body.firstname
          },
          {
            Name: 'custom:LAST_NAME',
            Value: req.body.lastname
          }
          /* more items */
        ],
        UserPoolId: process.env.POOL_ID, /* required */
        Username: req.body.sub /* required */
      };
    }
    else
    {
      //update from edit emp RRHH
      params = {
        UserAttributes: [ /* required */
          {
            Name: 'custom:FIRST_NAME', /* required */
            Value: req.body.firstname
          },
          {
            Name: 'custom:LAST_NAME',
            Value: req.body.lastname
          },
          {
            Name: 'custom:NIF',
            Value: req.body.nif
          },
          {
            Name: 'custom:ROLE',
            Value: req.body.role
          },
          {
            Name: 'custom:STR_NSS',
            Value: req.body.nss
          },
          {
            Name: 'custom:STR_PHONE',
            Value: req.body.phone
          },
          {
            Name: 'custom:ADDRESS',
            Value: req.body.address
          }

          /* more items */
        ],
        UserPoolId: process.env.POOL_ID, /* required */
        Username: req.body.sub /* required */
      };
    }

    const reqResult = await cognito.adminUpdateUserAttributes(params).promise();
      
    res.json(reqResult);
    
  }
  catch(err)
  {
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

app.get('/erp/valoracion', async function(req, res) {
  try
  {
    let valoraciones = await Valoracion.findAll();
    res.json(valoraciones);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/nominas', async function(req, res) {
  try
  {
    let nominas = await Nomina.findAll(
      {
        include: [{
          model: Concepto
        }]
      }
    );

    res.json(nominas);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/categorias', async function(req, res) {
  try
  { 
    if(req.query.queryType==1)
    {
      let categorias = await Categoria.findAll();
      res.json(categorias);
    }
    else
    {
      const pkCategorias = req.query.pkCategorias
      let categorias = await Categoria.findByPk(pkCategorias);
      res.json(categorias);
    }
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

app.post('/erp/newConcepto', async function(req, res) {
  try
  {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;

    await Concepto.create({
      codigo: codigo,
      nombre: nombre,
      tipo: tipo
    });

    await sequelize.sync();

    res.json({success: 'Creation call succeed!', url: req.url});
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/newCategory', async function(req, res) {
  try
  {
    const nombre = req.body.nombre;

    await Categoria.create({
      nombre: nombre
    });

    await sequelize.sync()

    res.json({success: 'Creation call succeed!', url: req.url});
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/createUserReport', async function(req, res) {
  try
  {
    const report = Buffer.from(req.body.informe.split(',')[1], 'base64')
    const reportName = req.body.name;

    if(report)
    {
      //Subida de fichero a S3

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: reportName,
        Body: report,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'application/pdf'
      };

      await s3.upload(params).promise();

      await Valoracion.create({
        feedback: req.body.feedback,
        informe: req.body.name,
        periodo: req.body.periodo,
        sub: req.body.sub
      });

      await sequelize.sync();

    }
    else
    {

      await Valoracion.create({
        feedback: req.body.feedback,
        informe: "",
        periodo: req.body.periodo,
        sub: req.body.sub
      });

      await sequelize.sync();

    }

    res.json('success');
  }
  catch(err)
  {
    console.error(err);
    res.json(err);
  }

});


app.get('/erp/report', async function(req, res){
  try
  {
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.query.key
    }
    const response = await s3.getSignedUrlPromise('getObject', params);

    res.json(response);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/newPayroll', async function(req, res){
  
  const sub = req.body.sub;
  const periodstart = req.body.periodstart;
  const periodend = req.body.periodend;
  const totaldays = req.body.totaldays;
  const ssbase = req.body.ssbase;
  const atdesbase = req.body.atdesbase;
  const irpf = req.body.irpf;
  const category = req.body.category;

  const conceptos = JSON.parse(req.body.concept);

  let totalDevengado = 0;
  let totalDeduccion = 0;

  for(let concepto of conceptos)
  {
    if(concepto.tipo==="DEVENGO")
    {
      totalDevengado += Number(concepto.precio);
    }
  }

  const nomina = await Nomina.create({
    sub: sub,
    start_periodo:periodstart,
    end_periodo: periodend,
    total_dias: totaldays,
    base_ss: ssbase,
    base_at_des: atdesbase,
    base_irpf: irpf,
    categoria_id: category,
    total_devengado: totalDevengado
  });

  for(let concepto of conceptos)
  {
    try{
      let cncpto = await Concepto.findOne({ where: { id: concepto.id } })
      await cncpto.addNomina(nomina)
      
      let nominaConcepto = await NominaConcepto.findOne({
        where: {
          NominaId: Number(nomina.id),
          ConceptoId: Number(cncpto.id)
        }
      })

      if(cncpto.tipo == "DEVENGO")
      {
        nominaConcepto.precio = concepto.precio;
        await nominaConcepto.save();
      }
      else
      {
        nominaConcepto.porcentaje = Number(concepto.porcentaje);
        await nominaConcepto.save();
        totalDeduccion += (totalDevengado * (Number(concepto.porcentaje) / 100));
      }
    }
    catch(err)
    {
      console.error(err)
    }
  }

  try
  {
    
    nomina.total_deducir = totalDeduccion;
    await nomina.save();

    await sequelize.sync();

    res.json({success: 'get call succeed!', url: req.url});
  }
  catch(err)
  {
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

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app.listen(3000, function() {
    console.log("App started");
});
