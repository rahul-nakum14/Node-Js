const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    isPrivate: {
        type: Boolean,
        default: false  // Default to public if not specified
    }
}, { timestamps: true });

module.exports = mongoose.model('blogModel',blogSchema);
