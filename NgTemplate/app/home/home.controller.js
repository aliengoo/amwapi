(function () {

  "use strict";

  angular.module('home').controller('Home', Home);

  Home.$inject = ['$scope', 'common', 'homeHub'];

  function Home($scope, common, homeHub) {
    var vm = this;

    $scope.$on('acceptGreet', function (ev, message) {
      vm.message = message || 'No message';
      $scope.$apply();
    });

    common.$timeout(function () {
      homeHub.init().then(function (hub) {
        hub.greetAll();
      });
    }, 2000);
  }

}());

