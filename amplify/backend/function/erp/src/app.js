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

//Paypal Config
var paypal = require('paypal-rest-sdk');

//PDFMaker
const pdfmake = require('@alheimsins/pdf-make');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET
});

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

//Loading Models RRHH
const Audit = require('./models/Audit');
const Nomina = require('./models/rrhh/Nomina');
const Categoria = require('./models/rrhh/Categoria');
const Valoracion = require('./models/rrhh/Valoracion');
const Concepto = require('./models/rrhh/Concepto');
const NominaConcepto = require('./models/rrhh/NominaConcepto');

//Loading Models SALES, PURCHASING & FINANCES

const Cliente = require('./models/salesAndPurchasing/Cliente');
const MateriaPrima = require('./models/salesAndPurchasing/MateriaPrima');
const Oferta = require('./models/salesAndPurchasing/Factura');
const MateriaPrimaProducto = require('./models/salesAndPurchasing/MateriaprimaProducto');
const Producto = require('./models/salesAndPurchasing/Producto');
const Proveedor = require('./models/salesAndPurchasing/Proveedor');
const Venta = require('./models/salesAndPurchasing/Venta');
const VentaProducto = require('./models/salesAndPurchasing/VentaProducto');
const CategoriaProducto = require('./models/salesAndPurchasing/CategoriaProducto');
const Factura = require('./models/salesAndPurchasing/Factura');
const Compra = require('./models/salesAndPurchasing/Compra');
const CuentaBancaria = require('./models/salesAndPurchasing/CuentaBancaria');

AWS.config.update({ 
  region: process.env.REGION, 
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY 
});

const s3 = new AWS.S3();

const cognito = new AWS.CognitoIdentityServiceProvider();

const customUsersPoolParams = require('./cognito');
const { raw } = require('express');
const { CognitoIdentityServiceProvider } = require('aws-sdk');


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
            Name: 'custom:STRG_NSS',
            Value: '000000000000'
          },
          {
            Name: 'custom:PROFILE_PICTURE',
            Value: 'default.png'
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
          Name: 'custom:FIRST_NAME',
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
          Name:'custom:STRG_NSS',
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
        'custom:STRG_NSS',
        'custom:PROFILE_PICTURE'
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
            Name: 'custom:STRG_NSS',
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

app.post('/erp/payWithPaypal', async function(req, res) {
  
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": req.body.returnurl,
        "cancel_url": req.body.cancelurl
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": req.body.name,
                "sku": "item",
                "price": req.body.price,
                "currency": "USD",
                "quantity": req.body.quantity
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.body.total
        },
        "description": req.body.paymentDescription
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        res.json(error);
    } else {
        res.json(payment);
    }
  });
  
});

app.get('/erp/customers', async function(req, res) {
  try
  {
    if(req.query.queryType === '1')
    {
      const customerId = req.query.customerId;

      let cliente = await Cliente.findOne({ where: { id: customerId } });
      res.json(cliente);
    }
    else
    {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    }
  }
  catch(err)
  {
    return res.json(err);
  }
});

app.post('/erp/newCustomer', async function(req, res) {
  try
  {
    const nombre = req.body.fullname;
    const direccion = req.body.address;
    const telefono = req.body.phone;

    const cliente = await Cliente.create({
      nombre: nombre,
      direccion: direccion,
      telefono: telefono
    })

    return res.json(cliente);
  }
  catch(err)
  {
    return res.json(err);
  }
});

