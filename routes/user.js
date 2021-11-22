const router = require("express").Router();
const User = require("../models/user");
const { verifyToken } = require("../validation");
const bcrypt = require('bcrypt');
// /api/users/
//Create user - post- used for testing only!!
router.post("/", verifyToken, (req, res) => {

    data = req.body;

    User.insertMany(data)
        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// /api/users/
//Read all users - get
router.get("/", verifyToken, (req, res) => {
    User.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

//Read specific user - get
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

//Update specific user - put
router.put("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    req.body.password = password;


    User.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update user with id=" + id + ".maybe user was not found!" })
            }
            else {
                res.send({ message: "User was succesfully updated" })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error updating user with id= " + id }); })
});

//Delete specific user - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete user with id=" + id + ".maybe user was not found!" })
            }
            else {
                res.send({ message: "User was succesfully deleted" })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting user with id= " + id }); })
});
module.exports = router;