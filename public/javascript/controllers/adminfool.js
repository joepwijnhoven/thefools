'use strict';

/**
 * @ngdoc function
 * @name theFoolsApp.controller:AdminfoolCtrl
 * @description
 * # AdminfoolCtrl
 * Controller of the theFoolsApp
 */
angular.module('theFoolsApp')
  .controller('AdminfoolCtrl', ['$http', function ($http) {
    $http.get("http://localhost:3000/")
      .success(function(data) {
        console.log(data);

      });

  }]);
