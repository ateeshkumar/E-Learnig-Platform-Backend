const mongoose = require('mongoose');

const htmlDesSchema = new mongoose.Schema({
    heading:{
        type:String,
    },
    paragraph:{
        type:String,
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