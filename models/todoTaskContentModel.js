const mongoose = require('mongoose');
const toDoContentSchema = new mongoose.Schema({
    task:{
        type:String,
        required:[true,'Task is required']
    },
    slug:{
        type:String,
        required:[true,'slug is required']
    },
    status:{
        type:String,
        default:'Running',
    }
},{timestamps:true});
const todoContentModel = mongoose.model('TodoTask',toDoContentSchema);
module.exports = todoContentModel;