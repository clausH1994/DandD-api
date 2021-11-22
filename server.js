const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const campaign = require('./models/campaign');
const app = express();

//imports
const campaignRoutes = require("./routes/campaign");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");
const userRoutes = require("./routes/user");
//const userRoutes = require("./routes/user");

require("dotenv-flow").config();

// Handle CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, auth-token, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Methods", "*");
    next();
    
  });

//parse request of content-type JSON
app.use(bodyParser.json());
app.use("/api/user", authRoutes);
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

app.use("/api/forums", forumRoutes);

app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running onm port: " + PORT);
})

module.exports = app;