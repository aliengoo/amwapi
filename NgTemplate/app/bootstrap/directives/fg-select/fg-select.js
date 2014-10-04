(function () {
  "use strict";

  window.app.directive('fgSelect', ['$log', 'fgCompileFnSvc', function ($log, fgCompileFnSvc) {

    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<select class="form-control fg-input <%= classes %>" <%= attrs %>><%= options %></select>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      compile: fgCompileFnSvc.compileFn([
        'name',
        'ngModel'
      ], template, function($e, $a, data){
        data.options = '';
        // process options, if any
        angular.forEach($e.find('option'), function (option) {
          if (option.outerHTML) {
            data.options += option.outerHTML;
          }
        });
      })
    };

  }]);

}());


