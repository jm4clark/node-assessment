const validator = require("validator");
const User = require("../models/users.js");
const isEmpty = require("./is-empty.js");
const bcrypt = require("bcrypt");

module.exports = function validateAuthor(item, data) {
    var errors = {};
    return User.find({}).then(users => {
        var userFound = false;
        for(u in users){
            if(validator.equals(item.author, users[u].username)){
                userFound = true;
                bcrypt.compare(data.password, users[u].password).then(isMatch => {
                if (isMatch){
                    item.save().then(() => {                      
                        //return { errors, isValid: isEmpty(errors) }
                    })
                    .catch(err => res.status(404).json(err));
                    
                } else{
                    errors.credentials = "Incorrect password";
                    return { errors, isValid: isEmpty(errors)}
                }
                })
            }  
        }
        if(!userFound){
            errors.credentials = "Username not found."; 
            return { errors, isValid: isEmpty(errors)};
        }
    }).catch(err => {
        errors.err = err; 
        return { errors, isValid: isEmpty(errors)};
    });
}