'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp')
  .controller('MainCtrl', ['$scope', '$window', '$rootScope', function ($scope, $window, $rootScope) {
  	$scope.root = $rootScope;

  	$scope.startLoading = function() {
  		if(!$scope.root.loadingMain){
			$('#img').hide();
  		}
  	}

	$('#img').on('load', function(){
	  $('#loader').hide();
	  $scope.root.loadingMain = true;
	  $('#img').show();
	});
  }]);
