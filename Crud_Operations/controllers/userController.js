const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utills/jwt_token_generate');


const signup = async(req,res) =>{
    const data = req.body;
    try{
        const exisitinguser = await userModel.findOne({email:data.email}) ;

        if(exisitinguser){
            return res.json({Error:"User Already Exist"});
        }

        if(!data.email || !data.username || !data.password){
            return res.json({Error:"All fields Are Require"});
        }

        const hashedPassword = await bcrypt.hash(data.password,10);

        const result = await userModel.create({
            email:data.email,
            username:data.username,
            password:hashedPassword
        });

        console.log(result);
        res.status(201).json({user: result});
    }

    catch{
        return res.json({Error:'Error Occured'});
    }
}


const signin = async (req,res)=>{
    const data = req.body;
    try{
        const existingUser = await userModel.findOne({email:data.email});
        if(!existingUser){
            return res.json({Error:"User Not Found"})
        }
        const matchPassword = await bcrypt.compare(data.password,existingUser.password);
        if(!matchPassword){
            return res.status(403).json({message:'Password Does Not Match'})
        }else{
            const token = generateToken(existingUser); 
            return res.json({ token, Success: 'Successfully Logged IN' });
        }
    }catch(error){
        console.log(error);
    }
}

module.exports = {signup,signin};