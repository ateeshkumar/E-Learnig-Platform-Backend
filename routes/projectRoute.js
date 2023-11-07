const express = require('express');
const {cteareProjectController, getProjectController, getSingleProject, deleteSingleProjectController, updateProjectController, requestUserCountController, userGroupController} = require('../controller/projectController');
const { requestSignIn, adminAccess } = require('../middleware/authMiddleware');
const { userGroupJoinRequestController } = require('../controller/groupJoinController');

const route = express.Router();

route.post('/create-project',requestSignIn,adminAccess,cteareProjectController);
route.get('/get-project',getProjectController);
route.get('/get-project/:slug',getSingleProject);
route.delete('/delete-project/:id',requestSignIn,adminAccess,deleteSingleProjectController);
route.put('/update-project/:id',requestSignIn,adminAccess,updateProjectController);
route.get('/request-user-count/:id',requestUserCountController);
route.post('/request-join/:id',userGroupJoinRequestController)
route.get('/project-group/:slug',requestSignIn,userGroupController);
module.exports = route;
