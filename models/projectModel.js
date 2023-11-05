const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    logo:{
        type:String,
        required:[true,'Logo is Required']
    },
    title:{
        type:String,
        required:[true,'Title is Required']
    },
    slug:{
        type:String,
        required:[true,'slug is Required']
    },
    description:{
        type:String,
        required:[true,'Description is Required']
    },
    lable:{
        type:String,
        required:[true,'Lable is Required']
    },
    github:{
        type:String,
        required:[true,'Github is required']
    },
    language:{
        type:String,
        required:[true,'language is Required']
    },
    skills:{
        type:String,
        required:[true,'Skills is Required']
    },
    guide:{
        type:String,
        required:[true,'Skills is Required']
    },
    mentor:{
        type:mongoose.ObjectId,
        ref:'User',
        required:[true,'mentor is required']
    }
},{timestamps:true});
const projectModel = mongoose.model('Project',projectSchema);
module.exports = projectModel;