const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
     type: String,
     required: true
    },
    description: {
     type: String,
     required: true
    },
    images: [{
     filename: String,
     path: String,
     contentType: String
    }],
   }, {
    timestamps: true,
    collection: 'blogs'
   });
   
module.exports = mongoose.model('blogModel', blogSchema);
