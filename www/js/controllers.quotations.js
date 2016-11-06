angular.module('starter')
  .controller('QuotationCtrl', function($rootScope, $scope, $state, $log, $q, $http, $filter, uibDateParser, QuotationsService) {
    $log.info("QuotationCtrl", "-- start --");

    var ctrl = $scope;
    var params = $state.params;

    ctrl.today = $filter('date')(new Date(), AppConfig.DATE_FORMAT);
    ctrl.quotation = {};
    ctrl.quotation.customer = {};
    ctrl.quotation.goodsList = {};

    ctrl.init = function() {
      $rootScope.checkAuthState();

      if ($state.$current.name == "quotation.new") {
        ctrl.quotation.createDate = $filter('date')(new Date(), AppConfig.DATE_FORMAT);

        if (params) {
          if (params.flag == 'new') {

          } else {
            var quot = sessionStorage.getItem("quotation");
            if (quot) {
              ctrl.quotation = JSON.parse(quot);
            }
          }
          if (params.obj && params.obj.stockNo) {
            var goods = {};
            goods.itemId = params.obj.stockNo;
            goods.itemName = params.obj.stockName;
            goods.unitPrice = params.obj.price;
            goods.amount = 1;

            ctrl.quotation.goodsList[goods.itemId] = goods;
            sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
          }
        }
      }
    }

    ctrl.removeGoods = function(itemId) {
      if (ctrl.quotation.goodsList[itemId]) {
        delete ctrl.quotation.goodsList[itemId];
        sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
      }
    }

        ctrl.addAmount = function(itemId) {
          if (ctrl.quotation.goodsList[itemId]) {
            //ctrl.quotation.goodsList[itemId].amount++;
            sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
          }
        }

    ctrl.init();

    $log.info("QuotationCtrl", "-- end --");
  })

.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i = min; i <= max; i++)
      input.push(i);
    return input;
  };
});
