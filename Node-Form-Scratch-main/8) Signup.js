const express = require('express')
const mongoose = require('mongoose');


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
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUsersbyid)

authRouter
.route('/signup')
.get(getsignup)
.post(postsignup)

//Middleware Functions

function Middlewarefunc(req,res,next){
    console.log('Middleware Encountered');
    next();
}

function Middlewarefunc2(req,res,next){
    console.log('Middleware2 Encountered');
    next();
}

function getUsers(req,res){
    res.send(users);
};

function postUser(req,res){
    users = req.body;
    res.json({
            message:"data sent successfully",
            user:req.body
    });
};

function updateUser(req,res){
    let datatobeupdated = req.body;

    for (key in datatobeupdated){
        users[key] = datatobeupdated[key];
    }
    res.json({
            message: "Data updated successfully",
            user: req.body
        });
};

function deleteUser(req,res){
    users={}
    res.json({
        message:"Data is deleated",
       
    });
};

function getUsersbyid(req, res) {
    const userId = parseInt(req.params.id);
  
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            res.send(users[i]);
            return;
        }
    }
    res.status(404).send("User not found");
};

function getsignup(req,res,next){

    res.sendFile('./views/signup.html',{root:__dirname});
    next();
}

function postsignup(req,res){
    let obj= req.body;
    console.log(obj);
    res.json({message:'User Signup',data:obj});

}


//MongoDb Started

const db_link = 'mongodb+srv://hanonymous371:A6s35aWYckJi7BbH@cluster0.qdzm9g4.mongodb.net/'

mongoose.connect(db_link)
.then(function db() {
    console.log('DB connected');
})
.catch(function (err) {
    console.log(err);
})


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
        minLength: 8
    },
    confirmpassword:{
        type:String,
        required: true,
        minLength: 8
    }
})

const UserModel = mongoose.model('UserModel',userSchema);

(async function createUser(){
    let user={
        name:'test',
        email:'1234d@gmail.com',
        password:'123456789',
        confirmpassword:'123456789'
    }
    let data = await UserModel.create(user);
    console.log(data);
})();