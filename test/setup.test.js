process.env.NODE_ENV = 'test';

const User = require('../models/user');
const Campaign = require('../models/campaign');
const Forum = require('../models/forum');

before((done) => {
    User.deleteMany({}, function(err) {});
    Campaign.deleteMany({}, function(err) {});
    Forum.deleteMany({}, function(err) {});
    done();
});

after((done) => {
    User.deleteMany({}, function(err) {});
    Campaign.deleteMany({}, function(err) {});
    Forum.deleteMany({}, function(err) {});
    done();
});
