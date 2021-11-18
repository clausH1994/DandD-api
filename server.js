const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const campaign = require('./models/campaign');
const app = express();

//imports
const campaignRoutes = require("./routes/campaign");
//const forumRoutes = require("./routes/forum");
//const userRoutes = require("./routes/user");

require("dotenv-flow").config();

//parse request of content-type JSON
app.use(bodyParser.json());
//route


mongoose.connect
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB" + error));

mongoose.connection.once("open", () => console.log('connected succesfully to mongoDB'));

//post, put, delete -> CRUD
app.use("/api/campaigns", campaignRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running onm port: " + PORT);
})

module.exports = app;