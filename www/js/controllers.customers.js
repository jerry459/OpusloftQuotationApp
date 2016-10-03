angular.module('starter')
  .controller('CustomerCtrl', function($rootScope, $scope, $log, $q, $http) {
    $log.info("CustomerCtrl", "-- start --");
    debugger;

    var ctrl = $scope;

    ctrl.init = function() {
      $rootScope.checkAuthState();
    }

    ctrl.init();

    $log.info("CustomerCtrl", "-- end --");
  })
