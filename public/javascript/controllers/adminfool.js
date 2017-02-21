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
      var logIn = {'username':  this.username, 'password': this.password};
      $http.post("/Login", logIn).success(function(data) {
        $cookieStore.put("loggedin", "true");
        $scope.loggedIn = $cookieStore.get("loggedin");
      }).error(function(data) {
        $scope.invalidLogIn = true;
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
          data.date = formatDate(data.date);
          $scope.result = data;
        });
      }
    }

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    $scope.save = function(record) {
      if(isValidDate(record.date)) {
        var date = new Date(record.date);
        record.date = date.toUTCString();
        $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
        $http.post("/TourData/Update", $scope.createSendingRecord(record)).success(function() {
          $location.path('/Adminfool/Index');
        });
      } else {
        alert("Write the date in this format: 'yyyy-mm-dd'. Example given: 2016-01-30");
      }
    };

    $scope.create = function(record) {
      if(isValidDate(record.date)) {
        $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
        $http.post("/TourData/Create", $scope.createSendingRecord(record)).success(function() {
          $location.path('/Adminfool/Index');
        });
      } else {
        alert("Write the date in this format: 'yyyy-mm-dd'. Example given: 2016-01-30");
      }
    };

    $scope.delete = function(id) {
      $http.defaults.headers.common.authorization = "AFG345W2QxgO0";
      $http.post("/TourData/Delete", {'id':  id}).success(function() {
        $location.path('/Adminfool/Index');
      });
    };

    $scope.createSendingRecord = function(r) {
      r.date = document.getElementById('date').value;
      r.typeOfParty = document.getElementById('typeOfParty').checked ? 'open' : 'besloten';
      for(var value in r) {
        if(r[value] == "") {
          delete r[value];
        }
      }
      return r;
    }

    function isValidDate(dateString) {
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if(!dateString.match(regEx))
        return false;  // Invalid format
      var d;
      if(!((d = new Date(dateString))|0))
        return false; // Invalid date (or this could be epoch)
      return d.toISOString().slice(0,10) == dateString;
    }

  }]);
