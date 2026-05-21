const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if( !firstName || !lastName ) {
        throw new Error("First name and last name are required");
    }

    else if( !validator.isEmail(emailId) ) {
        throw new Error("Invalid email format");
    }
    else if( !validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password with at least 8 characters, including uppercase, lowercase, number, and symbol");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "age", "gender", "gender", 'about', "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};