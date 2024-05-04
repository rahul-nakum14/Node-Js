const mongoose = require('mongoose');
const emailvalidator = require('email-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: async function (value) {
            return emailvalidator.validate(value);
          },
          message: 'Invalid email address',
        },
    },
    password:{
        type:String,
        required: true,
        minLength: 8
    },
    confirmpassword:{
        type:String,
        required: true,
        minLength: 8,
        validate:function(){
            return this.confirmpassword == this.password;
        }
    }
})


//Hooks in database
//pre-post hooks called before and after calling in database
// userSchema.pre('save',function(){
//     console.log('BEfore save in database',);
// })


// userSchema.post('save',function(){
//     console.log('After save in database');
// })

//not storing confirm password beacause its unnessacry so we use hooks

userSchema.pre('save',function(){
    this.confirmpassword = undefined;
})

userSchema.pre('save',async function () {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password,salt);
    this.password = hashedString;
})

module.exports = mongoose.model('UserModel',userSchema);