const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const JWT_KEY= 'asdadadsadasdadad';  
const JWT_KEY= ('secret.js');


authRouter
.route('/signup')
.get(middleware1,getSignup,middleware2)
.post(postSignup);

authRouter
.route('/login')
.post(loginuser)


function middleware1(req,res,next){
    console.log('middleware called');
    next();
}

function middleware2(req,res,next){
    console.log('middleware2 called');
    // next();
    console.log('ended');
    res.sendFile('/public/index.html',{root:__dirname});

}

function getSignup(req,res,next){
    console.log('signup called');
    next();
}


async function loginuser(req,res){

  try{
    let data= req.body;
    if(data.email){
      let user = await userModel.findOne({ email: data.email });

      if (user){
        //bcrypt -> compare
        if(user.password == data.password){
          let uid = user['_id'];
          let token=jwt.sign({payload:uid},JWT_KEY);
          res.cookie('login',token,{httpOnly:true});
          return res.json({
            message:"Logged in",
            userDetails:data
          });
        }
        else{
          return res.json({
            message:"Wrong Credentials"
          });
        }
      }
      else{
        return res.json({
          message:"User not found"
        });
      }
    }else{
      return res.json({
        message:"Email cannot be empty"
      });
    }
  }
  catch(err){
    return res.status(500).json({
      message:err.message
    });
  }
  
}



async function postSignup(req, res) {
        let dataobj = req.body;
      
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dataobj.email)) {
          return res.status(400).json({ error: 'Invalid email address' });
        }
      
        // Validate password length
        if (dataobj.password.length < 8) {
          return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
      
        try {
          // Check if email is already registered
          const existingUser = await userModel.findOne({ email: dataobj.email });
          if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
          }
      
          // Create the user
          const postuser = await userModel.create(dataobj);
          res.json({
            message: "signup",
            data: postuser
          });
        } catch (error) {
          if (error.name === 'ValidationError') {
            const validationErrors = {};
            if (error.errors.email) {
              validationErrors.email = error.errors.email.message;
            }
            if (error.errors.confirmpassword) {
              validationErrors.confirmpassword = error.errors.confirmpassword.message;
            }
            return res.status(400).json({ error: validationErrors });
          }
          res.status(500).json({ error: 'Server error' });
        }
      }
      
       
  


module.exports=authRouter;