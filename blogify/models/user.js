const mongoose = require('mongoose');
const { generateSalt,hashPassword } = require('../utills/passwordUtils'); 


const userSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/userDefaultAvatar.jpeg'
    },
    salt: {
        type: String,
        required: false 
    },
    role:{
        type: String,
        required: true,
        default:"NORMAL"
    }

},{timestamps:true});


userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = generateSalt(); // Use the utility function to generate salt
        const hashedPassword = hashPassword(user.password, salt); // Use the utility function to hash password

        user.password = hashedPassword;
        user.salt = salt; // Store the generated salt in the user object
        next();
    } catch (error) {
        next(error);
    }
});



userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const user = this; 


        if (!user.salt || !user.password) {
            throw new Error('Salt or password missing');
        }

        const hashedPassword = hashPassword(candidatePassword, user.salt);

        if (!hashedPassword) {
            throw new Error('Hashed password generation failed');
        }

        return hashedPassword === user.password;
    } catch (error) {
        console.error('Error comparing passwords:', error.message);
        throw new Error('Error comparing passwords');
    }
};




module.exports = mongoose.model('userModel',userSchema);



