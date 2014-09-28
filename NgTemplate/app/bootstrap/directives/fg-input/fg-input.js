(function () {
  "use strict";

  window.app.directive('fgInput', ['$log', function ($log) {

    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : hasError(), \'has-success\' : hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<input class="form-control fg-input <%= classes %>" <%= attrs %>/>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';

    var helpBlockTemplate = '<span class="help-block <%= classes %>" <%= attrs %>><%= text %></span>';

    return {
      restrict: 'E',
      require: '^form',
      compile: function ($e, $a) {
        var errors = [];

        if (!$a.hasOwnProperty('name') || angular.isUndefined($a.name)) {
          errors.push("fg-input requires a <code>name</code> attribute");
        }

        if (!$a.hasOwnProperty('ngModel') || angular.isUndefined($a.ngModel)) {
          errors.push("fg-input requires an <code>ng-model</code> attribute");
        }

        if (errors.length > 0) {
          var errorsHtml = '<section class="panel panel-danger"><header class="panel-heading"><h4>fg-input directive error</h4></header><div class="panel-body"></div><ul>';

          angular.forEach(errors, function (error) {
            errorsHtml += _.template('<li class="text-danger"><%= error %></li>')({
              error: error
            });

            $log.error(error);
          });

          errorsHtml += "</ul></div></section>";

          $e.html(errorsHtml);

          return;
        }

        var data = {
          attrs: '',
          classes: '',
          labels: '',
          helpBlocks: '',
          childFormName : $a.name + "Form"
        };

        // process help blocks
        angular.forEach($e.find('help-block'), function (helpBlock) {

          var helpBlockAttrs = '';
          var helpBlockClasses = '';

          angular.forEach(helpBlock.attributes, function (attr) {

            if (attr.localName === 'class') {
              helpBlockClasses += attr.value;
            } else {
              helpBlockAttrs += attr.localName + "='" + attr.value + "'";
            }

          });

          data.helpBlocks += _.template(helpBlockTemplate)({
            text: helpBlock.innerText,
            attrs: helpBlockAttrs,
            classes: helpBlockClasses
          });

          $(helpBlock).remove();
        });

        // process labels
        angular.forEach($e.find('label'), function (label) {
          if (label.outerHTML) {
            data.labels += label.outerHTML;
          }
        });

        // process attributes
        angular.forEach(Object.keys($a), function (key) {
          if (!S(key).startsWith('$')) {
            if (key === "class") {
              data.classes += $a[key];
            } else {
              data.attrs += $a.$attr[key] + "='" + $a[key] + "' ";
            }
          }

          $e.removeAttr($a.$attr[key]);
        });


        var html = _.template(template)(data);

        $e.html(html);

        $($e).find('label').addClass('control-label');

        return function ($s, $e, $a, form) {

          $s.form = form;

          var inputElement = angular.element($($e).find('input[name="' + $a.name + '"]').first());
          $s[$a.name + "Element"] = inputElement;

          var input = inputElement.controller('ngModel');
          $s[$a.name] = input;

          $s.hasError = function () {
            return input.$invalid && input.$dirty;
          };

          $s.hasSuccess = function () {
            return input.$valid && input.$dirty;
          };

          var startupWatch = $s.$watch(function () {
            return input.$modelValue;
          }, function(n, o){
            if (input.$pristine && n && n.length > 0) {
              input.$dirty = true;
              input.$pristine = false;

              startupWatch();
            }
          });
        };
      }
    };

  }]);

}());


