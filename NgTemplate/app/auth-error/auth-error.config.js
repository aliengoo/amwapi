(function(){
  "use strict";

  angular.module('app.authError').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('auth-error', {
      templateUrl : 'auth-error/auth-error.html',
      controller : 'AuthError',
      controllerAs : 'vm'
    });
  }
}());
