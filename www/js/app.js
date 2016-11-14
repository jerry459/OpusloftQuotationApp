// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
  .module('starter', ['ionic', 'ngCordova', 'ngDialog', 'ui.bootstrap', 'services.goods', 'services.users', 'services.quotations', 'services.customers', 'services.address'])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    //$urlRouterProvider.when('/customer/success', '/customer/success');
    //$urlRouterProvider.when('/customer/:customerNo', '/customer/:customerNo');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'templates/_base.html'
      })
      // 使用者相關
      .state('user', {
        url: '/user',
        parent: 'base',
        templateUrl: 'templates/user.html'
      })
      // 使用者登入
      .state('user.login', {
        url: '/login',
        templateUrl: 'templates/user.login.html',
        controller: 'UsersCtrl',
        params: {
          obj: null
        }
      })
      // 使用者變更密碼
      .state('user.updatePwd', {
        url: '/updatePwd',
        templateUrl: 'templates/user.updatePwd.html',
        controller: 'UsersCtrl',
        params: {
          obj: null
        }
      })
      // 首頁
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
        controller: 'GoodsCtrl',
        params: {
          flag: ''
        }
      })
      .state('goods.query', {
        url: '/:itemId',
        templateUrl: 'templates/goods.search.html',
        controller: 'GoodsCtrl',
        params: {
          flag: ''
        }
      })
      .state('barcode', {
        url: '/barcode',
        parent: 'base',
        templateUrl: 'templates/barcode.html',
        controller: 'BarcodeCtrl',
        params: {}
      })
      .state('customer', {
        url: '/customer',
        parent: 'base',
        templateUrl: 'templates/customer.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null,
          flag: ''
        }
      })
      .state('customer.edit', {
        url: '/:customerNo/edit',
        templateUrl: 'templates/customer.edit.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null,
          flag: 'edit'
        }
      })
      //.state('customer.modify', {
      //  url: '/:customerNo',
      //  templateUrl: 'templates/customer.modify.html',
      //  controller: 'CustomerCtrl'
      //})
      .state('customer.search', {
        url: '/search',
        templateUrl: 'templates/customer.search.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null
        }
      })
      .state('customer.quotation', {
        url: '/:customerNo/quotation',
        templateUrl: 'templates/customer.quotation.html',
        controller: 'CustomerCtrl',
        params: {
          obj: null
        }
      })
      .state('customer.success', {
        url: '/success',
        templateUrl: 'templates/customer.success.html',
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
          obj: null,
          flag: ''
        }
      })
      .state('quotation.search', {
        url: '/search',
        templateUrl: 'templates/quotation.search.html',
        controller: 'QuotationCtrl',
        params: {
          obj: null,
          flag: ''
        }
      })
      .state('quotation.edit', {
        url: '/:quotNo/edit',
        templateUrl: 'templates/quotation.edit.html',
        controller: 'QuotationCtrl',
        params: {
          obj: null,
          flag: ''
        }
      })
      .state('quotation.success', {
        url: '/success',
        templateUrl: 'templates/quotation.success.html',
        controller: 'QuotationCtrl',
        params: {
          obj: null,
          flag: ''
        }
      })
      .state('quotation.fail', {
        url: '/fail',
        templateUrl: 'templates/quotation.search.fail.html'
      })
      .state('fail', {
        url: '/fail',
        templateUrl: 'templates/fail.html',
      })
      .state('test', {
        url: '/test',
        templateUrl: 'templates/test.html',
        controller: 'TestCtrl',
      });

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show')
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response
        }
      }
    });
  })

.run(function($ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function() {
    //if (condition) {
    if (false) {
      navigator.app.exitApp();
    } else {}
  }, 100);

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

.run(function($rootScope, $state, $location, $http, $ionicLoading, UsersService) {
  console.info("CheckAuthState", "-- start --");

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      templateUrl: 'spinner.html'
    });
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  })

  $rootScope.goBack = function() {
    history.back();
    scope.$apply();
  }

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
        var currentTime = (new Date()).getTime();
        if (user.accessTokenExpire < currentTime) {
          UsersService.clearLocalStorage();
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

.controller('TestCtrl', function($rootScope, $scope, $state, $log, $q, $http, $ionicLoading, UsersService) {
  $log.info("TestCtrl", "-- start --");

  var ctrl = $scope;

  ctrl.init = function() {

  };

  ctrl.init();

  $log.info("TestCtrl", "-- end --");
  return ctrl;
});
