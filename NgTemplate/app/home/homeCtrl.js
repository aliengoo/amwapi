(function () {

  "use strict";

  app.controller('homeCtrl', ['$rootScope', '$scope', 'helloWorldHub', function ($rootScope, $scope, helloWorldHub) {
    $scope.$on('acceptGreet', function (ev, message) {
      $scope.message = message || 'No message';
    });

    helloWorldHub.init().then(function (hub) {
      hub.greetAll();
    });


  }]);

}());
