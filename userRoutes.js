const express = require('express');
const userController = require('./userController')
const authController = require('./authController');
const Router = express.Router();

Router.post('/signup', authController.signUp);

Router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

Router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = Router;