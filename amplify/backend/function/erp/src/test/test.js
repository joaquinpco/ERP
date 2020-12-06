const assert = require('assert');

describe("Describe ERP Endpoints", () => {

    const request = require('supertest');
    let app = require('../app');

    before( (done) => {
        process.env.LOGGING_SEQUELIZE = "false";
        process.env.DATABASE_URL = "";
        done();
    });

    it("Handles GET Request from /erp/concepto", () =>{
        request(app)
        .get('/erp/concepto')
        .expect()
        .expect(200)
        .end(function(err, res) {
            if(err) throw err;
        });
    });

    after( (done) => {
        done();
    })

});