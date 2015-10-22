'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:AdminfoolCtrl
 * @description
 * # AdminfoolCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp')
  .controller('AdminfoolCtrl', ['$routeParams', '$scope', '$http', '$cookieStore', '$location',
      function ($routeParams, $scope, $http, $cookieStore, $location) {
    $scope.loggedIn = $cookieStore.get("loggedin");

    $scope.init = function() {
      $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
      $http.get("/TourData").success(function(data) {
        $scope.results = data;
      });
    };

    $scope.submit = function() {
      $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
      $http.defaults.headers.common.username = this.username;
      $http.defaults.headers.common.password = this.password;
      $http.get("/Login").success(function(data) {
        $cookieStore.put("loggedin", "true");
        $scope.loggedIn = $cookieStore.get("loggedin");
      }).error(function(data) {
        $location.path('/');
      });
    };

    $scope.logOff = function() {
      $cookieStore.put("loggedin", "");
      $scope.loggedIn = $cookieStore.get("loggedin");
    };

    $scope.showPerformance = function(id) {
      $location.path('/Adminfool/Edit/' + id);
    }

    $scope.editInit = function() {
      if(!$scope.loggedIn) {
        $location.path('/Adminfool/Index');
      } else {
        $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
        $http.defaults.headers.common.id = $routeParams.id;
        $http.get("/SingleTourData").success(function(data) {
          $scope.result = data[0];
        });
      }
    }

  }]);
