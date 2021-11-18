const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let forumSchema = new Schema(
{
   name: { type: String },
   listOfPosts: {type:Array},
}
);

module.exports = mongoose.model("forum", forumSchema);