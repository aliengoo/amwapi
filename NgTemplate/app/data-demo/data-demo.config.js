(function(){
  "use strict";

  angular.module('data-demo').config(config);

  config.$inject = ['$stateProvider', 'mongoServiceProvider'];

  function config($stateProvider, mongoServiceProvider) {

    $stateProvider.state('data-demo', {
      url : '/data-demo',
      templateUrl : 'data-demo/data-demo.html',
      controller : 'DataDemo',
      controllerAs : 'vm'
    });

    $stateProvider.state('data-demo-list', {
      url : '/data-demo-list',
      templateUrl : 'data-demo/data-demo.list.html',
      controller : 'DataDemoList',
      controllerAs : 'vm'
    });

    // TODO : Set base Mongo URL
    mongoServiceProvider.setMongoApiUrl('api/mongo/');
  }
}());
