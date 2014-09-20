(function () {

  "use strict";

  app.controller('homeCtrl', ['$rootScope', '$scope', '$timeout', '$log', 'helloWorldHub', function ($rootScope, $scope, $timeout, $log, helloWorldHub) {
    $scope.$on('acceptGreet', function (ev, message) {
      $scope.message = message || 'No message';

      $scope.$apply();
    });

    $timeout(function () {
      helloWorldHub.init().then(function (hub) {
        hub.greetAll();
      });

    }, 2000);


  }]);

}());
