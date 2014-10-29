(function(){
  "use strict";

  angular.module('server-error').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('server-error', {
      controller : 'ServerError',
      controllerAs : 'vm',
      templateUrl : 'server-error/server-error.html'
    });
  }
}());
