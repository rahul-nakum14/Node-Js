const express = require('express')

const app = express();

app.use(express.json());

app.listen(3000);

let users = [
    {
        id:1,
        Name:"Abc"
    },
    {
        id:2,
        Name:"XYZ"
    },
    {
        id:3,
        Name:"DEF"
    },
]

const userRouter = express.Router();
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUsersbyid)

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
}
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
  }