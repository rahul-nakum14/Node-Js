const commentModel = require('../models/comment');

const add_comment = async(req,res) =>{
    await commentModel.create({
        content : req.body.content,
        blogId: req.params.blogid,
        createdBy : req.user._id,
    })
    console.log(req.params.blogid);

    
    return res.redirect(`/blog/${req.params.blogid}`);
}
module.exports = {add_comment}