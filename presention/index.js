const express = require("express");
const path = require('path');
const {connectDb} = require('./db/connect');
const userRouter = require('./routes/userRouter');
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/authentication");
const blogRouter = require("./routes/blogRouter");
const blogModel  = require('./models/blog');
const commentRouter = require("./routes/commentRouter");
const app = express();
const PORT = 5000;

app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(checkForAuthentication('token'))


app.set('view engine' , 'ejs');
app.set("views",path.resolve("./views"));

app.use('/users',userRouter);
app.use('/blog',blogRouter);
app.use('/comment',commentRouter);

app.get('/', async (req, res) => {
    try {
        const allBlogs = await blogModel.find({});
        res.render('home', {
            user: req.user,
            blogs: allBlogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const startApp = async() =>{
    try{
        await connectDb();
        app.listen(PORT);
        console.log('DB and Server Started');
    }catch(error){
        console.log('Error Occured While Starting Server And Db',error);
    }
}
startApp();

// app.listen(PORT, () =>{
//     console.log(`server started at ${PORT}`);
// })