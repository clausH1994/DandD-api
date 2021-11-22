const router = require("express").Router();
const forum = require("../models/forum");
const { verifyToken } = require("../validation");

//CRUD operations

// /api/forums/
//Create forum - post
router.post("/", verifyToken, (req, res) => {
    data = req.body;

    forum.insertMany(data)
    .then(data => { res.status(201).send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

// /api/forums/
//Read all forums - get
router.get("/", (req, res) => {
    forum.find()
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read specific forum - get
router.get("/:id", (req, res) => {
    forum.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Update specific forum - put
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    forum.findByIdAndUpdate(id, req.body)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot update forum with id=" + id + ".maybe forum was not found!"})
        }
        else
        {
            res.send({message: "Forum was succesfully updated"})
        }
    })
    .catch(err => {res.status(500).send({message: "Error updating forum with id= " + id}); })
});

//Delete specific forum - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    forum.findByIdAndDelete(id)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot delete forum with id=" + id + ".maybe forum was not found!"})
        }
        else
        {
            res.send({message: "Forum was succesfully deleted"})
        }
    })
    .catch(err => {res.status(500).send({message: "Error deleting forum with id= " + id}); })
});

module.exports = router;