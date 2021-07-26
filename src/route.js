const express = require('express')
const QuestionController = require('./controllers/QuestionController')

// Define a const como uma variável de rota
const route = express.Router();

// Cria as rotas para os arquivos da página
route.get('/', (req, res)=> res.render('index'))
route.get('/room', (req, res)=> res.render('room'))
route.get('/create-room', (req, res)=> res.render('create-room'))
// Rota para realizar as ações dentro da room e formato que o formulário de dentro da modal tem que passar a informação da sala
route.post('/room/:room/:question/:action', QuestionController.index)

// Exporta a const para poder acessar nos outros arquivos
module.exports = route