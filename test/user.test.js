process.env.NODE_ENV = 'test';

const Forum = require("../models/user");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);



describe('/test collection User', () => {
    it('should verify 0 user ', (done) => {
        chai.request(server)
            .get('/api/forums')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })


    it('Test Create, Update and delete For user ', (done) => {

        //register user
        let user = {
            email: "test3@test.dk",
            password: "testpassword"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                //login user for token
                res.should.have.status(200);
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "test3@test.dk",
                        "password": "testpassword"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        expect(res.body.token).not.to.be.equal(undefined);
                        let token = res.body.token;

                        //Create User
                        let user = {
                            username: "test",
                            email: "test@testcreate.dk",
                            password: "test",
                            name: "test",
                            age: 2,
                            city: "test",
                            zipcode: 2,
                            role: "test",
                            class: "test",
                            setting: "test"
                        }
                        chai.request(server)
                            .post('/api/users')
                            .send(user)
                            .set({ "auth-token": token })
                            .end((err, res) => {
                                res.should.have.status(201);
                                expect(res.body).not.to.be.equal(null);
                                expect(res.body[0].name).to.be.equal("test");
                                let id = res.body[0]._id;

                                //Read Forum by id
                                chai.request(server)
                                    .get('/api/users/' + id)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        expect(res.body).not.to.be.equal(null);
                                        res.body.should.a('object');
                                        expect(res.body.name).to.be.equal("test");

                                        //Update Forum by id
                                        let user2 = {
                                            username: "test2",
                                            email: "test2@testcreate2.dk",
                                            password: "test2",
                                            name: "test2",
                                            age: 1,
                                            city: "test",
                                            zipcode: 1,
                                            role: "test2",
                                            class: "test2",
                                            setting: "test2"
                                        }
                                        chai.request(server)
                                            .put('/api/users/' + id)
                                            .send(user2)
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("User was succesfully updated")
                                            })

                                        chai.request(server)
                                            .delete('/api/users/' + id)
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("User was succesfully deleted")
                                                done()
                                            })
                                    })
                            })
                    });
            });
    })
})
