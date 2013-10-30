var myApp = angular.module('myApp', []); // essa linha define a criação de um novo aplicativo
myApp.factory('Data', function(){ // aqui será criado um serviço Data, que retorna uma message
	return {message:"I'm data from a service"}
})

myApp.filter('reverse', function(Data){
	return function(text){
		return text.split("").reverse().join("") + Data.message;
	}
})

function FirstCtrl($scope, Data){ // passando Data para o controlador
  $scope.data = Data;
}
function SecondCtrl($scope, Data){
  $scope.data = Data;

  $scope.reversedMessage = function(message){
  	return message.split("").reverse().join("");
  }
}