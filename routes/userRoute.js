const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/create-user',userController.registerUser);
Router.get('/get-user/:email',userController.getUser);
Router.patch('/update-user',userController.updateUser);
Router.delete('/delete-user/:email',userController.deleteUser);

module.exports = Router;