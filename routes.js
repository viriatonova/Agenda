const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');


// pagina inicial
route.get('/', homeController.paginaInicial);
route.post('/', homeController.handlePost);

// contatos
route.get('/contato', contatoController.inicial);

module.exports = route; 
