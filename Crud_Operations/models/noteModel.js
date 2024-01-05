const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:({
        type:String,
        required: true
    }),
    description:({
        type:String,
    }),
    userID:({
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    })
},
{
    timestamps:true,
    collection:'crud_operations_model'
});

module.exports = mongoose.model('noteModel',noteSchema);