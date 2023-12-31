const slugify = require('slugify');
const userModel = require('../models/userModels');
const projectModel = require('../models/projectModel');
const { default: mongoose } = require('mongoose');
exports.cteareProjectController=async(req,res)=>{
    try {
        const {logo,title,description,lable,github,language,skills,guide,mentor} = req.body;

        if(!logo || !title || !description || !lable || !github || !language || !skills || !guide || !status || !mentor){
            res.status(500).send({
                success:false,
                massage:'All fields are required'
            });
        }
        const existingMentor = await userModel.findById(mentor);
        if(!existingMentor){
            res.status(401).send({
                success:false,
                massage:'Unable to find user'
            });
        }
        const newProject = await projectModel({logo,title,slug:slugify(title),description,lable,github,language,skills,guide,status,mentor});
        await newProject.save();
        res.status(200).send({
            success:true,
            massage:'Project Created Successfully',
            newProject
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Error in Create Project',
            error
        })
    }
}

exports.getProjectController= async(req,res)=>{
    try {
        const projects = await projectModel.find({}).populate('mentor');
        res.status(200).send({
            success:true,
            massage:'Project get Successfully',
            projects
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Error in getting Project',
            error
        })
    }
}
exports.getSingleProject=async(req,res)=>{
    try {
        const {slug} = req.params
        const projects = await projectModel.findOne({slug}).populate('mentor');
        res.status(200).send({
            success:true,
            massage:'Project Find Successfully',
            projects
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Error in getting Project',
            error
        })
    }
}
exports.deleteSingleProjectController = async(req,res)=>{
    try {
        const {id} = req.params
        const projects = await projectModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            massage:'Project Deleted Successfully',
            projects
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Error in Deleting Project Project',
            error
        })
    }
}
exports.updateProjectController= async(req,res)=>{
    try {
        const {id} = req.params;
        const {logo,title,description,lable,github,language,skills,guide,mentor}= req.body
        const projects = await projectModel.findByIdAndUpdate(id,{logo,title,slug:slugify(title),description,lable,github,language,skills,guide,status,mentor});
        await projects.save();
        res.status(200).send({
            success:true,
            massage:'Project Updated Successfully',
            projects
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Something went wrong!!',
            error
        })
    }
}
exports.requestUserCountController= async(req,res)=>{
    try {
        const {id} = req.params;
        const projects = await projectModel.findById(id);
        const count = projects.users.length;
        res.status(200).send({
            success:true,
            massage:'Project user count successfully',
            count
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Something Went wrong!!',
            error
        })
    }
}
exports.userGroupController= async(req,res)=>{
    try {
        const {slug} = req.params;
        const project = await projectModel.findOne({slug}).populate("users");
        res.status(200).send({
            success:true,
            massage:'Get user project successfully',
            project
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Something went wrong!!',
            error
        })
    }
}
