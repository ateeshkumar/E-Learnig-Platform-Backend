const mongoose = require('mongoose');

const htmlDesSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:[true,'Title is required'],
    },
    paragraph:{
        type:String,
        required:[true,'Description is requred']
    },
    code:{
        type:String
    },
    content:{
        type:mongoose.Types.ObjectId,
        ref:"JavaScript",
        required:[true,"Content are Required"],
    }
});
const htmlDesModel = mongoose.model('JavaScriptContent',htmlDesSchema);
module.exports = htmlDesModel;