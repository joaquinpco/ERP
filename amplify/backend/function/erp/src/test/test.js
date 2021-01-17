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
        const resp = await axios.get('http://localhost:3000/erp/concepto');
    });

    after( () => {
        
    });

});