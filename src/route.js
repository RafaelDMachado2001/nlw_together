const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

// Define a const como uma variável de rota
const route = express.Router();

// Cria as rotas para os arquivos da página
route.get('/', (req, res)=> res.render("index", {page: 'enter-room'}))
route.get('/create-room', (req, res)=> res.render("index", {page: 'create-room'}))

route.get('/room/:room', (req, res)=> res.render('room'))
// Rota para realizar as ações dentro da room e formato que o formulário de dentro da modal tem que passar a informação da sala
route.post('/question/:room/:question/:action', QuestionController.index)
route.post('/create-pass', RoomController.create)

// Exporta a const para poder acessar nos outros arquivos
module.exports = route