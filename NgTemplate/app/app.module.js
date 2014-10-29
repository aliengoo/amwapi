(function () {
  "use strict";

  angular.module('app', [
    // Angularjs
    'ngResource',
    'ngCookies',
    'ngAnimate',

    // third-party modules
    'toastr',
    'ngFx',
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'angular-loading-bar',
    'cfp.hotkeys',
    'LocalStorageModule',
    'ui.select2',
    'blockUI',

    // app modules
    'lodash',
    'moment',
    'common',
    'exception',
    'signalR',
    'data',
    'bootstrapWidgets',

    // app features
    'auth',
    'auth-error',
    'server-error',
    'home',
    'bootstrap-widgets-demo',
    'data-demo'

    ]);


}());