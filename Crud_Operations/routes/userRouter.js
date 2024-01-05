const express = require('express');
const {signup,signin} = require('../controllers/userController');
const {checkForAuthentication}  = require('../middlewares/auth_token');

const userRouter = express.Router();

// userRouter.post('/signin',signin);
userRouter.post('/signup',signup);
userRouter.post('/signin',checkForAuthentication,signin);


module.exports = userRouter;
