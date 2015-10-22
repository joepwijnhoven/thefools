'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:TourCtrl
 * @description
 * # TourCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp').controller('TourCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
    $http.get("/TourData").success(function(data) {
        $scope.result = data;
    });
}]);
