(function () {
  "use strict";

  window.app = angular.module('app', [
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'fx.animations',
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'chieffancypants.loadingBar',
    'cfp.hotkeys',
    'LocalStorageModule']);
}());