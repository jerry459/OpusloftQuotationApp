angular.module('starter')
.controller('HomeCtrl', function($rootScope, $scope, $log, $q, $http) {
  $log.info("HomeCtrl", "-- start --");

  var ctrl = $scope;

  ctrl.init = function() {
    $rootScope.checkAuthState();
  }

  ctrl.init();

  $log.info("HomeCtrl", "-- end --");
})
