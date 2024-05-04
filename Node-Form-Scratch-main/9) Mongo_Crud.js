const express = require('express')
const mongoose = require('mongoose');
const UserModel = require('./Models/userSchema');

const app = express();

app.use(express.json());

app.listen(3000);

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUsers)
.patch(updateUsers)
.delete(deleteUsers)

// userRouter
// .route('/:id')
// .get(getUsersbyid)

// authRouter
// .route('/signup')
// .get(getsignup)
// .post(postsignup)

const db_link = 'mongodb+srv://hanonymous371:A6s35aWYckJi7BbH@cluster0.qdzm9g4.mongodb.net/'

mongoose.connect(db_link)
.then(function db() {
    console.log('DB connected');
})
.catch(function (err) {
    console.log(err);
})

async function getUsers(req,res){
    let all_users = await UserModel.find(); // Retrive all user  "name": "test"
    // let all_users = await UserModel.find({ name: "test"}); // Retrive Specific User 
    res.json({message:'List of all user',data:all_users});
};

async function postUsers(req,res){
    let obj = req.body // Retrive Specific User 
    let user = await UserModel.create(obj);
    res.json({message:'User Signup',data:user});
};

async function updateUsers(req,res){
    let datatobeupdated = req.body // Retrive Specific User 
    let user = await UserModel.findOneAndUpdate({email:"postsignup@gmail.com"},datatobeupdated);
    res.json({message:'User Updated Successfully'});
};

async function deleteUsers(req,res){
    let datatobeupdated = req.body // Retrive Specific User 
    let user = await UserModel.findOneAndDelete(datatobeupdated);
    res.json({message:'User Deleted Successfully'});
};

