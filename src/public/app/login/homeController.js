'use strict';

angular.module('loginModule')
	.controller('homeController', ['$scope', 'loginService', function($scope, loginService){

		$scope.page_title = "Home page";

		$scope.logout=function(){
			console.log('logout initiated');
			loginService.logout();
		}

	}]);