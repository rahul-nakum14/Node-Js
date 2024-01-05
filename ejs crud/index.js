const express = require('express');
const path = require('path');
const blogRouter = require('./routers/blogRouter');
const app = express();
const {db_connection} = require('./DB/db_connection');

app.set('view engine', 'ejs');
app.set(path.resolve('views'));

app.use(express.static(path.resolve('./uploads')));
app.use(express.urlencoded({ extended: true }));

app.get('/home',(req,res) =>{
    res.render('home');
});

app.use('/',blogRouter);

const startApp = async() =>{
    try {
        await db_connection();
        app.listen(5000);
        console.log('Db and Server Started');
    }
    catch(error){
        console.log('Something Went Wrong123',error);
    }
}
startApp()