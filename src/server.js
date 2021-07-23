// Incluindo o express e os arquivos de rota
const express = require('express')
const route = require('./route')
const path = require('path')

// Iniciando o servidor
const server = express()
server.set('view engine', 'ejs')

// Configuração do servidor para utilizar a pasta 'public'
server.use(express.static("public"))

// .../nlw_together/src/views
server.set('views', path.join(__dirname, 'views'))

// Indicando o uso da rota para o node
server.use(route)

// Determinando a porta de início do projeto
server.listen(3000, ()=> console.log("Rodando"))

