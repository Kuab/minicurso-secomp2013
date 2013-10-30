var express = require('express') //recupera modulo express (arquivo javascript express.js). require é uma função nodejs
  , app = express() // inicia a aplicação express
  , http = require('http') // recupera o modulo http
  , server = http.createServer(app) // cria um servidor, passando como parâmetros configurações de como 'ouvir'
  , routes = require('./servidor/routes') // modulo index da pagina Routes
  , socket = require('./servidor/socket') // modulo socket e suas funcionalidades
  , io = require('socket.io').listen(server); // socketio, começa ouvir o que vem do servidor

// Configuração
var config = require('./servidor/config')(app, express); // recupera uma referẽncia para o modulo de configuração criado, passando a aplicação (app) e o express como parâmetro

// Routes
app.get('/', routes.index); // raiz da url manda renderizar página index.jade

app.get('*', routes.index); // redireciona todas as rotinas para o index

io.sockets.on('connection', socket); // inicia uma comunicação com o socket.io

var port = 3001; // porta aonde será ouvida

server.listen(port); // servidor começa ouvir o que vem da porta 3001
console.log('Linsten on port ' + port);