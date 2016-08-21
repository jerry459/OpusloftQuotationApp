angular.module('starter.services', [])

.factory('Goods', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var goods = [{
    id: 0,
    name: '桌子'
  }, {
    id: 1,
    name: '椅子'
  }, {
    id: 2,
    name: '櫃子'
  }];

  return {
    all: function() {
      return goods;
    },
    remove: function(item) {
      goods.splice(goods.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < goods.length; i++) {
        if (goods[i].id === parseInt(itemId)) {
          return goods[i];
        }
      }
      return null;
    }
  };
});
