const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'THISISISECRETKEY';

const signup = async (req,res) =>{

    const {username,email,password} = req.body;

    try{

        const existingUser = await userModel.findOne({email:email});

        if(existingUser){
            return res.status(400).json({message:'User Email Is already Exist'})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });

        const token = jwt.sign({email: result.email,id:result.id},SECRET_KEY);
        res.status(201).json({user:result,token:token});

    }catch(error){
        console.log(error);
        res.status(505).json({message:'something went wrong'});
    }
}

const signin= async (req,res) =>{
    
    const {email,password} = req.body;

    try{

        const existingUser = await userModel.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({message:'User Not found'})
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(403).json({message:'Password Does Not Match'})
        }

        const token = jwt.sign({email:existingUser.email,id: existingUser.id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});

    }catch(error){
        console.log(error);
        res.status(505).json({message:'something went wrong'});
    }
}

module.exports = {signin,signup};

// with save method
// const signup = async (req, res) => {
//     const { username, email, password } = req.body;
  
//     try {
//       const existingUser = await userModel.findOne({ email: email });
  
//       if (existingUser) {
//         return res.status(400).json({ message: 'User Email Is already Exist' });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new userModel({
//         email: email,
//         password: hashedPassword,
//         username: username,
//       });
  
//       await newUser.save();
  
//       res.status(201).json({ message: 'User Created' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };
  