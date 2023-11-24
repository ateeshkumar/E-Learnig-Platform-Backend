const mongoose = require('mongoose');
const toDoSchema = new mongoose.Schema({
    taskname:{
        type:String,
        required:[true,'Task is required']
    },
    slug:{
        type:String,
        required:[true,'slug is required']
    },
    taskdetails:[{
        type:mongoose.ObjectId,
        ref:"TodoTask",
    }]
},{timestamps:true});
const todoModel = mongoose.model('Todo',toDoSchema);
module.exports = todoModel;