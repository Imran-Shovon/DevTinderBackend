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

module.exports = {
    validateSignUpData
}