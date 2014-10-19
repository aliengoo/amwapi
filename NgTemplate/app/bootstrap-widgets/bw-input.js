(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwInput', bwInput);

  bwInput.$inject = ['bwCompileFn'];

  function bwInput(bwCompileFn) {
    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<input class="form-control bw-input <%= classes %>" <%= attrs %>/>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      compile: bwCompileFn.compileFn([
        'name',
        'ngModel'
      ], template)
    };
  }

}());


