const validator = require("validator");
const isEmpty = require("./is-empty.js");



module.exports = function validateUser(data){
    var errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!validator.isEmail(data.email)) {
        errors.email = "Email invalid"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    return { errors, isValid: isEmpty(errors)};
};