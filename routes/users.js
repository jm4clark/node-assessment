const express = require("express");
const router = express.Router();
const User = require("../models/users.js");


router.get("/getAll", (req, res) => {
    const errors = {};
    User.find({}, '-email')
    .then(users => {
        if(!users) {
            errors.noUsers = "There are no users";
            res.status(404).json(errors);
        }
        res.json(users);
    })
    .catch(err => res.status(404).json({ error : `${err}` }));
});

module.exports = router;