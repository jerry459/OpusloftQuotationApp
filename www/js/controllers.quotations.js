angular.module('starter')
  .controller('QuotationCtrl', function($rootScope, $scope, $log, $q, $http) {
    $log.info("QuotationCtrl", "-- start --");
    debugger;

    var ctrl = $scope;

    ctrl.init = function() {
      $rootScope.checkAuthState();
    }

    ctrl.init();

    $log.info("QuotationCtrl", "-- end --");
  })
