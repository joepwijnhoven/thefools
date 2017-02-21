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
    	var sortedTour = [];
    	var lastYear = 0;
    	var yearObject = null;

    	for(var i = 0; i<data.length; i++){
    		var date = new Date(data[i].date);
    		var year = date.getFullYear();
    		if(year != lastYear){
    			if(yearObject) {
    				sortedTour.push(yearObject);
    			}
    			yearObject = {};
    			yearObject.name = year;
    			yearObject.tours = [];
    		}

    		yearObject.tours.push(data[i]);
    		lastYear = year;
    	}
    	sortedTour.push(yearObject);
        $scope.result = sortedTour;
    });
}]);
