(function () {
  "use strict";

  angular.module('app').config(config);

  config.$inject = [
    '$urlRouterProvider',
    'cfpLoadingBarProvider',
    'localStorageServiceProvider',
    'blockUIConfigProvider'];

  function config($urlRouterProvider, cfpLoadingBarProvider, localStorageServiceProvider, blockUIConfigProvider) {
    // TODO : Uncomment to disable the spinner
    //cfpLoadingBarProvider.includeSpinner = false;


    // TODO : Set the prefix for local storage
    // localStorageServiceProvider.setPrefix('newPrefix');

    blockUIConfigProvider.message('working...');
    $urlRouterProvider.otherwise('/home');
  }
}());






