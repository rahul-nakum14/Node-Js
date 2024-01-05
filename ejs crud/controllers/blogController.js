const multer = require('multer');
const fs = require('fs');
const path = require('path');
const blogModel = require('../models/blogModel'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null,
   
  `${Date.now()} - ${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage }).array('images'); // Allow multiple images
  
  const createBlog = async (req, res) => {
    try {
     await upload(req, res, async (err) => {
      if (err) {
       console.error(err);
       return res.status(400).send('Error uploading images');
      }
    
      const data = req.body;
      const images = req.files.map(file => ({
       filename: file.filename,
       path: file.path,
       contentType: file.mimetype
      }));
    
      const blog = await blogModel.create({
       title: data.title,
       description: data.description,
       images: images
      });
    
      res.redirect('/blogs');
     });
    } catch (err) {
     console.error(err);
     res.status(500).send('Error creating blog entry');
    }
   };
  

   const getAllBlogs = async (req, res) => {
    try {
      const blogs = await blogModel.find({}); 
  
      const blogsWithImages = blogs.map(blog => {
        const imagesWithUrls = blog.images.map(image => ({
          ...image.toObject(),
          imageUrl: `/images/${blog._id}/${image.filename}`
        }));
  
        return { ...blog.toObject(), images: imagesWithUrls };
      });
  
      res.render('blogs', { blogs: blogsWithImages });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching blogs');
    }
  };


const createBlog_get = async (req,res) =>{
    res.render('createBlog');
}

module.exports = {
    createBlog,
    getAllBlogs,
    createBlog_get
};
