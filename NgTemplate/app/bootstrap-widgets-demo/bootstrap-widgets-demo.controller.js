(function () {
  "use strict";

  angular.module('app.bootstrap-widgets-demo').controller('BootstrapWidgetsDemo', BootstrapWidgetDemo);

  function BootstrapWidgetDemo() {
    /* jshint validthis: true */
    var vm = this;

    vm.title = 'Mr';
    vm.gender = 'male';
  }

}());
