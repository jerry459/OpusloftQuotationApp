// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
  .module('starter', ['ionic', 'ngCordova', 'starter.services'])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'templates/_base.html'
      })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '/home',
        parent: 'base',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('goods', {
        url: '/goods',
        parent: 'base',
        templateUrl: 'templates/goods.html',
        controller: 'GoodsCtrl'
      })
      .state('barcode', {
        url: '/barcode',
        parent: 'base',
        templateUrl: 'templates/barcode.html',
        controller: 'BarcodeCtrl'
      })
      .state('customer', {
        url: '/customer',
        parent: 'base',
        templateUrl: 'templates/customer.html',
        controller: 'CustomerCtrl'
      })
      .state('quotation', {
        url: '/quotation',
        parent: 'base',
        templateUrl: 'templates/quotation.html',
        controller: 'QuotationCtrl'
      });
  })

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var accessToken = 'YmVlcDpib29w';
    $http.defaults.headers.common.Authorization = accessToken;
  });
})

.run(function($rootScope, $state, $location) {
  console.info("CheckAuthState", "-- start --");
  debugger;

  $rootScope.checkAuthState = function() {
    if ($state.$current.name != "login") {

      var user = $rootScope.user;

      if (user.accessToken == undefined || user.accessToken == "") {
        $state.go("login");
      }
    }
  }

  console.info("CheckAuthState", "-- end --");
})
