const assert = require('assert');

describe("Describe ERP Endpoints", () => {

    //Testing set-up
    process.env.LOGGING_SEQUELIZE = "false";
    process.env.DATABASE_URL = "postgresql://tester:testing@localhost:5432/db_test";

    const request = require('supertest');
    let app = require('../app');

    before( (done) => {
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