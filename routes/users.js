const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const validateUser = require("../validation/validateUser.js");
const validateUnique = require("../validation/validateUniqueUser.js");

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
    User.find({}, " -password -passwordconfirm")
    .then(users => {
        for (u in users){
            var validateUniq = validateUnique(r, users[u]);
            if(!validateUniq.isValid){
                return res.status(400).json(validateUniq.errors);
            }
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
    }).catch(err => res.status(404).json({ error : `${err}` }));
})


module.exports = router;