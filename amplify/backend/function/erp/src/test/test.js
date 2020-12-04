const assert = require('assert');
const request = require('supertest');
let app = require('../app');

beforeAll(function (done) {
    return new Promise((resolve,reject) => {
        app.on("appStarted", function(){
            return resolve();
        }); 
    });
});

describe("Describe ERP Endpoints", app => {

    it("Handles GET Request from /erp/concepto", app =>{
        request(app)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if(err) throw err;
        });
    });

});