var app = angular.module('behaviorApp', []);

/*
app.directive("enter", function(){
	return function(scope,element){
		element.bind("mouseenter", function(){ // pode também utilizar características do jquery como addClass
			element.addClass("panel");
		})
	}
})

app.directive("leave", function(){
	return function(scope,element){
		element.bind("mouseleave", function(){
			element.removeClass("panel");
		})
	}
})
*/

app.directive("enter", function(){
	return function(scope,element, attrs){
		element.bind("mouseenter", function(){ // pode também utilizar características do jquery como addClass
			element.addClass(attrs.enter);
		})
	}
})

app.directive("leave", function(){
	return function(scope,element,attrs){
		element.bind("mouseleave", function(){
			element.removeClass(attrs.enter);
		})
	}
})