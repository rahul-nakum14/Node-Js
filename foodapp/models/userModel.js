const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { has } = require('lodash');

db_link='mongodb+srv://teyasel184:hS5zCQ7CfTfrCeNB@cluster0.b7cfz9e.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    console.log('connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        // validate: {
        //     validator: function (value) {
        //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //       return emailRegex.test(value);
        //     },
        //     message: 'Invalid email address'
        //   }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmpassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: 'Password does not match'
        }
    }
});


// userSchema.pre('save',async function(){
//     this.confirmpassword = undefined;
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
// });

// userSchema.pre('save',async  function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
// });

const userModel = mongoose.model('userModel',userSchema);

module.exports=userModel;




// validation


// const userSchema = mongoose.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true, // Ensures uniqueness at the database level
//       validate: {
//         validator: function (value) {
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           return emailRegex.test(value);
//         },
//         message: 'Invalid email address'
//       }
//     },
//     password: {
//       type: String,
//       required: true,
//       minLength: 8
//     },
//     confirmpassword: {
//       type: String,
//       required: true,
//       minLength: 8,
//       validate: {
//         validator: function (value) {
//           return this.password === value;
//         },
//         message: 'Password does not match'
//       }
//     }
//   });
  

// async function postSignup(req, res) {
//     let dataobj = req.body;
  
//     try {
//       const postuser = await userModel.create(dataobj);
//       res.json({
//         message: "signup",
//         data: postuser
//       });
//     } catch (error) {
//       if (error.name === 'MongoError' && error.code === 11000) {
//         return res.status(400).json({ error: 'Email must be unique' });
//       }
//       if (error.name === 'ValidationError') {
//         const validationErrors = {};
//         if (error.errors.email) {
//           validationErrors.email = error.errors.email.message;
//         }
//         if (error.errors.confirmpassword) {
//           validationErrors.confirmpassword = error.errors.confirmpassword.message;
//         }
//         return res.status(400).json({ error: validationErrors });
//       }
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
  