// passwordUtils.js

const crypto = require('crypto');

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex'); // Generate a random salt
};

const hashPassword = (password, salt) => {
    const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex'); // Hash the password with the salt using createHmac

    return hashedPassword;
};

module.exports = { generateSalt, hashPassword };
