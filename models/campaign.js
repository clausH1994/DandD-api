const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let campaignSchema = new Schema(
    {
        titel: { type: String },
        edition: { type: String },
        setting: { type: String },
        city:{type:String},
        zipcode: {type:Number},
        rules: {type:String},
        notes: {type:String},
        tools: {type:String},
        numberOfPlayers: {type:Number},
        maxPlayer: {type:Number},
        ownerID: {type:String},
        ownerName: {type:String},
        wishedClasses: {type:Array},
        dates: {type:Array},
        listOfPlayers: {type:Array},
    }
);

module.exports = mongoose.model("campaign", campaignSchema);