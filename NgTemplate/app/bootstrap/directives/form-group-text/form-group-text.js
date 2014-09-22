(function () {
  "use strict";

  window.app.directive('formGroupText', ['$log', function ($log) {

    var template =
      '<div class="form-group" ng-class="{\'has-error\' : hasError, \'has-success\' : hasSuccess}">' +
        '<label class="control-label">#{label}</label>' +
        '<input type="text" class="form-control #{class}" name="#{name}" ng-model="#{bindTo}" #{validationAttr}>' +
        '#{helpBlocks}' +
      '</div>';


    return {
      transclude: true,
      restrict: 'E',
      require: '^form',
      compile : function($el, $attrs){

        // build
        var data = {
          "label" : $attrs.label,
          "class" : $attrs.class || '',
          "name" : $attrs.name,
          "bindTo" : $attrs.bindTo,
          "validationAttr" : ''
        };

        // validation attributes
        var validationOptions = ['required', 'minlength', 'maxlength', 'max', 'min'];

        angular.forEach(validationOptions, function(property) {
          if ($attrs.hasOwnProperty(property)){
            data.validationAttr += "ng-" + property + "='" + $attrs[property] + "' ";
          }
        });

        // help blocks
        var helpBlocks = $el.find('help-block');

        angular.forEach(helpBlocks, function (helpBlock) {
          var helpBlock = angular.element(helpBlock);
        });

        var html = S(template).template(data, '#{', '}').s;

        // clean up parent element
        angular.forEach(['class', 'bind-to', 'name', 'label'], function (attr) {
          $el.removeAttr(attr);
        });

        angular.forEach(validationOptions, function (attr) {
          $el.removeAttr(attr);
        });

        // swap it out
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

