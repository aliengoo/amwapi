(function(){
  "use strict";

  angular.module('home').config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];

  function homeConfig($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'Home',
      controllerAs : 'vm'
    });
  }

}());
