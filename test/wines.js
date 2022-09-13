process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "wines";

describe('Wines', () => {
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function (info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
                .finally(async function () {
                    await db.client.close();
                    resolve();
                });
        });
    });

    describe('GET /wines', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/wines")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    describe('POST /wines', () => {
        it('201 Creating new wine', (done) => {
            let wine = {
                name: "Faustino I",
                vintage: 2008,
                country: "Spanien",
                region: "Rioja",
                price: 199,
                amount: 1,
                tasting: "Spanien"
            };

            chai.request(server)
                .post("/wines")
                .send(wine)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("name");
                    res.body.data.name.should.equal("Faustino I");

                    done();
                });
        });

        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/wines")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });

        it('201 Creating new wine', (done) => {
            let wine = {
                name: "Faustino I",
                vintage: 2008,
                country: "Spanien",
                region: "Rioja",
            };

            chai.request(server)
                .post("/wines")
                .send(wine)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property("message");
                    res.body.errors.message.should.equal("Price and amount needed to create wine.");

                    done();
                });
        });

        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/wines")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });
    });
});
