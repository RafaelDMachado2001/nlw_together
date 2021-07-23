const express = require('express');

// Define a const como uma variável de rota
const route = express.Router();

// Cria as rotas para os arquivos HTML/EJS da página
route.get('/', (req, res)=> res.render('index'))
route.get('/room', (req, res)=> res.render('room'))
route.get('/create-room', (req, res)=> res.render('create-room'))

// Exporta a const para poder acessar nos outros arquivos
module.exports = route