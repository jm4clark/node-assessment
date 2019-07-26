const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const validateUser = require("../validation/validateUser.js");


router.get("/getAll", (req, res) => {
    const errors = {};
    User.find({}, " -password -passwordconfirm")
    .then(users => {
        if(!users) {
            errors.noUsers = "There are no users";
            res.status(404).json(errors);
        }
        res.json(users);
    })
    .catch(err => res.status(404).json({ error : `${err}` }));
});

router.post("/register", (req, res) => {
    const errors = {};
    var r = req.body;
    const validate = validateUser(r);
    if(!validate.isValid){
        console.log(validate.errors);
        return res.status(400).json(validate.errors);
    }
    var newUser = new User({
        username: r.username,
        email: r.email,
        password: r.password,
        passwordconfirm: r.passwordconfirm
    });

    //console.log("begin hashing");
    bcrypt.genSalt(10, (err,salt) => {
        //console.log("salted");
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            //console.log("hashed");
            if (err) { console.log(err); }
            newUser.password = hash;
            newUser.save().then(user => res.end("user added!"))
            .catch(err => console.log(err));
        });
    });
})

module.exports = router;