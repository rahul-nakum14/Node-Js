const blogModel = require('../models/blog');
const multer  = require('multer')
const path = require('path');


const addBlog_get = (req, res) =>{
    res.render('addBlog', {
        user: req.user
    });
}

const list_blogs = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id).populate('createdBy');
        console.log(blog);
        return res.render('blog', {
            user: req.user,
            blog
        });
    } catch (error) {
        // Handle errors, log them, or render an error page
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/upload'));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  });

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .png, .jpg and .jpeg files are allowed!'), false); // Reject the file
    }
};

const upload = multer({ 
    storage: storage ,
    fileFilter: fileFilter
});

//Works

const addBlog_post = async (req, res) => {
    // If you want to handle the file uploaded using multer:
    upload.single('blogCoverImage')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ error: err.message });
        }

        // File upload was successful
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }

        try {
            const { blogTitle, blogBody } = req.body;

            const blog = new blogModel({
                title: blogTitle,
                body: blogBody,
                createdBy: req.user._id,
                coverImageUrl: `/upload/${req.file.filename}`
            });

            const result = await blog.save();
            return res.redirect(`/blog/${blog._id}`);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};



module.exports = {
    addBlog_get,
    addBlog_post,
    list_blogs
}
//Custom Promises
// const addBlog_post = async(req,res) =>{

//     const uploadfilepromises = () =>{
//         return new Promise((resolve,reject) =>{
//             upload.single('blogCoverImage')(req,res,(err) =>{
//                 if (err instanceof multer.MulterError) {
//                     reject(err);
//                 } else if (err) {
//                     reject(err);
//                 }else{
//                     if (!req.file) {
//                         reject(new Error('Please upload a file'));
//                     } else {
//                         resolve(req.file);
//                     }
//                 }
//             })
//         })
//     };
//     try {

//         const handlePromise = await uploadfilepromises();
//         const { blogTitle, blogBody } = req.body;

//         const blog = new blogModel({
//             title: blogTitle,
//             body: blogBody,
//             createdBy: req.user._id,
//             coverImageUrl: `/upload/${handlePromise.filename}`
//         });

//         const result = await blog.save();
//         return res.redirect('/');

//     }catch(error){
//         if (error instanceof multer.MulterError) {
//             return res.status(500).json({ error: error.message });
//         } else {
//             return res.status(500).json({ error: error.message });
//         }
//     }

// }



// With promisify service works
// const { promisify } = require('util');
// const uploadPromise = promisify(upload.single('blogCoverImage'));

// const addBlog_post = async (req, res) => {
//     try {
//         const uploadResult = await uploadPromise(req, res);

//         if (!req.file) {
//             return res.status(400).json({ error: 'Please upload a file' });
//         }

//         const { blogTitle, blogBody } = req.body;

//         const blog = new blogModel({
//             title: blogTitle,
//             body: blogBody,
//             createdBy: req.user._id,
//             coverImageUrl: `/upload/${req.file.filename}`
//         });

//         const result = await blog.save();
//         return res.redirect('/');
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

