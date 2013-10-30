'use strict';

/* Serviços */


// criação do serviço socket, para 'enviar' o socket para visão
app.factory('socket', function ($rootScope) {
  var socket = io.connect(); // conecta com o socket / servidor
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
