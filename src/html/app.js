angular.module('simpleApp', [])
  .factory('messagesSvc', function($http) {
    var messages = [];
    var httpError = null;
    return {
      getVersion: function() {
        return new Promise(function(success, error) {
          $http.get('/version')
            .then(function(versionResponse) {
              version = versionResponse.data;
              httpError = null;
              success(version);
            })
            .catch(function(errorMsg) {
              console.log(errorMsg);
              httpError = {
                errorMessage: errorMsg.statusText,
                errorCode: errorMsg.status
              };
              error(httpError);
            });
        });
      },
      getMessages: function() {
        return new Promise(function(success, error) {
          $http.get('/messages')
            .then(function(messagesResponse) {
              messages = messagesResponse.data;
              httpError = null;
              success(messages);
            })
            .catch(function(errorMsg) {
              console.log(errorMsg);
              httpError = {
                errorMessage: errorMsg.statusText,
                errorCode: errorMsg.status
              };
              error(httpError);
            });
        });
      },
      refreshMessages: function() {
        //use etag later on
        $http.get('/messages').then(function(messagesResponse) {
          messages = messagesResponse.data;
          httpError = null;
        });
      },
      addMessage: function(message) {
        $http.post('/messages', message).then(function(response) {
          messages.push(response.data);
        }, function(error) {
          console.log(errorMsg);
          httpError = {
            errorMessage: errorMsg.statusText,
            errorCode: errorMsg.status
          };
        });
      }
    };
  })
  .controller('MessagesCtrl', function($scope, $interval, messagesSvc) {
    $scope.messages = [];
    $scope.newMessage = {};
    $scope.error = null;
    $scope.version = null;

    messagesSvc.getMessages()
      .then(function(msgList) {
        $scope.messages = msgList;
        $scope.lastUpdate = new Date().toLocaleTimeString();
        $scope.error = null;
        $scope.$apply();
      })
      .catch(function(error) {
        console.error(error);
        $scope.error = error;
        $scope.$apply();
      });

    messagesSvc.getVersion()
      .then(function(version) {
        $scope.version = version;
        $scope.$apply();
      });

    $scope.addNew = function() {
      console.log('add new', $scope.newMessage);
      if ($scope.newMessage.title && $scope.newMessage.body && $scope.newMessage.sender) {
        messagesSvc.addMessage($scope.newMessage);
      }
    };
    $interval(function() {
      $scope.error = null;
      messagesSvc.refreshMessages();
      $scope.lastUpdate = new Date().toLocaleTimeString();
    }, 30000);

  });
