var app = angular.module('twitterApp', []);

app.controller("AppCtrl", function($scope){
	$scope.loadMoreTwetts = function(){
		alert("Loading tweets!");
	}
})

app.directive("enter", function(){
	return function(scope, element, attrs){
		element.bind("mouseenter", function(){
			scope.$apply(attrs.enter);
		})
	}
})