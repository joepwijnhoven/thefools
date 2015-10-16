'use strict';

/**
 * @ngdoc overview
 * @name theFoolsApp
 * @description
 * # theFoolsApp
 *
 * Main module of the application.
 */

angular
  .module('theFoolsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/Adminfool', {
        templateUrl: 'views/adminfool.html',
        controller: 'AdminfoolCtrl',
        controllerAs: 'adminfool'
      })
      .when('/Contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/Music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl',
        controllerAs: 'music'
      })
      .when('/Tour', {
        templateUrl: 'views/tour.html',
        controller: 'TourCtrl',
        controllerAs: 'tour'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
