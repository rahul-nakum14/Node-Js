const {Router} = require('express');
const {signin_get,signup_get,signin_post,signup_post,user_logout} = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/signin',signin_get);
userRouter.get('/signup',signup_get);

userRouter.post('/signin',signin_post);
userRouter.post('/signup',signup_post);
userRouter.get('/logout', user_logout);

module.exports = userRouter;