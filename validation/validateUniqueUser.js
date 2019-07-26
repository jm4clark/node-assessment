const validator = require("validator");
const isEmpty = require("./is-empty.js");


module.exports = function validateUnique(data, comparison){
    var errors = {};

    if (validator.equals(data.username, comparison.username)){
        errors.username = "Username is taken!";
    }
    
    if (validator.equals(data.email, comparison.email)){
        errors.email = "Email is taken!";
    } 
    
    return { errors, isValid: isEmpty(errors)};
}