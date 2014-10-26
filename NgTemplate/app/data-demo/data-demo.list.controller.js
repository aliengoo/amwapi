(function () {
  "use strict";

  angular.module('app.data-demo').controller('DataDemoList', DataDemoList);

  DataDemoList.$inject = ['mongoService'];

  function DataDemoList(mongoService) {
    var vm = this;

    vm.loadCustomers = function () {
      mongoService.query('arse', {}).success(function (customers) {
        vm.customers = customers;
      });
    };
  }
}());
