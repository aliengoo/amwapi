(function(){

  "use strict";

  window.app.controller('mongoDemoCtrl', ['$scope', '$log', 'mongoSvc', 'querySvc', function($scope, $log, mongoSvc, querySvc) {

    $scope.request = {
      collection : 'customers',
      query : {
        firstName : 'Glenn'
      }
    };

    $scope.inProgress = false;

    $scope.search = function() {

      var lastNamePredicate = querySvc.createQuery().match('lastName', 'n', 'i');

      var actual = lastNamePredicate;


      $scope.inProgress = true;

      var state = actual.getState();
      state.collection = 'customers';

      console.log(state);

      mongoSvc.find(state).then(function(result) {
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
