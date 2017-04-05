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
      .when('/Adminfool/Index', {
        templateUrl: 'views/admin/adminfool.html',
        controller: 'AdminfoolCtrl',
        controllerAs: 'adminfool'
      })
      .when('/Adminfool/Edit/:id', {
        templateUrl: 'views/admin/edit.html',
        controller: 'AdminfoolCtrl',
        controllerAs: 'adminfool'
      })
      .when('/Adminfool/Create', {
        templateUrl: 'views/admin/create.html',
        controller: 'AdminfoolCtrl',
        controllerAs: 'adminfool'
      })
      .when('/Contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      //.when('/Biography', {
      //  templateUrl: 'views/biography.html',
      //  controller: 'MainCtrl',
      //  controllerAs: 'main'
      //})
      .when('/Pictures', {
        templateUrl: 'views/pictures.html',
        controller: 'PicturesCtrl',
        controllerAs: 'pictures'
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
