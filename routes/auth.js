const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { registerValidation, loginValidation } = require('../validation');
const { application } = require('express');
const { valid } = require("joi");

// /registration
router.post("/register", async (req, res) => {


    //validate the user input 
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    //check if  the email is already registered
    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create a user object and save in the DB
    const userObject = new User({
        email: req.body.email,
        password
    })
    try {
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser._id });
    } catch (error) {
        res.status(400).json({ error })
    }
})

// /login
router.post("/login", async (req, res) => {
    //valitdate user login info
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    //if login info is valid, find the user
    const user = await User.findOne({ email: req.body.email })

    //throw error if email is wrong (user does not exist  in db)
    if (!user) {
        return res.status(400).json({ error: "Email and Password does not match" });
    }
    //user exists - check for correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    //throw error if passsword is wrong
    if (!validPassword) {
        return res.status(400).json({ error: "Email and Password does not match" });
    }

    //create authentication token with email and id
    const token = jwt.sign
        (
            //payload
            {
                email: user.email,
                id: user._id
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

    //attach auth token to header
    res.header("auth-token", token).json({
        error: null,
        token,
        id: user._id
    });
});

module.exports = router;