module.exports = function(app, express){ // exporta a configuração para o app

  var config = this;

  // Configuração trazendo as views e configurando tudo
  app.configure(function(){ 
    app.set('views', __dirname + '/../cliente/views');
    app.set('view engine', 'jade');
    app.set('view options', {
      layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride()); // permite roteamentos diferentes
    app.use(express.static(__dirname + '/../cliente/public'));
    app.use(app.router);
  });

  return config;

};