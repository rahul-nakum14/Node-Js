const blogModel = require("../models/blog");
const commentModel = require("../models/comment");
const multer = require("multer");
const path = require("path");

const addBlog_get = (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
};

// const list_blogs = async (req, res) => {

//     try {
//         const blog = await blogModel.findById(req.params.id).populate('createdBy');
//         const comments = await commentModel.find({blogId: req.params.id }).populate(
//             "createdBy"
//           );

//         console.log(comments);
//         return res.render('blog', {
//             user: req.user,
//             blog,
//             comments
//         });
//     } catch (error) {
//         // Handle errors, log them, or render an error page
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// Modify the route handling logic in blog.js

const list_blogs = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId).populate("createdBy");

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    if (blog.isPrivate && (!req.user || !blog.createdBy.equals(req.user._id))) {
      return res.status(403).send("Unauthorized");
    }
    res.render("blog", { blog, comments: [], locals: { user: req.user } });
    // res.render("blog", { blog, user: req.user });
    // res.render('blog', { blog, user: req.user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/upload"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .png, .jpg and .jpeg files are allowed!"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//Works

const addBlog_post = async (req, res) => {
  upload.single("blogCoverImage")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    try {
      const { blogTitle, blogBody, privatePost } = req.body;

      const blog = new blogModel({
        title: blogTitle,
        body: blogBody,
        createdBy: req.user._id,
        coverImageUrl: `/upload/${req.file.filename}`,
        isPrivate: privatePost === "on",
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
  list_blogs,
};
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
