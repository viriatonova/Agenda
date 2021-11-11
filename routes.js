const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Rotas home
route.get('/', homeController.index);

// Rotas Login
route.get('/login', loginController.index);



module.exports = route; 
