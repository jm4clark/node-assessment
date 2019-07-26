const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Item = require("../models/items.js");
const User = require("../models/users.js");
const validateItem = require("../validation/validateItem.js");

router.get("/getAll", (req, res) => {
    const errors = {};
    Item.find({}, '-email')
    .then(items => {
        if(!items) {
            errors.noItems = "There are no items";
            res.status(404).json(errors);
        }
        for(i in items){
            console.log(i);
            console.log(i.username);
        }
        res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

router.post("/add", (req, res) => {
    var r = req.body;
    const validate = validateItem(r);
    if(!validate.isValid){
        return res.status(400).json(validate.errors);
    }
    const errors = {};
    var newItem = new Item({
        name: r.name,
        author: r.username,
        content: r.content
    });

    User.find({}).then(users => {
        for(u in users){
            if(newItem.author === users[u].username){
            bcrypt.compare(r.password, users[u].password).then(isMatch => {
                if (isMatch){
                    newItem.save().then(() => console.log("added")
                    .catch(err => res.status(404).json(err)));
                    res.end("item added!");
                } else{
                    errors.credentials = "Incorrect password";
                    return res.status(400).json(errors.credentials)
                }
            })
            }  
        }
        errors.credentials = "Username not found.";
        return res.status(400).json(errors.credentials);  
    }).catch(err => res.status(404).json({ error : `${err}` }));

    
    
})

router.post("/add", (req, res) => {

    var r = req.body;
    const validate = validateItem(r);
    if(!validate.isValid){
        return res.status(400).json(validate.errors);
    }
    const errors = {};
    var newItem = new Item({
        name: r.name,
        author: r.username,
        content: r.content
    });

    
    console.log("begin hashing");
    payload = {};
    bcrypt.genSalt(10, (err,salt) => {
        console.log("salted");
        bcrypt.hash(newItem.email, salt, (err,hash) => {
            console.log("hashed");
            if (err) { console.log(err); }
            newItem.email = hash;
            payload.value = hash;
            newItem.save().then(item => res.json(Item))
            .catch(err => console.log(err));
            res.json(payload);
        });
    });
});

router.put("/update", (req, res) => {
    r = req.body;
    Item.updateOne({ 'username': r.username }, { $set: { 'username': r.username, 'content': r.content} })
        .then(() => {
            res.send("Updated Item")
        })
        .catch(err => res.status(404).json(err));
});


router.delete("/delete", (req, res) => {
    var r = req.body;
    const errors = {};
    var search = { 'username': r.username };
    Item.findOneAndDelete(search)
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.send('Removed Item');
        })
        .catch(err => res.status(404).json(err));
});


module.exports = router;