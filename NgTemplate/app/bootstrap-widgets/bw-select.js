(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwSelect', bwSelect);

  bwSelect.$inject = ['bwCompileFn'];

  function bwSelect(bwCompileFn) {

    var templateStr =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<select class="form-control bw-input <%= classes %>" <%= attrs %>><%= options %></select>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      compile: bwCompileFn.compileFn([
        'name',
        'ngModel'
      ], templateStr, function ($e, $a, data) {
        data.options = '';
        // process options, if any
        angular.forEach($e.find('option'), function (option) {
          if (option.outerHTML) {
            data.options += option.outerHTML;
          }
        });
      })
    };
  }

}());


