(function(){
  "use strict";

  angular.module('auth-error').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('auth-error', {
      templateUrl : 'auth-error/auth-error.html',
      controller : 'AuthError',
      controllerAs : 'vm'
    });
  }
}());
