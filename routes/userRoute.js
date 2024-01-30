const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../services/auth');

Router.post('/create-user', userController.registerUser);
Router.post('/login-user', userController.LoginUser);
Router.get('/get-user/:email', verifyToken, userController.getUser);
Router.patch('/update-user', verifyToken, userController.updateUser);
Router.delete('/delete-user/:email', verifyToken, userController.deleteUser);

module.exports = Router;