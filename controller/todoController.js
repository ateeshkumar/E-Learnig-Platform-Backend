const slugyfy = require('slugify');
const todoTaskModel = require('../models/todoTaskModel');
const userModel = require('../models/userModels');
const mongoose = require('mongoose');
const todoContentModel = require('../models/todoTaskContentModel');
exports.createTodoController=async(req,res)=>{
    try {
        const {id} = req.params;
        const {taskname}= req.body;
        if(!taskname){
            return res.status(403).send({
                success:false,
                massage:'Task Name is required',
            });
        }
        const existuser = await userModel.findById(id);

        const task = await todoTaskModel({taskname,slug:slugyfy(taskname)});
        const session = await mongoose.startSession();
        session.startTransaction();
        await task.save({session});
        existuser.todo.push(task);
        await existuser.save({session});
        await session.commitTransaction();
        await task.save();
        return res.status(200).send({
            success:true,
            massage:'Task Created Succesfully',
            task
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:'Error in Create To-Do',
            error
        })
    }
}
exports.createTodoTaskController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const {task} = req.body;
        if(!task){
            res.status(403).send({
                success:false,
                massage:'Inpute field is required',
            });
        }
        const existTask = await todoTaskModel.findOne({slug});
        if(!existTask){
            res.status(401).send({
                success:false,
                massage:'Task is Not Found',
            })
        }
        const taskContent = await todoContentModel({task,slug:slugyfy(task)});
        
        const session = await mongoose.startSession();
        session.startTransaction();
        await taskContent.save({session});
        existTask.taskdetails.push(taskContent);
        await existTask.save({session});
        await session.commitTransaction();
        await taskContent.save();
        return res.status(200).send({
            success:true,
            massage:'Task Created Succesfully',
            taskContent
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:'Error in Create To-Do',
            error
        })
    }
}
exports.getTodoController = async(req,res)=>{
    try {
        const task = await todoTaskModel.find({});
        return res.status(200).send({
            massage:'All task getting successfully',
            success:true,
            task
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            massage:"Error in geting data",
            error
        })
    }
}
exports.getTodoSingleController = async(req,res)=>{
     try {
        const {slug}= req.params;
        const task = await todoTaskModel.findOne({slug});
        return res.status(200).send({
            massage:'Task getting successfully',
            success:true,
            task
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            massage:"Error in geting data",
            error
        })
    }
}
exports.getTodoUsercontroller= async(req,res)=>{
    try {
        const {id}= req.params;
        const task = await userModel.findById(id).populate('todo').sort({createdAt:-1});
        return res.status(200).send({
            massage:'Task getting successfully',
            success:true,
            task
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            massage:"Error in geting data",
            error
        })
    }
}
exports.deleteTodocontroller=async(req,res)=>{
    try {
        const {userId,id} = req.params;
        const existuser = await userModel.findById(userId).populate('todo');
        const task = await todoTaskModel.findById(id).populate("taskdetails");
        task?.taskdetails?.map(async(item)=>{
            await todoContentModel.findByIdAndDelete(item._id);
        });
        
        existuser.todo.pull(task);
        await existuser.save();
        const deleteTask = await todoTaskModel.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            massage:'Task Deleted Successfully',
            deleteTask
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            massage:"Error in geting data",
            error
        })
    }
}
exports.deleteTaskTodoController= async(req,res)=>{
    try {
        const {taskId,id} = req.params;
        const taskContent = await todoContentModel.findById(id);
        const task = await todoTaskModel.findById(taskId).populate('taskdetails');

        task.taskdetails.pull(taskContent);
        await task.save();
        await todoContentModel.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            massage:'Task Deleted Successfully',
            taskContent
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            massage:"Error in geting data",
            error
        })
    }
}
exports.updateTodoTaskController= async(req,res)=>{
    try {
        const {id} = req.params;
        const {task,status} = req.body;
        if(!task || !status){
            return res.status(403).send({
                success:false,
                massage:'All field are require',
            })
        }
        const taskContent = await todoContentModel.findByIdAndUpdate(id,{task,slug:slugyfy(task),status});
        await taskContent.save();
        return res.status(200).send({
            success:true,
            massage:'Successfully Updated',
            taskContent
        })
    } catch (error) {
        return res.status(200).send({
            success:false,
            massage:'Error in updating',
            error
        })
    }
}