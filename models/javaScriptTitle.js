const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
    },
    slug:{
        type:String,
        required:[true,'Slug is Required']
    },
    description:[
        {
        type:mongoose.Types.ObjectId,
        ref:"JavaScriptContent",
        }
    ],
});

const htmlModel = mongoose.model('JavaScript',contentSchema);
module.exports = htmlModel;