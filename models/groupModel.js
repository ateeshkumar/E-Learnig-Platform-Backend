const { default: mongoose } = require("mongoose");

const groupModelSchema = new mongoose.Schema({
    project:{
        type:mongoose.ObjectId,
        ref:'Project'
    },
    user:{
        type:mongoose.ObjectId,
        ref:'User'
    }
},{timestamps:true});
const groupModel = mongoose.model('Group',groupModelSchema);
module.exports = groupModel