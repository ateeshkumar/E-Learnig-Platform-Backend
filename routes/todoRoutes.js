const express = require('express');
const { 
    createTodoController, 
    createTodoTaskController, 
    getTodoController, 
    getTodoSingleController, 
    getTodoUsercontroller,
    deleteTodocontroller,
    deleteTaskTodoController,
    updateTodoTaskController
} = require('../controller/todoController');
const { requestSignIn } = require('../middleware/authMiddleware');

const route = express.Router();

route.post('/create-todo/:id',requestSignIn,createTodoController)
route.post('/create-todo/task/:slug',requestSignIn,createTodoTaskController);
route.get('/get-todo',requestSignIn,getTodoController)
route.get('/get-todo/:slug',requestSignIn,getTodoSingleController);
route.get('/get-todo/user/:id',requestSignIn,getTodoUsercontroller);
route.delete('/delete-todo/:userId/:id',requestSignIn,deleteTodocontroller);
route.delete('/delete-todo/task/:taskId/:id',requestSignIn,deleteTaskTodoController);
route.put('/update-todo/:id',requestSignIn,updateTodoTaskController);
module.exports = route;