const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        username:
        {
            type:String,
            max:15,
            min: 3
        },
        email:
        {
            type:String,
            required: true,
            min: 6,
            max: 255
        },
        password:{
            type:String,
            required: true,
            min: 6,
            max: 255
        },
        name:{
            type:String,
        },
        age:{
            type:Number,
        },
        city:{
            type:String,
        },
        zipcode:{
            type:Number,
        },
        role:{
            type:String,
        },
        class:{
            type:String,
        },
        setting:{
            type:String,
        },
    }
);


module.exports = mongoose.model("user", userSchema);