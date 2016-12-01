angular.module('starter')
  .controller('CustomerCtrl', function($rootScope, $scope, $state, $log, $q, $http, $filter, $ionicLoading, CustomersService, QuotationsService) {
    $log.info("CustomerCtrl", "-- start --");

    $scope.customerData = {};
    $scope.addr1 = {};
    $scope.addr1Selected = {};
    $scope.addr2 = {};
    $scope.addr2Selected = {};
    $scope.addr3 = {};
    $scope.addr3Selected = {};
    $scope.customers = {};
    $scope.customer = {};
    $scope.quotations = {};
    var ctrl = $scope;
    var params = $state.params;
    ctrl.typeFlag = (params && params.flag) ? params.flag : 'search';
    ctrl.message = '';
    ctrl.quotNo = '';
    ctrl.quotation = {};

    ctrl.init = function() {
      $rootScope.checkAuthState();

      if ($state.params != undefined && $state.params.customerNo != undefined && $state.params.customerNo != "") {
        CustomersService.getCustomer($state.params.customerNo).then(function(data) {
          $scope.customer = ctrl.customerData = data;
        }, function(resp) {
          $log.error("CustomerCtrl", "get customer fail.");
          $state.go('home');
        })
      }

      if ($state.params != undefined && $state.params.customerNo != undefined && $state.$current.name == "customer.edit") {

      } else if ($state.params != undefined && $state.params.customerNo != undefined && $state.$current.name == "customer.quotation") {
        ctrl.customer = $state.params.obj;
        ctrl.getCustomerQuotation($state.params.customerNo);
      } else if ($state.params != undefined && $state.params.obj != undefined) {
        if ($state.$current.name == "customer.search") {
          if ($state.params.quotNo) {
            ctrl.quotNo = $state.params.quotNo;
          }
          ctrl.customers = $state.params.obj;
          if (ctrl.customers && Object.prototype.toString.call(ctrl.customers) === "[object Array]") {
            sessionStorage.setItem("customer.search.result", JSON.stringify(ctrl.customers));
          } else {
            var customers = sessionStorage.getItem("customer.search.result");
            if (customers && customers != "") ctrl.customers = JSON.parse(customers);
          }
        } else if ($state.$current.name == "customer.success") {
          ctrl.customerNo = $state.params.obj;
        } else if ($state.$current.name == "customer" && ctrl.typeFlag == "add2quot.edit") {
          if ($state.params.obj.quotNo) {
            ctrl.quotNo = $state.params.obj.quotNo;
          } else if ($state.params.quotNo) {
            ctrl.quotNo = $state.params.quotNo;
          }
        }
      } else if ($state.params == undefined) {
        if ($state.$current.name == "customer.search") {
          var condition = sessionStorage.getItem("customer.search.condition");
          if (condition && condition != "") ctrl.queryCustomer(JSON.parse(condition));
        }
      } else {
        if (sessionStorage.hasOwnProperty("customer.search.condition")) {
          delete sessionStorage["customer.search.condition"];
        }
        if ($state.$current.name == "customer.search") {
          var customers = sessionStorage.getItem("customer.search.result");
          if (customers && customers != "") ctrl.customers = JSON.parse(customers);
        }
      }
      $log.info("CustomerCtrl", "-- customers --", ctrl.customers);

      //ctrl.getAddr1();
    }

    ctrl.selCustomer = function(cust) {
      if (cust && ctrl.typeFlag != 'add2quot' && ctrl.typeFlag != 'add2quot.edit') {
        $state.go('customer.quotation', {
          'obj': cust,
          'customerNo': cust.customerNo
        }, {
          reload: false
        });
      } else if (cust && ctrl.typeFlag == 'add2quot') {
        $state.go('quotation.new', {
          'obj': cust,
          'flag': ctrl.typeFlag
        }, {
          reload: true
        });
      } else if (cust && ctrl.typeFlag == 'add2quot.edit') {
        $state.go('quotation.edit', {
          'obj': cust,
          'flag': ctrl.typeFlag,
          'quotNo': params.quotNo
        }, {
          reload: true
        });
      }
    }

    ctrl.clickQuery = function(itemId) {
      if (itemId) {
        $state.go('goods.query', {
          'obj': itemId
        }, {
          reload: false
        });
      }
    };

    ctrl.queryCustomer = function(item) {

      var noData = false;
      if (item != undefined) {
        if (!item.customerNo && !item.customerName && !item.customerUnino && !item.customerTel && !item.customerPhone) {
          noData = true;
          return;
        }
      } else {
        return;
      }

      if (item) sessionStorage.setItem("customer.search.condition", JSON.stringify(item));

      CustomersService.findCustomer(item).then(function(data) {
        $log.debug("CustomerCtrl.queryCustomer", "success", data);

        if (data.length > 0) {
          var args = {};
          args.obj = data;
          if (ctrl.typeFlag && ctrl.typeFlag == 'add2quot.edit') {
            if (params && params.obj && params.obj.quotNo && params.obj.quotNo != "") {
              args.quotation = params.obj;
              $state.params.quotNo = args.quotNo = args.quotation.quotNo;
            }
          }

          $state.go('customer.search', args, {
            reload: true
          });
        } else {
          ctrl.message = '找不到客戶 !!'
        }

      }, function(err) {
        $log.debug("CustomerCtrl.queryCustomer", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.queryCustomer", "exception", ex);
        debugger;

      });
    }

    ctrl.getCustomerQuotation = function(customerNo) {
      QuotationsService.getCustomerQuotation(customerNo).then(function(data) {
        $log.debug("CustomerCtrl.getCustomerQuotation", "success", data);

        $scope.quotations = {};
        for (var index in data) {
          var quot = {};
          quot.quotNo = data[index].quoNo;
          quot.sum = data[index].quoSum;
          quot.total = data[index].quoTotal;
          quot.createDate = $filter('date')(new Date(data[index].quoDate1), AppConfig.DATE_FORMAT);
          $scope.quotations[quot.quotNo] = quot;
        }

      }, function(err) {
        $log.debug("CustomerCtrl.getCustomerQuotation", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("CustomerCtrl.getCustomerQuotation", "exception", ex);
        debugger;

      });
    }

    ctrl.addCustomer = function(item) {

      if (item == undefined || item.customerName == undefined || item.customerName == "") {
        alert("至少需要輸入名稱");
        return;
      }

      CustomersService.addCustomer(item).then(function(data) {
        $log.debug("CustomerCtrl.addCustomer", "success", data);

        $state.go("customer.success", {
          "obj": data.customerNo
        });

      }, function(err) {
        $log.debug("CustomerCtrl.addCustomer", "error", err);
        debugger;

        $state.go("fail");
      }).catch(function(ex) {
        $log.debug("CustomerCtrl.addCustomer", "exception", ex);
        debugger;

      });
    }

    ctrl.saveCustomer = function(item) {

      if (item == undefined || item.customerName == undefined || item.customerName == "") {
        alert("至少需要輸入名稱");
        return;
      }

      CustomersService.saveCustomer(item).then(function(data) {
        $log.debug("CustomerCtrl.addCustomer", "success", data);

        $state.go("customer.success", {
          "obj": data.customerNo
        });

      }, function(err) {
        $log.debug("CustomerCtrl.addCustomer", "error", err);
        debugger;

        $state.go("fail");
      }).catch(function(ex) {
        $log.debug("CustomerCtrl.addCustomer", "exception", ex);
        debugger;

      });
    }

    ctrl.addNewQuotation = function(customer) {
      if (sessionStorage.hasOwnProperty('quotation')) {
        delete sessionStorage['quotation'];
      }

      $state.go('quotation.new', {
        'obj': customer,
        'flag': 'add2auot'
      }, {
        reload: true
      });
    }

    ctrl.editQuotation = function(quotNo) {
      if (sessionStorage.hasOwnProperty('quotation')) {
        delete sessionStorage['quotation'];
      }

      $state.go('quotation.edit', {
        'quotNo': item.quotNo
      }, {
        reload: true
      });
    }

    ctrl.init();

    $log.info("CustomerCtrl", "-- end --");
  })
