const mongoose = require('mongoose');

const htmlDesSchema = new mongoose.Schema({
    subtitle:{
        type:String,
        required:[true,'Title is required'],
    },
    subdescription:{
        type:String,
        required:[true,'Description is requred']
    },
    code:{
        type:String
    },
    content:{
        type:mongoose.Types.ObjectId,
        ref:"Html",
        required:[true,"Content are Required"],
    }
});

const htmlDesModel = mongoose.model('HtmlDescription',htmlDesSchema);
module.exports = htmlDesModel;