(function () {
  "use strict";

  angular.module('app.data-demo').controller('DataDemo', DataDemo);

  DataDemo.$inject = ['mongoService'];

  function DataDemo(mongoService) {
    var vm = this;

    vm.get = function() {
      mongoService.get('arse', '544b8cde8356691ae09f2d71').success(function(customer) {
        vm.customer = customer;
      });
    };

    vm.save = function() {
      mongoService.save('arse', vm.customer).success(function (customer) {
        vm.customer = customer;
      });
    };
  }
}());