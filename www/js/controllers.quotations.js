angular.module('starter')
  .controller('QuotationCtrl', function($rootScope, $scope, $state, $log, $q, $http, $filter, uibDateParser, QuotationsService, CustomersService) {
    $log.info("QuotationCtrl", "-- start --");

    var ctrl = $scope;
    var params = $state.params;

    ctrl.today = $filter('date')(new Date(), AppConfig.DATE_FORMAT);
    ctrl.quotation = {};
    ctrl.quotation.quotNo = '';
    ctrl.quotation.total = 0;
    ctrl.quotation.customer = {};
    ctrl.quotation.goodsList = {};
    ctrl.quotation.fare = {};
    ctrl.quotation.fare.fareId = AppConfig.FARE_ID;
    ctrl.quotation.fare.fareName = AppConfig.FARE_NAME;
    ctrl.quotation.fare.price = 0;

    ctrl.quotNo = "";

    ctrl.init = function() {
      $rootScope.checkAuthState();

      if ($state.$current.name == "quotation.new") {
        ctrl.quotation.createDate = $filter('date')(new Date(), AppConfig.DATE_FORMAT);

        if (params) {
          if (params.flag == 'new') {
            sessionStorage.removeItem("quotation");
          } else {
            var quot = sessionStorage.getItem("quotation");
            if (quot) {
              ctrl.quotation = JSON.parse(quot);
            }
          }

          if (params.obj && params.obj.stockNo) {
            if (!ctrl.quotation.goodsList.hasOwnProperty(params.obj.stockNo)) {
              var item = {};
              item.itemId = params.obj.stockNo;
              item.itemName = params.obj.stockName;
              item.unitPrice = params.obj.stockPrice ? params.obj.stockPrice : 0;
              item.amount = 1;
              item.subTotal = item.amount * item.unitPrice;

              ctrl.quotation.goodsList[item.itemId] = item;
            }
          } else if (params.obj && params.obj.customerNo) {
            ctrl.quotation.customer = params.obj;
          }

          ctrl.calcQuotation();
          sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
        }
      } else if ($state.$current.name == "quotation.success") {
        if (params.obj) {
          ctrl.quotNo = params.obj
        }
      } else if ($state.$current.name == "quotation.edit") {
        if (params && params.quotNo) {
          ctrl.quotation.quotNo = params.quotNo;

          if (ctrl.quotation.quotNo && ctrl.quotation.quotNo.length > 0) {

            var quot = {};
            quot.quotNo = '';
            if (sessionStorage.hasOwnProperty('quotation')) {
              quot = JSON.parse(sessionStorage.getItem("quotation"));
            }

            if (quot.quotNo == ctrl.quotation.quotNo) {
              if ($state.params && $state.params.obj && $state.params.obj.stockNo) {
                if (quot.goodsList.hasOwnProperty($state.params.obj.stockNo)) {
                  quot.goodsList[$state.params.obj.stockNo].amount++;
                } else {
                  item = {};
                  item.itemId = $state.params.obj.stockNo;
                  item.itemName = $state.params.obj.stockName;
                  item.unitPrice = $state.params.obj.stockPrice ? $state.params.obj.stockPrice : 0;
                  item.amount = 1;

                  item.subTotal = item.amount * item.unitPrice;
                  quot.goodsList[item.itemId] = item;
                }
              } else if ($state.params && $state.params.obj && $state.params.obj.customerNo) {
                if (quot.customer && quot.customer.customerNo && quot.customer.customerNo == '000000') {
                  quot.customer = $state.params.obj;
                }
              }

              ctrl.quotation = quot;
              ctrl.calcQuotation();

              sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
            } else {
              QuotationsService.getQuotation(ctrl.quotation.quotNo).then(function(res) {
                $log.debug("QuotationsService.getQuotation", "res", res);

                if (res.quoNo == undefined) {
                  $state.go('quotation.fail');
                  return;
                }

                var quot = {};
                quot.quotNo = res.quoNo;
                quot.total = 0;
                quot.createDate = $filter('date')(new Date(res.quoDate1), AppConfig.DATE_FORMAT);
                quot.customer = {};
                quot.fare = {};
                quot.fare.fareId = AppConfig.FARE_ID;
                quot.fare.fareName = AppConfig.FARE_NAME;
                quot.fare.price = 0;

                if ($state.params && $state.params.obj && $state.params.obj.customerNo) {
                  quot.customer = $state.params.obj;
                } else {
                  quot.customer.customerName = res.custName;
                  quot.customer.customerNo = res.custNo;
                  quot.customer.customerPayrate = 100;
                  quot.customer.addr1 = "";
                  quot.customer.addr2 = "";
                  quot.customer.addr3 = "";
                  quot.customer.customerFax = "";
                  quot.customer.customerTel = "";
                }

                var item = {};
                var isGoodsExist = false;
                quot.goodsList = {};
                for (var i = 0; i < res.detailList.length; i++) {
                  if ( res.detailList[i].stockNo.toLowerCase() == AppConfig.FARE_ID.toLowerCase() ){
                    quot.fare = {};
                    quot.fare.fareId = AppConfig.FARE_ID;
                    quot.fare.fareName = AppConfig.FARE_NAME;
                    quot.fare.price = res.detailList[i].stockPrice;
                  }else{
                    item = {};
                    item.itemId = res.detailList[i].stockNo;
                    item.itemName = res.detailList[i].stockName;
                    item.unitPrice = res.detailList[i].stockPrice ? res.detailList[i].stockPrice : 0;
                    item.amount = res.detailList[i].stockQty ? res.detailList[i].stockQty : 1;

                    item.subTotal = item.amount * item.unitPrice;
                    quot.goodsList[item.itemId] = item;
                  }
                }

                if ($state.params && $state.params.obj && $state.params.obj.stockNo) {
                  if (quot.goodsList.hasOwnProperty($state.params.obj.stockNo)) {
                    quot.goodsList[$state.params.obj.stockNo].amount++;
                  } else {
                    item = {};
                    item.itemId = $state.params.obj.stockNo;
                    item.itemName = $state.params.obj.stockName;
                    item.unitPrice = $state.params.obj.stockPrice ? $state.params.obj.stockPrice : 0;
                    item.amount = 1;

                    item.subTotal = item.amount * item.unitPrice;
                    quot.goodsList[item.itemId] = item;
                  }

                  //if ($state.params.obj.stockNo == item.itemId) item.amount++;
                }

                ctrl.quotation = quot;
                ctrl.calcQuotation();
                if (ctrl.quotation.customer.customerNo != undefined) {
                  CustomersService.getCustomer(ctrl.quotation.customer.customerNo).then(function(data) {

                    ctrl.quotation.customer = data;

                    sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
                  }, function(resp) {
                    $log.error("CustomerCtrl", "get customer fail.");
                    $state.go('home');
                  })
                }

                sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
              }, function(err) {
                $log.debug("QuotationsService.getQuotation", "error", err);
                debugger;

              }).catch(function(ex) {
                $log.debug("QuotationsService.getQuotation", "exception", ex);
                debugger;

              });
            }

          } else {
            $state.go('home');
          }
        }
      }
    }

    ctrl.removeGoods = function(itemId) {
      if (ctrl.quotation.goodsList[itemId]) {
        delete ctrl.quotation.goodsList[itemId];
        sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
        ctrl.calcQuotation();
      }
    }

    ctrl.addAmount = function(itemId) {
      if (ctrl.quotation.goodsList[itemId]) {
        //ctrl.quotation.goodsList[itemId].amount++;
        var item = ctrl.quotation.goodsList[itemId];
        ctrl.quotation.goodsList[itemId].subTotal = item.amount * item.unitPrice;
        sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
        ctrl.calcQuotation();
      }
    }

    ctrl.changeFare = function() {
      sessionStorage.setItem("quotation", JSON.stringify(ctrl.quotation));
      ctrl.calcQuotation();
    }

    ctrl.saveQuotation = function(act) {
      var quot = {}
      if (ctrl.quotation.customer.hasOwnProperty("customerNo")) {
        quot.custNo = ctrl.quotation.customer.customerNo;
      } else {
        quot.custNo = "000000";
      }
      quot.quoSum = ctrl.quotation.sum;
      quot.quoTax = 0; //0.05;
      quot.quoTotal = ctrl.quotation.total;
      quot.detailList = [];

      var seq = 0;
      for (var k in ctrl.quotation.goodsList) {
        if (ctrl.quotation.goodsList.hasOwnProperty(k)) {
          seq++;
          var item = ctrl.quotation.goodsList[k];
          var data = {};
          data.seq = seq;
          data.stockNo = item.itemId;
          data.stockPrice = item.unitPrice;
          data.stockQty = item.amount;
          data.subtotal = item.subTotal;

          quot.detailList.push(data);
        }
      }

      // add fare
      seq++;
      var fare = {};
      var farePrice = 0;
      if ( ctrl.quotation.fare && ctrl.quotation.fare.hasOwnProperty("price") ) {
        farePrice = ctrl.quotation.fare.price;
      }
      fare.seq = seq;
      fare.stockNo = AppConfig.FARE_ID;
      fare.stockPrice = farePrice;
      fare.stockQty = 1;
      fare.subtotal = farePrice;
      quot.detailList.push(fare);

      if (quot.detailList.length > 0) {
        if (act == 'new') {
          QuotationsService.saveQuotation(quot).then(function(res) {
            $log.debug("QuotationsService.saveQuotation", "res", res);

            $state.go('quotation.success', {
              'obj': res.quoNo
            });

          }, function(err) {
            $log.debug("QuotationsService.saveQuotation", "error", err);
            debugger;

          }).catch(function(ex) {
            $log.debug("QuotationsService.saveQuotation", "exception", ex);
            debugger;

          });
        } else {
          quot.quoNo = ctrl.quotation.quotNo;
          QuotationsService.updateQuotation(quot).then(function(res) {
            $log.debug("QuotationsService.updateQuotation", "res", res);

            $state.go('quotation.success', {
              'obj': res.quoNo
            });

          }, function(err) {
            $log.debug("QuotationsService.updateQuotation", "error", err);
            debugger;

          }).catch(function(ex) {
            $log.debug("QuotationsService.updateQuotation", "exception", ex);
            debugger;

          });
        }
      }
    }

    ctrl.calcQuotation = function() {
      ctrl.quotation.sum = 0;
      ctrl.quotation.total = 0;
      for (var k in ctrl.quotation.goodsList) {
        if (ctrl.quotation.goodsList.hasOwnProperty(k)) {
          ctrl.quotation.sum++;
          ctrl.quotation.total += ctrl.quotation.goodsList[k].subTotal;
        }
      }

      ctrl.quotation.total += ctrl.quotation.fare.price;
      ctrl.quotation.sum = ctrl.quotation.total; // * 1.05;
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
