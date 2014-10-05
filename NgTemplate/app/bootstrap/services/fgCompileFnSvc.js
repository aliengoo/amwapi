(function () {

  "use strict";

  window.app.factory('fgCompileFnSvc', ['$log', 'validateAttrsSvc', 'renderErrors', 'renderHelpBlocks', function ($log, validateAttrsSvc, renderErrors, renderHelpBlocks) {

    var CompileFactory = function (requiredAttrs, template, preTemplateFn) {

      var self = this;

      self.requiredAttrs = requiredAttrs;
      self.template = template;
      self.preTemplateFn = preTemplateFn;
      self.compile = function ($e, $a) {
        var errors = [];

        validateAttrsSvc.validate($a, self.requiredAttrs, errors);

        if (errors.length > 0) {
          $e.html(renderErrors.render($e.context.nodeName.toLowerCase() + " Errors", errors));
          return;
        }

        var data = {
          attrs: '',
          classes: '',
          labels: '',
          helpBlocks: '',
          name : $a.name,
          childFormName: $a.name + "Form"
        };

        // process help blocks
        data.helpBlocks = renderHelpBlocks.render($e);

        // process labels
        angular.forEach($e.find('label'), function (label) {
          if (label.outerHTML) {
            data.labels += label.outerHTML;
          }
        });

        // process attributes
        angular.forEach(Object.keys($a), function (key) {
          if (key.indexOf('$') !== 0) {
            if (key === "class") {
              data.classes += $a[key];
            } else {
              data.attrs += $a.$attr[key] + "='" + $a[key] + "' ";
            }
          }

          $e.removeAttr($a.$attr[key]);
        });

        if (self.preTemplateFn) {
          self.preTemplateFn($e, $a, data, template);
        }

        var html = _.template(self.template)(data);

        $e.html(html);

        $($e).find('label').addClass('control-label');

        return function($s, $e, $a, form){
          $s.form = form;

          var element = angular.element($($e).find('[name="' + $a.name + '"]').first());

          $s[$a.name + "Element"] = element;

          var ngModelCtrl = element.controller('ngModel');
          $s[$a.name] = ngModelCtrl;

          $s[$a.name + 'hasError'] = function () {
            return ngModelCtrl.$invalid && ngModelCtrl.$dirty;
          };

          $s[$a.name + 'hasSuccess'] = function () {
            return ngModelCtrl.$valid && ngModelCtrl.$dirty;
          };

          var startupWatch = $s.$watch(function () {
            return ngModelCtrl.$modelValue;
          }, function (n) {
            if (ngModelCtrl.$pristine && n && n.length > 0) {
              ngModelCtrl.$dirty = true;
              ngModelCtrl.$pristine = false;

              startupWatch();
            }
          });
        };
      };
    };


    return {
      compileFn: function (requiredAttrs, template, preTemplateFn) {
        return new CompileFactory(requiredAttrs, template, preTemplateFn).compile;
      }
    };

  }]);

}());


