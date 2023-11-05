const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
    },
    description:[
        {
        type:mongoose.Types.ObjectId,
        ref:"HtmlDescription",
        }
    ],
});

const htmlModel = mongoose.model('Html',contentSchema);
module.exports = htmlModel;