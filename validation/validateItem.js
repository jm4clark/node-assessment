const validator = require("validator");
const isEmpty = require("./is-empty.js");



module.exports = function validateItem(data){
    var errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!validator.isAlphanumeric(data.username)) {
        errors.username = "Username invalid: must contain letters and numbers only"
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    return { errors, isValid: isEmpty(errors)};
};