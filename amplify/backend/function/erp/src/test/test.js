const assert = require('assert');


describe("Describe ERP Endpoints", () => {
    
    //Testing set-up
    process.env.LOGGING_SEQUELIZE = "false";
    process.env.DATABASE_URL = "postgresql://tester:testing@localhost:5432/db_test";

    const axios = require('axios');
    try
    {
    let app = require('../app');
    }
    catch(err)
    {
    }

    before( async() => {

        const sequelize = require("../sequelize");
        const Concepto = require('../models/rrhh/Concepto');

        const concepto = await Concepto.create({
            codigo: 999,
            nombre: "IRPF",
            tipo: "DEVENGO"
        });

    });
    
    it("Handles GET Request from /erp/concepto", async () =>{
        const res = await axios.get('http://localhost:3000/erp/concepto');
        assert.strictEqual(res.data[0].codigo, 999, "Wrong Code");
        assert.strictEqual(res.data[0].nombre, "IRPF", "Wrong Name");
        assert.strictEqual(res.data[0].tipo, "DEVENGO", "Wrong type");
    });

    it("Handles POST Request from /erp/newCategory", async () =>{
        const name = "Auxiliar Administrativo";
        const res = await axios.post('http://localhost:3000/erp/newCategory', {
            nombre: name
        });
        assert.strictEqual(res.status, 200, "Error when inserting data");
    });

    it("Handles GET Request from /erp/categorias", async() => {
        const res = await axios.get('http://localhost:3000/erp/categorias', {
            params: {
                queryType: 1
            }
        });
        assert.strictEqual(res.data[0].nombre, "Auxiliar Administrativo", "Wrong Value");
    });

    it("Handles POST Request from /erp/newConcepto", async() => {

        const codigo = 999;
        const nombre = "IRPF";
        const tipo = "DEDUCCION";

        const res = await axios.post('http://localhost:3000/erp/newConcepto', {
            codigo: codigo,
            nombre: nombre,
            tipo: tipo
        });

        assert.strictEqual(res.status, 200, "Error when inserting data")
    });

    it("Handles POST Request from /erp/newPayroll", async() => {
        
        const sub = "123189731297894923";
        const periodstart = "";
        const periodend = "";
        const totaldays = "";
        const ssbase = "";
        const atdesbase = ""
        const irpf = "";
        const category = "";

        const concepto = [];

        concepto.push({
            codigo: 999,
            tipo: "DEDDUCCION",
            nombre: conceptAttributes[2],
            id: conceptAttributes[3],
            porcentaje: '17.5',
            precio: value.data
        })

        const res = await axios.post('http://localhost:3000/erp/newPayroll');
        
        //assert.strictEqual(res.data[0].)
        
    });

    after( () => {
        
    });

});