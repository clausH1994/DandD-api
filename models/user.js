const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema(

    //username
    //email
    //password
    //name
    //age
    //city
    //zipcode
    //role
    //class
    //setting
);


module.exports = mongoose.model("user", userSchema);