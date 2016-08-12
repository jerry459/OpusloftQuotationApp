angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("BarcodeCtrl", function ($scope, $cordovaBarcodeScanner, $http) {
  $scope.scanBarcode = function () {
  	$cordovaBarcodeScanner.scan().then(function (result) {                   
  	  $scope.barcode = result.text;
  	  $scope.format = result.format;
	  
	  if ( result.text ) {
		$http.get("http://tw.yahoo.com", { params: { "key1": "value1", "key2": "value2" } })
			.success(function(data) {
				$scope.result = data.result;
			})
			.error(function(data) {
				alert("ERROR");
			});
	  }
  	}, function (error) {
  	  console.warn("An error happened -> " + error);
  	});
  };
});
