angular.module('starter')
  .controller('QuotationCtrl', function($rootScope, $scope, $state, $log, $q, $http, $filter, uibDateParser, QuotationsService) {
    $log.info("QuotationCtrl", "-- start --");

    var ctrl = $scope;
    var params = $state.params;

    ctrl.quotation = {};
    ctrl.quotation.customer = {};
    ctrl.quotation.goodsList = {};

    ctrl.init = function() {
      $rootScope.checkAuthState();

      if ($state.$current.name == "quotation.new") {
        ctrl.quotation.createDate = $filter('date')(new Date(), AppConfig.DATE_FORMAT);

        if (params && params.obj && params.obj.stockNo) {
          var goods = {};
          goods.itemId = params.obj.stockNo;
          goods.itemName = params.obj.stockName;
          goods.unitPrice = params.obj.price;
          goods.amount = 2;

          ctrl.quotation.goodsList[goods.itemId] = goods;
        }
      }
    }

    ctrl.removeGoods = function(itemId) {
      if (ctrl.quotation.goodsList[itemId]) {
        delete ctrl.quotation.goodsList[itemId];
      }
    }

    ctrl.init();

    $log.info("QuotationCtrl", "-- end --");
  })
