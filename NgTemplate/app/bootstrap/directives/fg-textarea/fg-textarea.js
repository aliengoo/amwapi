(function () {
  "use strict";

  window.app.directive('fgTextarea', ['$log', 'fgCompileFnSvc', function ($log, fgCompileFnSvc) {

    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<textarea class="form-control fg-input <%= classes %>" <%= attrs %>></textarea>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      compile: fgCompileFnSvc.compileFn([
        'name',
        'ngModel'
      ], template)
    };

  }]);

}());