app.put('/erp/updateCustomer', async function(req, res) {
  try
  {
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    let cliente = await Cliente.findOne({ where: { id: req.body.id } });
    
    cliente.telefono = telefono;
    cliente.nombre = nombre;
    cliente.direccion = direccion;

    await cliente.save();
  
    res.json(cliente);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/newProductCategory', async function(req, res) {
  try
  {
    const nombreCategoria = req.body.category;

    const categoriaProducto = await CategoriaProducto.create({
      nombre: nombreCategoria
    });

    res.json(categoriaProducto);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/productCategories', async function(req, res) {
  try
  {
    const productCategories = await CategoriaProducto.findAll();
    res.json(productCategories);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/products', async function(req, res) {
  try
  {
    const producto = await Producto.findAll(
      {
        include: [{
          model: MateriaPrima
        }]
      }
    );
    res.json(producto);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/newRawMaterial', async function(req, res){
  try
  {
    const rawMaterial = await MateriaPrima.create({
      nombre: req.body.name,
      peso: req.body.weight,
      precio: req.body.price,
      cantidad: req.body.quantity
    });

    res.json(rawMaterial);
  }
  catch(err){
    res.json(err);
  }
});

app.get('/erp/rawMaterials', async function(req, res) {
  try{
    if(req.query.queryType == '1')
    {
      const rawMaterialId = req.query.id;
      let rawMaterial = await MateriaPrima.findOne({ where: { id: rawMaterialId } });
      res.json(rawMaterial); 
    }
    else
    {
      const rawMaterials = await MateriaPrima.findAll();
      res.json(rawMaterials);
    }
  }
  catch(err){
    res.json(rawMaterial);
  }
});

app.post('/erp/newProduct', async function(req, res) {
  
  const tipo = req.body.tipo;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const precio = req.body.precio;
  const quantity = req.body.quantity;
  const categoria = req.body.category;

  try
  {

    const producto = await Producto.create({
      tipo: tipo,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidad: quantity,
      categoriaproducto_id: categoria
    });

    if(tipo === "TANGIBLE")
    {
      //Rellenamos la tabla intermedia
      const rawMaterials = JSON.parse(req.body.rawMaterials);

      for(let rawMaterial of rawMaterials)
      {
        let materiaPrima = await MateriaPrima.findOne({ where: { id: rawMaterial.id } });
        materiaPrima.cantidad -= rawMaterial.cantidad;
        await materiaPrima.save();

        await producto.addMateriaPrima(materiaPrima);
        
        let materiaPrimaProducto = await MateriaPrimaProducto.findOne({ 
          where: { 
            ProductoId: producto.id, MateriaPrimaId: materiaPrima.id 
          }
        });

        materiaPrimaProducto.cantidad = rawMaterial.cantidad;
        await materiaPrimaProducto.save();
      }

    }

    return res.json(producto);
  }
  catch(err)
  {
    return res.json(err);
  }

});

app.post('/erp/uploadProfilePhoto', async function(req, res) {

  const imageProfile  = Buffer.from(req.body.dataUrl.split(',')[1], 'base64');
  const type = req.body.dataUrl.split(';')[0].split('/')[1];
  const sub  = req.body.sub;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: sub + "." + type,
    Body: imageProfile,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/' + type
  };

  const urlProfile = await s3.upload(params).promise();

  let userParams = {
    UserAttributes: [ /* required */
      {
        Name: 'custom:PROFILE_PICTURE', /* required */
        Value: urlProfile.Location
      },
      /* more items */
    ],
    UserPoolId: process.env.POOL_ID, /* required */
    Username: sub, /* required */
  }

  try
  {
    const request = await cognito.adminUpdateUserAttributes(userParams).promise();
  }
  catch(err){}

});

app.post('/erp/newBill', async function(req, res) {
  try
  {
    const productos = JSON.parse(req.body.productos);
    const idCliente = req.body.cliente;
    
    let sequelizeProductos = [];
    let total = 0;

    for(let producto of productos)
    {
      const idProducto = producto.id;
      const cantidadVendida = producto.cantidad;
      let prdct = await Producto.findOne({where: {id: producto.id}});
      prdct.cantidad -= cantidadVendida;
      total += cantidadVendida * prdct.precio;
      await prdct.save();
      sequelizeProductos.push(prdct);
    }

    let venta = await Venta.create({
      total: total,
      sub: req.body.sub 
    });

    let factura = await Factura.create({
      idVenta: venta.id,
      sub: req.body.sub,
      cliente_id: idCliente
    });

    let i = 0;
    for(let seqProducto of sequelizeProductos)
    {
      await venta.addProducto(seqProducto);
      let ventaProducto = await VentaProducto.findOne({where: { VentumId: venta.id, 
        ProductoId: seqProducto.id }});
      ventaProducto.cantidad = productos[i].cantidad;
      await ventaProducto.save();
      i++;
    }

    res.json(factura);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.get('/erp/invoicePDF', async function(req, res) {
  const saleId = req.query.id;

  let content = []
  let products = []

  const invoice  = await Factura.findOne({ where: { idVenta: saleId } });
  const customer = await Cliente.findOne({ where: {  id: invoice.cliente_id } });
  const sale = await Venta.findOne({ where: { id: invoice.idVenta }, include: [
    Producto
  ] }); 

  content.push({
    text: 'Invoice number: '+ invoice.id + "\nDate: " + invoice.createdAt,
    style: 'header'
  });
  content.push({
    text: 'Customer Data\n\n Name:' + customer.nombre + "\n" + "Phone:" + 
      customer.telefono + "\n" + "Address:" + customer.direccion,
    style: 'subheader'
  })

  content.push({
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ '*', 'auto', 100, '*' ],

      body: [
        [ 'First', 'Second', 'Third', 'The last one' ],
        [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
        [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
      ]
    }
  })



  const docDefinition = {
    content: content,
    pageOrientation: 'portrait',
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 0]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 5, 0, 0]
      },
      normal: {
        alignment: 'justify'
      },
      normalBold: {
        alignment: 'justify',
        bold: true
      }
    }
  }

  const buffer = await pdfmake(docDefinition);

  const pdfBase64 = buffer.toString('base64');

  res.json({
    success: 'pdf created!',
    url: req.url,
    pdf: pdfBase64
  });
});

app.get('/erp/invoices', async function(req, res) {
  try {
    if(req.query.queryType == '1')
    {
      let factura = await Factura.findOne({ where: { id: req.query.id } });

      res.json(factura)
    }
    else if(req.query.queryType == '2')
    {
      let factura = await Factura.findOne({ where: { idVenta: req.query.idVenta } });
      let cliente = await Cliente.findOne({ where: { id: factura.cliente_id } });

      res.json(cliente);
    }
    else
    {
      const facturas = await Factura.findAll({
        include: [{
          model: Cliente
        }]
      });
      res.json(facturas);
    }
  }
  catch(err) {
    res.json(err);
  }
});

app.get('/erp/sales', async function(req, res) {
  try
  {
    let venta = await Venta.findAll({
      include: [{
        model: Producto
      }]
    });

    res.json(venta);
  }
  catch(err)
  {
    res.json(err)
  }
});

app.get('/erp/suppliers', async function(req, res) {
  try
  {
    const queryType = req.query.queryType;
    
    if(queryType == 1)
    {
      let proveedor = await Proveedor.findOne({ where: { id: req.query.id } });
      res.json(proveedor);
    }
    else
    {
      let proveedores = await Proveedor.findAll();
      res.json(proveedores);
    }
  }
  catch(err)
  {
    res.json(err);
  }
});

app.post('/erp/newSupplier', async function(req, res) {
  try
  {
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    const proveedor = await Proveedor.create({
      nombre: nombre,
      telefono: telefono,
      email: email
    })

    res.json(proveedor);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.put('/erp/updateSupplier', async function(req, res) {
  try
  {
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const supplierId = req.body.supplierId;

    let supplier = await Proveedor.findOne({ where: { id: supplierId } });
    supplier.nombre = nombre;
    supplier.telefono = telefono;
    supplier.email = email;
    
    await supplier.save()

    res.json(supplier);
  }
  catch(err)
  {
    res.json(err);
  }
});

app.put('/erp/updateRawMaterial', async function(req, res) {
  try
  {
    const nombre = req.body.nombre;
    const peso = req.body.peso;
    const cantidad = req.body.cantidad;
    const proveedorId = req.body.proveedorId;
    const id = req.body.id;

    let rawMaterial = await MateriaPrima.findOne({ where: { id: id } });
    
    rawMaterial.nombre = nombre;
    rawMaterial.peso = peso;
    rawMaterial.cantidad = cantidad;
    rawMaterial.proveedor_id = proveedorId;

    await rawMaterial.save();

    res.json(rawMaterial);
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


//Check if server is on testing mode
if(process.env.DEPLOYED_APP === "false")
{
  module.exports = app.listen(3000, function() {
    console.log("App started");
  });
}
else
{
  app.listen(3000, function() {
    console.log("App started");
  });
  module.exports = app;
}