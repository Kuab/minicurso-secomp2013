// Servidor: servidor.js
// Instanciando os módulos HTTP, FS (File System) e Socket.io.
var http = require('http').createServer(index)
  , io = require('socket.io').listen(http)
  , fs = require('fs');

// Configurando a porta de listen do servidor.
http.listen(8080);

// Método de requisição para apresentar a página index.html.
function index(req, res){
  var page = __dirname + '/index.html';
  fs.readFile(page, function(err, data){
    res.writeHead(200);
    res.end(data);  
  });
};
// Contador de visitas.
var visitas = 0;
// Iniciando o Socket.IO através do evento Connection.
io.sockets.on('connection', function(socket){
  // Evento message que ocorre quando entra um novo usuário.
  socket.on('message', function(){
    visitas++;
    // Servidor responde apenas para o usuário visitante.
    socket.emit('message', visitas);
    // Servidor responde o mesmo resultado via broadcast.
    socket.broadcast.emit('message', visitas);
  });
  // Evento disconnect, padrão do Socket.io 
  // Trata os dados quando alguém sai da página.
  socket.on('disconnect', function(){
    visitas--;
    // Resposta do servidor via broadcast.
    socket.broadcast.emit('message', visitas);
  });
});