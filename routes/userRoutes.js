const express = require('express');
const { registerController, loginController, testController, getAllUserController, getSingleUserController } = require('../controller/userController');
const { requestSignIn, adminAccess } = require('../middleware/authMiddleware');


const route = express.Router();

route.post('/register',registerController);
route.post('/login',loginController);
route.get('/test',requestSignIn,adminAccess,testController);
route.get('/all-user',requestSignIn,adminAccess,getAllUserController);
route.get('/all-user/:id',requestSignIn,getSingleUserController)

route.get('/user-auth',requestSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
route.get('/admin-auth',requestSignIn,adminAccess,(req,res)=>{
    res.status(200).send({ok:true});
})


module.exports = route
