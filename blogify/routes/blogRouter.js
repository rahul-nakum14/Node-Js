const { Router } = require('express');
const { addBlog_get, addBlog_post, list_blogs } = require('../controllers/blogController');

const blogRouter = Router();

blogRouter.get('/add-new', addBlog_get); // Specific route defined before the dynamic one
blogRouter.post('/add-new', addBlog_post);
blogRouter.get('/:id', list_blogs);

module.exports = blogRouter;
