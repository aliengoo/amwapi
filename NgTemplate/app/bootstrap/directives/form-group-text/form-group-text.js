(function () {
  "use strict";

  window.app.directive('formGroupText', ['$log', function ($log) {

    var template =
      '<div class="form-group" ng-class="{\'has-error\' : hasError, \'has-success\' : hasSuccess}">' +
        '<label class="control-label">#{label}</label>' +
        '<input type="text" class="form-control #{class}" name="#{name}" ng-model="#{bindTo}" #{ngRequiredAttr}>' +
      '</div>';


    return {
      transclude: true,
      restrict: 'E',
      require: '^form',
      compile : function($el, $attrs){
        var data = {
          "label" : $attrs.label,
          "class" : $attrs.class || '',
          "name" : $attrs.name,
          "bindTo" : $attrs.bindTo
        };

        if ($attrs.hasOwnProperty('mandatory')) {
          data.ngRequiredAttr = "ng-required='"+ $attrs.mandatory + "'";
        }

        var html = S(template).template(data, '#{', '}').s;

        $el.removeAttr('class');
        $el.removeAttr('bind-to');
        $el.removeAttr('name');
        $el.removeAttr('mandatory');
        $el.removeAttr('label');

        $el.html(html);

        return function ($scope, $elem, $attrs, form) {
          $scope.form = form;
          var input = form[$attrs.name];

          $scope.$watch($attrs.bindTo, function (n) {

            $scope.hasError = input.$invalid && input.$dirty;

            $scope.hasSuccess = input.$valid && input.$dirty;
          });
        };
      }
    };
  }]);
}());

