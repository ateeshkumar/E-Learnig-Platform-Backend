const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
    },
    phone:{
        type:String,
        required:[true,'phone is Required'],
    },
    gender:{
        type:String,
        required:[true,'gender is Required'],
    },
    college:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'Password is Required'],
    },
    role:{
        type:Number,
        default:0,
    }
},{timeStamp:true});
const userModel = mongoose.model('User',userSchema);
module.exports = userModel;

