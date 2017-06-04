angular.module('simpleApp', [])
  .factory('MessagesSvc', function($http) {
    var messages = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(message) {
        items.push(message);
      }
    };
  })
  .controller('MessagesCtrl', function($scope, $http) {
    $http.get('/messages').then(function(messagesResponse) {
      $scope.messages = messagesResponse.data;
    });
  });
