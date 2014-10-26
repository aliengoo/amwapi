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
    'logger',
    'exception',
    'signalR',
    'data',
    'bootstrapWidgets',

    // app features
    'app.home',
    'app.bootstrap-widgets-demo',
    'app.data-demo'

    ]);


}());