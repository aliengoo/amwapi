(function () {
  "use strict";

  angular.module('app').config(config);

  config.$inject = [
    '$httpProvider',
    '$urlRouterProvider',
    'cfpLoadingBarProvider',
    'localStorageServiceProvider',
    'authInterceptorServiceProvider',
    'serverErrorServiceProvider',
    'blockUIConfigProvider'];

  function config($httpProvider, $urlRouterProvider, cfpLoadingBarProvider, localStorageServiceProvider, authInterceptorServiceProvider, serverErrorServiceProvider, blockUIConfigProvider) {

    authInterceptorServiceProvider.setLocationOnStatus('/auth-error', 401);

    $httpProvider.interceptors.push('authInterceptorService');

    // TODO : Uncomment to disable the spinner
    //cfpLoadingBarProvider.includeSpinner = false;


    // TODO : Set the prefix for local storage
    // localStorageServiceProvider.setPrefix('newPrefix');

    blockUIConfigProvider.message('working...');
    $urlRouterProvider.otherwise('/home');
  }
}());






