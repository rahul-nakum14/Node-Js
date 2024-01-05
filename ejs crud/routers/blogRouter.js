const { Router } = require('express');
const blogRouter = Router();
const {createBlog,getAllBlogs,createBlog_get} = require('../controllers/blogController');

blogRouter.get('/blogs',getAllBlogs);
blogRouter.get('/create-blog',createBlog_get);
blogRouter.post('/create-blog',createBlog);


module.exports = blogRouter;
