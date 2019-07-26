const validator = require("validator");
const isEmpty = require("./is-empty.js");



module.exports = function validateUser(data){
    var errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordconfirm = !isEmpty(data.passwordconfirm) ? data.passwordconfirm : "";

    if (!validator.isEmail(data.email)) {
        errors.email = "Email invalid";
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!validator.equals(data.password, data.passwordconfirm)){
        errors.passwordconfirm = "Passwords must match";
    }

    return { errors, isValid: isEmpty(errors)};
};