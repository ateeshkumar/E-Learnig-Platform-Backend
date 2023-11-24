const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
exports.registerController= async(req,res)=>{
    try {
        const {name,email,phone,gender,college,password} = req.body;
        if(!name || !email || !password ||!phone || !gender){
            return res.status(400).send({
                success:false,
                massage:"All filed are required",
            })
        }
        const existingUser = await userModels.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                massage:"User Already Exist",
            })
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = new userModels({name,email,phone,gender,college,password:hashPassword});
        await user.save();
        return res.status(200).send({
            success:true,
            massage:"User Successfuly Registered",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            massage:'Error in registration',
            success:false,
            error
        })
    }

}

exports.loginController= async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).send({
                success:flase,
                massage:"All field required"
            });
        }
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(201).send({
                success:false,
                massage:"User is Not valid",
            })

        }
        const isMatched = await bcrypt.compare(password,user.password);
        const token =await jwt.sign({_id:user._id}, SECRET_KEY)
        if(!isMatched){
            return res.status(400).send({
                success:false,
                massage:"User is or passowrd is not currect",
            })
        }
        return res.status(200).send({
            success:true,
            massage:"Login Successfull",
            token,
            user

        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            massage:'Error in registration',
            success:false,
            error
        })
    }
    
}

exports.getAllUserController=async(req,res)=>{
    try {
        const users = await userModels.find({});
        res.status(200).send({
            success:true,
            massage:'User getting successfully',
            users
        })
    } catch (error) {
        return res.status(500).send({
            massage:'Error in getting user',
            success:false,
            error
        })
    }
}
exports.getSingleUserController=async(req,res)=>{
    try {
        const {id} = req.params;
        const users = await userModels.findById(id).populate('projects');
        res.status(200).send({
            success:true,
            massage:'User getting successfully',
            users
        })
    } catch (error) {
        return res.status(500).send({
            massage:'Error in getting user',
            success:false,
            error
        })
    }
}


exports.testController = async (req,res)=>{
    try {
        res.status(200).send({
            success:true,
            massage:'Test Controller',
        });
    } catch (error) {
        
    }
}

