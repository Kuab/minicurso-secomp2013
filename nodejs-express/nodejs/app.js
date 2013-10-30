var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Ola minicurso\n');
}).listen(8124);

console.log('Servidor rodando em http://localhost:8124/');
console.log('Essa é uma inicialização de servidor, utilizando NodeJS');
console.log('Nesse caso ainda, há pouca segurança nessa inicialização');
console.log('Ataques maliciosos podem facilmente ocorrer, por isso utilizamos o Express');