const { Router } = require('express');
const {add_comment} = require('../controllers/commentController');

const commentRouter = Router();
commentRouter.post('/:blogid', add_comment); 


module.exports = commentRouter;
