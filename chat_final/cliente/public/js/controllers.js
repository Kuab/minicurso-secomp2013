'use strict';

var current_username;

/* Controllers */

function AppCtrl($scope, socket) {  // cria o controlador geral da página
  $scope.glued = true;
  // Socket listeners
  // ================

  socket.on('init', function (data) { // fica aguardando a entrada do usuário
    current_username =  data.name;  // nome do usuário corrente
    $scope.name = data.name; // manda para o scopo o nome do usuário
    $scope.users = data.users; // lista de usuários
  });

  socket.on('send:message', function (message) {  // fica no aguardo de uma mensagem
    $scope.messages.push({ // adiciona na lista de mensagens, o texto da mensagem e o usuário que enviou a mensagem
      user: message.user,
      text: message.text,
      });
  });

  socket.on('change:name', function (data) { // aguarda um solicitação de troca de nome
    changeName(data.oldName, data.newName); // tenta trocar o nome
    current_username = data.newName;
  });

  socket.on('user:join', function (data) { // fica no aguardo pela entrada de algum usuário
    $scope.messages.push({ // adiciona uma mensagem para o usuário atual, informando que outro usuário entrou
      user: 'chatroom',
      text: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name); // adiciona a lista de usuários, o usuário que entrou
  });

  socket.on('user:left', function (data) { // fica no aguardo pelo saída de algum usuário
    $scope.messages.push({ // adiciona mensagem para o usuário atual, informando qual usuário deixou a sala
      user: 'chatroom',
      text: 'Usuário ' + data.name + ' deixou a sala.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) { // busca o nome do usuário que deixou a sala, e remove da lista de usuários
      user = $scope.users[i];                   // do usuário atual
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  $(function(){
    $('#changeNameModal').modal('show')
  })

  // Métodos privados para ajuda
  // ===============

  var retrieveUsername = function() { // retorna o username do usuário
    var username;
    username = (localStorage.getItem("username") || false); // busca num variável local o username do usuário
    if (!username) { return false; } // se não encontrar, retorna falso
    return username;
  }

  // Verifica se a mensagem tem uma menção para o usuário corrente
  var getMention = function(message) {
    var text,pattern,mention;
    text = message;
    pattern = /\B\@([\w\-]+)/gim;
    mention = text.match(pattern);

    if(mention){
      mention = String(mention).split("@")[1]; // busca por um @, que indica menção
      if(mention === current_username) return mention; // se a menção for para o usuário corrente, retorna a menção para ele (vai ficar de outra cor na página)
    }

    return false;
  }

  var changeName = function (oldName, newName, member) {
    // renomeie o usuário na lista de usuário
    var i;
    for (i = 0; i < $scope.users.length; i++) { // para cada usuário conectado
      if ($scope.users[i] === oldName) {
        $scope.users[i] = newName;
      }
    }

    localStorage.setItem("username",newName);
    current_username = newName;

    $scope.messages.push({
      user: 'chatroom',
      text: 'Usuário ' + oldName + ' mudou seu nome para ' + newName + '.' // envia mensagem indicando que um usuário trocou de nome
    });
  }

  // Métodos públicos para o escopo, ou seja, para a visão
  // ==============================

  $scope.mention = function (name) {  // vai adicionar o @nomeUsuario no input de envio de mensagem
      $scope.message = '@' + name + ' ';
      $('.input-message').focus()
  };

  $scope.changeName = function () { // faz chamada para trocar de nome (quando já está com o modal aberto)
    socket.emit('change:name', { // faz chamada no modulo do socket para salvar a troca de nome (ou não, caso valor seja "" ou igual a algum existente)
      name: $scope.newName
    }, function (result) {
      if (!result) {
        alert('Ocorreu um erro ao mudar seu nome.');
      } else {
        
        changeName($scope.name, $scope.newName);

        $scope.name = $scope.newName
        $scope.newName = '';
        $('#changeNameModal').modal('hide')
      }
    });
  };

  $scope.messages = [];

  $scope.sendMessage = function () {  // a visão, a partir do angular, tem uma função sendMessage()
    socket.emit('send:message', {
      message: $scope.message
    });

    // adicionar na variável 'messages', que está no escopo da visão (conjunto de mensagens de um usuário), a mensagem que está sendo emitida
    $scope.messages.push({
      user: $scope.name,
      text: $scope.message
    });

    // clear message box
    $scope.message = '';
  };
}