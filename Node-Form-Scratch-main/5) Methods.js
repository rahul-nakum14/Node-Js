const express = require('express');
const app = express();
app.use(express.json());

app.listen(5000);

let users = {}

app.get('/users',(req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    users = req.body;
    res.json({
            message:"data sent successfully",
            user:req.body
    });
});

app.patch('/users', (req, res) => {

    let datatobeupdated = req.body;

    for (key in datatobeupdated){
        users[key] = datatobeupdated[key];
    }
    res.json({
            message: "Data updated successfully",
            user: req.body
        });
    // const datatobeupdated = req.body;
    // users = { ...users, ...datatobeupdated };

    // res.json({
    //     message: "Data updated successfully",
    //     user: req.body
    // });
});

app.delete('/users',(req,res)=>{
    users={}
    res.json({
        message:"Data is deleated",
       
    });
});

// app.post('/quotes', (req, res) => {
//     const data = JSON.stringify(req.body);

//     //method 1
//     // fs.writeFileSync('./views/quotes.json', data);

//     //method 2
//     fs.writeFile('./views/quotes.json', data, (err) => {
//       if (err) {
//         console.error('Error writing to quotes file:', err);
//         res.sendStatus(500);
//       } else {
//         console.log('Data has been written to file successfully.');
//         res.sendStatus(200);
//       }
//     });
//   });

// app.patch('/quotes', (req, res) => {
//     const data = JSON.stringify(req.body);
  
//     fs.writeFile('./views/quotes.json', data, (err) => {
//         if (err) {
//           console.error('Error writing to quotes file:', err);
//           res.sendStatus(500);
//         } else {
//           console.log('Data has been written to file successfully.');
//           res.sendStatus(200);
//         }
//       });
//   });



  
  