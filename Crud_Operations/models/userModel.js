const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:({
        type: String,
        unique: true,
        required: true
    }),
    
    email:({
        type: String,
        unique: true,
        required: true
    }),
    role:{
        type:String,
        required: true,
        default:"NORMAL"
    },
    password:({
        type: String,
        required: true
    })
},
{
timestamps:true,
collection: 'crud_operations' 
});

module.exports = mongoose.model('userModel',userSchema);

