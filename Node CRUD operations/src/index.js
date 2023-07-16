const express = require('express');
const app = express();
const userRouters = require('./routes/userRoutes');
const nodeRouter = require('./routes/noteRoutes');

const mongoose = require('mongoose');

app.use(express.json());

app.use((req,res,next)=>{
    // console.log(req.method, " " ,req.url);
    next();
})

app.use("/users",userRouters);
app.use("/notes",nodeRouter);

mongoose.connect('mongodb+srv://hanonymous371:A6s35aWYckJi7BbH@cluster0.qdzm9g4.mongodb.net/')
.then(()=>{
    app.listen(5000,()=>{
        console.log('server started at 5000');
    });
})
.catch((error)=>{
    console.log('Error, Somethong Went Wrong');
})




