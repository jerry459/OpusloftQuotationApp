// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
  .module('starter', ['ionic', 'ngCordova', 'ngDialog', 'ui.bootstrap', 'services.goods', 'services.users', 'services.quotations', 'services.customers', 'services.address'])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'templates/_base.html'
      })
      .state('user', {
        url: '/user',
        parent: 'base',
        templateUrl: 'templates/user.html'
      })
      .state('user.login', {
        url: '/login',
        templateUrl: 'templates/user.login.html',
        controller: 'UsersCtrl',
        params: {
          obj: null
        }
      })
      .state('user.updatePwd', {
        url: '/updatePwd',
        templateUrl: 'templates/user.updatePwd.html',
        controller: 'UsersCtrl',
        params: {
          obj: null
        }
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
      .state('goods.query', {
        url: '/:itemId',
        templateUrl: 'templates/goods.item.html',
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
        controller: 'CustomerCtrl',
        params: {
          obj: null
        }
      })
      .state('customer.search', {
        url: '/search',
        templateUrl: 'templates/customer.search.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null
        }
      })
      .state('customer.quotation', {
        url: '/quotation',
        templateUrl: 'templates/customer.quotation.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null
        }
      })
      .state('quotation', {
        url: '/quotation',
        parent: 'base',
        templateUrl: 'templates/quotation.html'
      })
      .state('quotation.new', {
        url: '/new',
        templateUrl: 'templates/quotation.new.html',
        controller: 'QuotationCtrl',
        params: {
          obj: null
        }
      });
  })

.run(function($ionicPlatform) {
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
  });
})

.run(function($rootScope, $state, $location, $http, UsersService) {
  console.info("CheckAuthState", "-- start --");

  $rootScope.checkAuthState = function() {
    if ($state.$current.name != "user.login" && $state.$current.name != "user.updatePwd") {

      UsersService.getUserFromLocalStorage();
      var user = $rootScope.user;

      if (user == undefined || user.accessToken == undefined || user.accessToken == "") {
        if ($http.defaults.headers.common)
          delete $http.defaults.headers.common['Token'];

        if ($http.defaults.headers.post)
          delete $http.defaults.headers.post['Token'];

        if ($http.defaults.headers.get)
          delete $http.defaults.headers.get['Token'];

        $state.go("user.login");
      } else {
        //$http.defaults.headers.common.Authorization = user.accessToken;
        /*
        $http.defaults.headers.common = {
          'Token': user.accessToken
        };
        $http.defaults.headers.post = {
          'Token': user.accessToken
        };
        $http.defaults.headers.get = {
          'Token': user.accessToken
        };
        */
      }
    } else {
      if ($http.defaults.headers.common)
        delete $http.defaults.headers.common['Token'];

      if ($http.defaults.headers.post)
        delete $http.defaults.headers.post['Token'];

      if ($http.defaults.headers.get)
        delete $http.defaults.headers.get['Token'];
    }
  }

  console.info("CheckAuthState", "-- end --");
})
