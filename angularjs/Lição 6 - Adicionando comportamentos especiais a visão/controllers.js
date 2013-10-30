var app = angular.module('behaviorApp', []);

app.directive("enter", function(){
	return function(scope,element){
		element.bind("mouseenter", function(){
			alert('Dentro da div com diretiva!');
		})
	}
})

app.directive("leave", function(){
	return function(scope,element){
		element.bind("mouseleave", function(){
			alert('Fora da div com diretiva!');
		})
	}
})

var app2 = angular.module('superhero', []);

app2.directive('superman', function(){
	return { // retorna um objeto
		restrict: "E", // indica que é um elemento da página (ou seja, diretiva)
		template: "<p>Superman ficou fraco!</p>"
	}
})

app2.directive('superman2', function(){
	return { // retorna um objeto
		restrict: "A", // indica que é um atributo
		link: function(){
			alert('Eu sou um atributo');
		}
	}
})

app2.directive('superman3', function(){
	return { // retorna um objeto
		restrict: "C", // indica que é uma classe
		link: function(){
			alert('Eu sou uma classe');
		}
	}
})

app2.directive('superman4', function(){
	return { // retorna um objeto
		restrict: "A", // indica que é um atributo
		link: function(){
			alert('Eu sou outro atributo');
		}
	}
})