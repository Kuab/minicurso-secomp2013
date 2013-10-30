var myApp = angular.module('myApp', []);

myApp.factory('Times',function(){
	var Times = {};
	Times.cast = [
		{
			nome: "Palmeiras",
			posicao: 1
		},
		{
			nome: "Corinthians",
			posicao: 2
		},
		{
			nome: "São Paulo",
			posicao: 3
		},
		{
			nome: "Santos",
			posicao: 4
		},
		{
			nome: "Portuguesa",
			posicao: 5
		},
		{
			nome: "Guarani",
			posicao: 6
		},
		{
			nome: "Ponte Preta",
			posicao: 7
		},
		{
			nome: "Mogi Mirim",
			posicao: 8
		},
		{
			nome: "São Caetano",
			posicao: 9
		},
		{
			nome: "Guaratinguetá",
			posicao: 10
		}
	];
	return Times;
})

function TimesCtrl($scope, Times){
	$scope.times = Times;
}