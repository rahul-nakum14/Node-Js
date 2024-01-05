const express = require('express');
const path = require('path');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));or
app.set('views', path.resolve("./views"));


app.get('/',(req,res) =>{
    return res.render('homepage')
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()} - ${file.originalname}`)
    }
  })
  

  //For the file filter function allow certain type

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true); // Accept the file
//     } else {
//         cb(new Error('Only .png, .jpg and .jpeg files are allowed!'), false); // Reject the file
//     }
// };

// // Set up Multer with storage and file filter
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
// });




// For Single File
const upload = multer({ storage: storage })

app.post('/upload', upload.single('profileImage'),(req,res) =>{
        console.log(req.body);
        console.log(req.file);
        return res.redirect("/");
})

//For multiple File

// const upload = multer({
//     storage: storage,
// }).fields([{ name: 'profileImage', maxCount: 3 }]);

// app.post('/upload', upload,(req,res) =>{
//         console.log(req.body);
//         console.log(req.file);
//         return res.redirect("/");
// })

app.listen(5000,(req,res) =>{
    console.log('server started');
})