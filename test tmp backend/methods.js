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
.get(getUsersbyid);
// app.get('/users',(req,res)=>{
//     console.log(req.query);
//     res.send(users);
// })

// app.post('/users',(req,res)=>{
//     users = req.body;
//     res.json({
//             message:"data sent successfully",
//             user:req.body
//     });
// })

// app.patch('/users', (req, res) => {
//     const datatobeupdated = req.body;
//     users = { ...users, ...datatobeupdated };

//     res.json({
//         message: "Data updated successfully",
//         user: req.body
//     });
// });

// app.delete('/users',(req,res)=>{
//     users={}
//     res.json({
//         message:"Data is deleated",
       
//     });
// });

//by id 
// app.get('/users/:Name',(req,res)=>{
//     console.log(req.params);
//     console.log(req.params.Name);
//     res.send("name is"+ req.params.Name);
// })

// app.patch('/users',(req,res)=>{
//     console.log('req,body -->',req.body);

//     let datatobeupdated = req.body;

//     for (key in datatobeupdated){
//         users[key] = datatobeupdated[key]
//     }
//     res.json({
//         message:"data updated successfully",
//         user:req.body
// })
// });

function getUsers(req,res){
    console.log(req.query);
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
    users = req.body;
    res.json({
            message:"data sent successfully",
            user:req.body
    });
};

function deleteUser(req,res){
    users={}
    res.json({
        message:"Data is deleated",
       
    });
};

function getUsersbyid(req, res) {
    console.log(req.params.id);
    const paramId = req.params.id;
  
    let obj = {};
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == paramId) {
        obj = users[i];
        break;
      }
    }
  
    res.send({
      message: "Data received",
      data: obj,
    });
  }
  