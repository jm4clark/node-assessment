const validator = require("validator");
const User = require("../models/users.js");

module.exports = function validateAuthor(item, data) {
    User.find({}).then(users => {
        var userFound = false;
        for(u in users){
            if(validator.equals(item.author, users[u].username)){
                userFound = true;
                bcrypt.compare(data.password, users[u].password).then(isMatch => {
                if (isMatch){
                    item.save().then(() => {
                        return res.send("item added!");})
                    .catch(err => res.status(404).json(err));
                    
                } else{
                    errors.credentials = "Incorrect password";
                    return res.status(400).json(errors.credentials)
                }
                })
            }  
        }
        if(!userFound){
            errors.credentials = "Username not found."; 
            return res.status(400).json(errors.credentials) ;
        }
    }).catch(err => res.status(404).json({ error : `${err}` }));
}