const express = require('express');
const {cteareProjectController, getProjectController, getSingleProject, deleteSingleProjectController, updateProjectController} = require('../controller/projectController');
const { requestSignIn, adminAccess } = require('../middleware/authMiddleware');

const route = express.Router();

route.post('/create-project',requestSignIn,adminAccess,cteareProjectController);
route.get('/get-project',getProjectController);
route.get('/get-project/:slug',getSingleProject);
route.delete('/delete-project/:id',requestSignIn,adminAccess,deleteSingleProjectController);
route.put('/update-project/:id',requestSignIn,adminAccess,updateProjectController);

module.exports = route;