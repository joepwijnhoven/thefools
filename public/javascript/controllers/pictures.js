'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:PicturesCtrl
 * @description
 * # PicturesCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp').controller('PicturesCtrl', ['$scope', function ($scope) {
   
	baguetteBox.run('.gallery');
}]);