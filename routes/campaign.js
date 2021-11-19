const router = require("express").Router();
const campaign = require("../models/campaign");
const { verifyToken } = require("../validation");

//CRUD operations

// /api/campaigns/
//Create campaign - post
router.post("/", verifyToken, (req, res) => {
    data = req.body;

    campaign.insertMany(data)
    .then(data => { res.status(201).send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

// /api/campaigns/
//Read all campaigns - get
router.get("/", (req, res) => {
    campaign.find()
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read specific campaign - get
router.get("/:id", (req, res) => {
    campaign.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Update specific campaign - put
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    campaign.findByIdAndUpdate(id, req.body)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot update campaign with id=" + id + ".maybe campaign was not found!"})
        }
        else
        {
            res.send({message: "campaign was succesfully updated"})
        }
    })
    .catch(err => {res.status(500).send({message: "Error updating campaign with id= " + id}); })
});

//Delete specific campaign - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    campaign.findByIdAndDelete(id)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot delete campaign with id=" + id + ".maybe campaign was not found!"})
        }
        else
        {
            res.send({message: "Campaign was succesfully deleted"})
        }
    })
    .catch(err => {res.status(500).send({message: "Error deleting campaign with id= " + id}); })
});


module.exports = router;