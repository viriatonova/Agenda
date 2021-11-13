const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');


// Routes home
route.get('/', homeController.index);

// Routes Login
route.get('/login', loginController.index);
route.post('/login', loginController.handleLogin);
route.post('/login/user', loginController.login);
route.get('/login/logout', loginController.logout);

// Routes Register
route.get('/register', registerController.index);
route.post('/register', registerController.handleRegister);

module.exports = route; 
