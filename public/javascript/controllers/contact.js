'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp').controller('ContactCtrl', ['$scope', '$window', '$rootScope', function ($scope, $window, $rootScope) {
  $scope.root = $rootScope;

  $scope.startLoading = function() {
    if(!$scope.root.loadingContact){
      $('#img2').hide();
    }
  }

  $('#img2').on('load', function(){
    $('#loader').hide();
    $scope.root.loadingContact = true;
    $('#img2').show();
  });

}]);
