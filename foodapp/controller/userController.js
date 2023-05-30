const userModel = require('../models/userModel');


module.exports.getUsers=async function getUsers(req,res){
    let allUsers = await userModel.find();
    // let allUsers = await userModel.findOne({name:'Updated Fiedld'});
    // console.log(req.query);
    res.json({message:'list of all users',
    data:allUsers
    });
};

module.exports.postUser=function postUser(req,res){
    users = req.body;
    res.json({
            message:"data sent successfully",
            user:users
    });
};

module.exports.updateUser=async function updateUser(req,res){
    try{
        let datatobeupdated = req.body;
    // let user = await userModel.updateOne({email:'sdfsd@lol.com'},datatobeupdated)

    let user = await userModel.findOneAndUpdate({email:'tetstl@ol.com'},datatobeupdated)

    res.json({
            message:"data updated successfully",
            data:user
    });
    }
    catch(error){
        res.status(400).json({ error: 'Something Went Wrong' });
    }
};

module.exports.deleteUser=async function deleteUser(req,res){
    let user = await userModel.findOneAndDelete({email:'tets2sss@ol.com'})
    // users={}
    res.json({
        message:"Data is deleated",
    });
};

module.exports.getUsersbyid=async function getUsersbyid(req, res) {
    const paramId = req.params.id;
    try{
        const user = await userModel.findById(paramId);
        if (!user){
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'Data received',
            data: user,
          });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
};

// function setCookies(req,res){
//         res.cookie('isLoggedIn',false,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
//         res.cookie('isPrime',true);
      
//         res.send('cookies has been set');
//       }
      
// function getCookies(req,res){
//         let cookies = req.cookies.isLoggedIn;
//         console.log(cookies);
//         res.send('cookie recived')
//       }
      