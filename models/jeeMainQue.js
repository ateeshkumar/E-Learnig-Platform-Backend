const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is requred'],
    },
    description:[{
        type:mongoose.Types.ObjectId,
        ref:"JeeMainDes",
    }],
});

const JeeMainModel = mongoose.model('JeeMain',contentSchema);
module.exports = JeeMainModel;