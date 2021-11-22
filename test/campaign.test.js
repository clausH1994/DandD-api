process.env.NODE_ENV = 'test';

const Campaign = require("../models/campaign");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);



describe('/test collection Campaign', () => {
    it('should verify 0 campaign ', (done) => {
        chai.request(server)
            .get('/api/campaigns')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })


    it('Test Create, Update and delete For campaign ', (done) => {

        //register user
        let user = {
            email: "test@test.dk",
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
                        "email": "test@test.dk",
                        "password": "testpassword"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        expect(res.body.token).not.to.be.equal(undefined);
                        let token = res.body.token;

                        //Create Campaign
                        let campaign = {
                            titel: "test",
                            edition: "test",
                            setting: "test",
                            city: "test",
                            zipcode: 2,
                            rules: "test",
                            notes: "test",
                            tools: "test",
                            numberOfPlayers: 2,
                            maxPlayer: 2,
                            owner: "test",
                            wishedClasses: [],
                            dates: [],
                            listOfPlayers: [],
                        }
                        chai.request(server)
                            .post('/api/campaigns')
                            .send(campaign)
                            .set({ "auth-token": token })
                            .end((err, res) => {
                                res.should.have.status(201);
                                expect(res.body).not.to.be.equal(null);
                                let id = res.body[0]._id;

                                //Read Campaign by id
                                chai.request(server)
                                    .get('/api/campaigns/' + id)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        expect(res.body).not.to.be.equal(null);
                                        res.body.should.a('object');
                                        expect(res.body.titel).to.be.equal("test");

                                        //Update Campaign by id
                                        let campaign2 = {
                                            titel: "test2",
                                            edition: "test2",
                                            setting: "test2",
                                            city: "test2",
                                            zipcode: 2,
                                            rules: "test2",
                                            notes: "test2",
                                            tools: "test2",
                                            numberOfPlayers: 1,
                                            maxPlayer: 1,
                                            owner: "test2",
                                            wishedClasses: [],
                                            dates: [],
                                            listOfPlayers: [],
                                        }
                                        chai.request(server)
                                            .put('/api/campaigns/' + id)
                                            .send(campaign2)
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');                             
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("campaign was succesfully updated")
                                            })
                                        
                                            chai.request(server)
                                            .delete('/api/campaigns/' + id)      
                                            .set({ "auth-token": token })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.should.a('object');                             
                                                expect(res.body).not.to.be.equal(null);
                                                expect(res.body).not.to.be.equal(err);
                                                expect(res.body.message).to.be.equal("Campaign was succesfully deleted")
                                                done()
                                            }) 
                                    })
                            })
                    });
            });
    })
})
