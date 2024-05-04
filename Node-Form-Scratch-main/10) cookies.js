const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.listen(3000);

const userRouter = express.Router();

app.use('/user',userRouter);

userRouter
.route('/getcookies')
.get(getcookies)

userRouter
.route('/setcookies')
.get(setcookies)

function setcookies(req,res) {
    res.cookie('isLoggedIn',false,{maxAge:1000*60*60,secure:true,httpOnly:true});
    res.send('Cookies Has been sent');
}

function getcookies(req,res) {
    let cookies = req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('Cookie Received');
}
