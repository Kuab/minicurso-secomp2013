var express = require('express'); // recupera o modulo express
var app = express(); // cria uma aplicação express

app.get('/hello', function(req, res){ // indica o que fazer quando entrar com a url
  res.end('<title>Ola minicurso</title>');
});
app.get('/hello/novo', function(req, res){
  res.end('Ola minicurso novo');
});

app.listen(3000);
console.log('Ouvindo na porta 3000');