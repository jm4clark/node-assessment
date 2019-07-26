const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const users = require("./routes/users.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);

mongoose.connect(`mongodb://localhost:27017/users`, { useNewUrlParser: true }).then( () => { 
    console.log("connection ready"); }, 
    (err) => { console.log(err);});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));