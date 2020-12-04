const { assert } = require('chai');
const { expect } = require('chai');
const { should } = require('chai');

process.env.LOGGING_SEQUELIZE = false;
// process.env.DATABASE_URL = DATABASE_URL_TEST;

describe("Describe ERP Endpoints", () => {
    const app = require('../app');
    const request = require('supertest');

    before((done) => {
        done();
    });

    after((done) => {
        app.close();
        done();
    });

    it("Handles GET Request from /erp/concepto", (done) => {
        const responseUnity = [
            {
                id: '1',
                codigo: 1,
                nombre: 'SALARIO BASE',
                tipo: 'DEVENGO',
                createdAt: '2020-11-25T14:25:10.084Z',
                updatedAt: '2020-11-25T14:25:10.084Z'
            },
            {
                id: '2',
                codigo: 999,
                nombre: 'IRPF',
                tipo: 'DEDUCCION',
                createdAt: '2020-11-25T14:25:58.023Z',
                updatedAt: '2020-11-25T14:25:58.023Z'
            }
        ];

        const responseEndpoint = 

        request(app)
        .get('/erp/concepto')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            console.log(res);
            if(err) throw err;
        });

        // make ideal for test @joaquinpco
        // ===============================
        // const responseEndpoint = await request(app)
        // .get('/erp/concepto')
        // .expect('Content-Type', /json/)
        // .expect(200)
        // .end.promise();

        // expect(responseUnity).to.be.equal(responseEndpoint);

        done();
    });
});