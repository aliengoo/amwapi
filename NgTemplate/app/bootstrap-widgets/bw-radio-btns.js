(function () {

  "use strict";

  angular.module('bootstrapWidgets').directive('bwRadioBtns', bwRadioBtns);

  bwRadioBtns.$inject = ['template'];

  function bwRadioBtns(template) {

    var templateStr = '<div class="btn-group" data-toggle="buttons" ng-form="<%= name %>Form"><%= optionsHtml %></div>';

    var btnTemplate = '<label class="btn btn-primary">' +
      '<input type="radio" value="<%= value %>" name="<%= name %>">' +
      '<%= btnContent %>' +
      '</label>';


    return {
      replace: true,
      restrict: 'E',
      require: '^form',
      scope: {
        ngModel: '='
      },
      compile: function ($e, $a) {

        var optionsHtml = '';

        angular.forEach($e.find('radio-option'), function (option) {

          var value = $(option).attr('value');

          optionsHtml += template.render(btnTemplate, {
            value: value,
            name: $a.name,
            btnContent: $(option).html()
          });
        });

        $e.removeAttr('ngModel name');

        $e.html(template.render(templateStr, {
            optionsHtml: optionsHtml,
            name: $a.name
          }
        ));

        return function ($s, $e, $a, form) {

          var labels = $e.find('label');

          labels.change(function (ev) {

            labels.removeClass('active');
            $(ev.target).addClass('active');

            $s.ngModel = ev.target.value;
            $s.$apply();
          });

          labels.removeClass('active');

          var checkedLabel = $($e.find("input[value='" + $s.ngModel + "']")).parent('label');

          $(checkedLabel).addClass('active');
        };
      }
    };
  }


}());
