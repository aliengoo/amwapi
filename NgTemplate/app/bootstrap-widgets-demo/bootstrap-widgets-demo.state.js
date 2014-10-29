(function(){

  "use strict";

  angular.module('bootstrap-widgets-demo').config(bootstrapWidgetsDemo);

  bootstrapWidgetsDemo.$inject = ['$stateProvider'];

  function bootstrapWidgetsDemo($stateProvider) {
    $stateProvider.state('bootstrap-widgets-demo', {
      url: '/bootstrap-widgets-demo',
      templateUrl: 'bootstrap-widgets-demo/bootstrap-widgets-demo.html',
      controller: 'BootstrapWidgetsDemo',
      controllerAs : 'vm'
    });
  }
}());
