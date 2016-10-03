angular.module('starter')
  .controller('LoginCtrl', function($rootScope, $scope, $log, $q, $http, $state, UsersService) {
    $log.info("LoginCtrl", "-- start --");

    var ctrl = $scope;
    var loginData = {};
    var user = {};

    ctrl.init = function() {
      loginData.account = "";
      loginData.pwd = "";

      $rootScope.checkAuthState();
      //UsersService.getUserFromLocalStorage();
      UsersService.clearLocalStorage();
      user = {}; //$rootScope.user;

      // 暫時停用這個判斷是
      if (user != undefined && user.accessToken != undefined && user.accessToken != "") {
        $state.go("home");
      } else {}
    }

    ctrl.login = function(loginData) {

      UsersService.login(loginData).then(function(res) {

        user.loginId = res.emUserid; //res.loginId;
        user.userName = res.emName; //res.userName;
        user.accessToken = res.token; //res.accessToken;
        user.userStatus = res.emUserid ? 1 : 0; //res.status;
        user.storeNo = res.emDpno;
        user.storeName = res.emDpname; //res.storeName;

        if (user.userStatus) {
          UsersService.save2LocalStorage(user);

          $state.go("home");
        } else {
          loginData.account = "";
          loginData.pwd = "";
          user = {};
          UsersService.clearLocalStorage();
        }

      }, function(err) {
        $log.debug("LoginCtrl.login", "error", err);
        debugger;

      }).catch(function(ex) {
        $log.debug("LoginCtrl.login", "exception", ex);
        debugger;

      });
    }

    ctrl.init();

    $log.info("LoginCtrl", "-- end --");
  })
  
