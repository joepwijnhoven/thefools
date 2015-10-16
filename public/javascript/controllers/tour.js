'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:TourCtrl
 * @description
 * # TourCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp').controller('TourCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get("http://localhost:3000/tour")
      .success(function(data) {
          $scope.result = data;
      });

}]);
