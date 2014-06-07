(function () {

  "use strict";

  app.controller('homeCtrl', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {
    signalRSvc.initialize();

    signalRSvc.greetAll();

    $scope.$on('acceptGreet', function (ev, message) {
      console.log(message);
    });
  }]);

}());
