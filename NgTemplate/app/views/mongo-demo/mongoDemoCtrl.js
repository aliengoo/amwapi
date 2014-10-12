(function(){

  "use strict";

  window.app.controller('mongoDemoCtrl', ['$scope', '$log', 'mongoSvc', function($scope, $log, mongoSvc) {

    $scope.request = {
      collection : 'customers',
      query : {
        firstName : 'Glenn'
      }
    };

    $scope.inProgress = false;

    $scope.search = function() {

      $scope.inProgress = true;

      mongoSvc.find($scope.request).then(function(result) {
        $scope.result = result;
      }, function(error) {
        $log.error(error);
      }).finally(function() {
          $scope.inProgress = false;
        });
    };

    $scope.save = function() {
      $scope.inProgress = true;

      $scope.request.data = angular.copy($scope.request.query);
      delete $scope.request.query;

      mongoSvc.save($scope.request).then(function(result) {
        $scope.result = result;
      }, function(error) {
        $log.error(error);
      }).finally(function() {
        $scope.inProgress = false;
      });

    };

  }]);

}());
