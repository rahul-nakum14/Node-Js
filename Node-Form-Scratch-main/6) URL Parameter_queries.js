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

app.get('/users/:id', function(req, res) {
    const userId = parseInt(req.params.id);
  
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            res.send(users[i]);
            return;
        }
    }

    res.status(404).send("User not found");
    // method 2

    // const user = users.find(user => user.id === userID);

    // if (user){
    //     res.send(user);
    // }
    // else{
    //     res.json({message:'Not Found'});
    // }   
});


    
