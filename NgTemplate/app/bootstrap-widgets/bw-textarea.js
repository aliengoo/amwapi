(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwTextarea', bwTextarea);

  bwTextarea.$inject = ['bwCompileFn'];

  function bwTextarea(bwCompileFn) {
    var templateStr =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<textarea class="form-control fg-input <%= classes %>" <%= attrs %>></textarea>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      compile: bwCompileFn.compileFn([
        'name',
        'ngModel'
      ], templateStr)
    };
  }

}());


