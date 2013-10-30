'use strict';

/* Serviços */


// criação do serviço socket, para 'enviar' o socket para visão
app.factory('socket', function ($rootScope) {
  return {
    on: function (eventName, callback) {
    },
    emit: function (eventName, data, callback) {
    }
  };
});
