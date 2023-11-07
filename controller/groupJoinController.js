const userModel = require("../models/userModels");
const projectModel = require("../models/projectModel");
const groupModel = require("../models/groupModel");
const { default: mongoose } = require("mongoose");

exports.userGroupJoinRequestController=async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body
        if(!userId){
            return res.status(400).send({
                success:false,
                massage:'User Id required'
            })
        }
        const project = await projectModel.findById(id);
        const user = await userModel.findById(userId);
        if(!project || !user){
            return res.status(400).send({
                success:false,
                massage:'Content does not exist'
            })
        } 
        const groupJoin = await groupModel({project:project,user:user});

        const session = await mongoose.startSession();
        session.startTransaction();
        await groupJoin.save({session});
        user.projects.push(project);
        project.users.push(user);
        await user.save({session});
        await project.save({session});
        await session.commitTransaction();
        await groupJoin.save();
        return res.status(200).send({
            success:true,
            massage:'User Requested Successfully',
            groupJoin
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Something went wrong!!',
            error
        })
    }
}