const express = require('express');
const cookieParser = require('cookie-parser'); 

const app = express();

const {connectionDb} = require('./db/connect');
const {checkForAuthentication,restrictTo}  = require('./middlewares/auth_token');

const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');
const adminRouter = require('./routes/adminRouter');


app.use(express.json());
app.use(cookieParser()); 

app.use('/users',userRouter);
app.use('/notes',checkForAuthentication,restrictTo(["NORMAL"]),noteRouter);
app.use('/admin/notes',checkForAuthentication,restrictTo(["ADMIN"]),adminRouter);


const startApp = async() =>{
    try {
        await connectionDb();
        app.listen(5000);
        console.log('Db and Server Started');
    }
    catch(error){
        console.log('Something Went Wrong123',error);
    }
}
startApp ()