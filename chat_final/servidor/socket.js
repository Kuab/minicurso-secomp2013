// Variável mantém uma lista de nomes de usuários que estão conectados, para que não haja duplicação
var userNames = (function () {
  var names = {}; // lista de nomes

  var claim = function (name) { // verifica se já existe nome na lista, se existir retorna false, senão adiciona o nome na lista
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  var getGuestName = function () { // recuperar o menor 'guest' utilizado
    var name,
      nextUserId = 1;

    do {
      name = 'Guest' + nextUserId;
      nextUserId += 1;
    } while (!claim(name)); // enquanto existir Guest n na lista, vai iterando

    return name; // retorna o mínimo Guest possível
  };

  var get = function () { // serializa os nomes utilizados (online) em um array
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) { // exclui um nome da lista
    if (names[name]) {
      delete names[name];
    }
  };

  return { // retorno com final '()' para indicar que pode ser utilizar como uma função
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

// exporta a função para o listening server.
module.exports = function (socket) { // aqui, é uma funcionalidade do nodejs. você vai exportar a função para quem fez uma chamada require()
  var name = userNames.getGuestName(); // recupera o nome do próximo Guest para o usuário que está entrando no chat

  // notifica que você iniciou uma sessão no chat
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  // notifica os outros usuários que um novo usuário entrou
  socket.broadcast.emit('user:join', {
    name: name
  });


  // envio broadcast de mensagem para outros usuários conectados
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  // valida a troca do nome do usuário, e caso positivo envia o novo nome para todos os outros usuários
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;
      
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // limpa quando um usuário sai e notifica aos outros
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
