const express = require('express');
const userRouter = express.Router();
const protectRouteUser = require('./authHelper');
const {getUsers,postUser,updateUser,deleteUser,getUsersbyid}=require('../controller/userController');

userRouter
.route('/')
.get(protectRouteUser,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/setCookies')
.get(setCookies)

userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/:id')
.get(getUsersbyid);


module.exports = userRouter;