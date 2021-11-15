const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/default')


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

// Rotas Contato
route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/:id', loginRequired, contatoController.editContato);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route; 
