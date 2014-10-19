(function () {
  "use strict";
  window.app = angular.module('app', [
    // Angularjs

    'ngResource',
    'ngCookies',
    'ngAnimate',

    // application modules
    'common',

    // third-party modules

    'ngFx',
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'angular-loading-bar',
    'cfp.hotkeys',
    'LocalStorageModule',
    'ui.select2',
    'blockUI']);


}());