process.env.NODE_ENV = 'test';

const Forum = require("../models/forum");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);



describe('/test collection', function () {
    it('should verify 0 forum ', (done) => {
        chai.request(server)
            .get('/api/forums')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })


    it('Test Create, Update and delete For forum ', (done) => {

        //register user
        let user = {
            email: "test2@test.dk",
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
                        "email": "test2@test.dk",
                        "password": "testpassword"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        expect(res.body.token).not.to.be.equal(undefined);
                        let token = res.body.token;

                        //Create Forum
                        let forum = {
                            name: "test",
                            listOfPosts: [],
                        }
                        chai.request(server)
                            .post('/api/forums')
                            .send(forum)
                            .set({ "auth-token": token })
                            .end((err, res) => {
                                res.should.have.status(201);
                                expect(res.body).not.to.be.equal(null);
                                expect(res.body[0].name).to.be.equal("test");
                                let id = res.body[0]._id;

                                //Read Forum by id
                                chai.request(server)
                                    .get('/api/forums/' + id)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        expect(res.body).not.to.be.equal(null);
                                        res.body.should.a('object');
                                        expect(res.body.name).to.be.equal("test");

                                        //Update Forum by id
                                        let forum2 = {
                                            name: "test2",
                                            listOfPosts: [],
                                        }
                                        chai.request(server)
                                            .put('/api/forums/' + id)
                                            .send(forum2)
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');                             
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("Forum was succesfully updated")
                                            })
                                        
                                            chai.request(server)
                                            .delete('/api/forums/' + id)      
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');                             
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("Forum was succesfully deleted")
                                                done()
                                            }) 
                                    })
                            })
                    });
            });
    })
})
