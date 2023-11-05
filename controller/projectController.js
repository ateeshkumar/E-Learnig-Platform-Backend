const slugify = require('slugify');
const userModel = require('../models/userModels');
const projectModel = require('../models/projectModel');
exports.cteareProjectController=async(req,res)=>{
    try {
        const {logo,title,description,lable,github,language,skills,guide,mentor} = req.body;

        if(!logo || !title || !description || !lable || !github || !language || !skills || !guide || !mentor){
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
        const newProject = await projectModel({logo,title,slug:slugify(title),description,lable,github,language,skills,guide,mentor});
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