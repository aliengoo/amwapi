(function () {

  "use strict";

  app.factory('helloWorldHub', ['$rootScope', '$log', '$q', 'signalRSvc', function ($rootScope, $log, $q, signalRSvc) {

    var self = this;

    self.that = undefined;

    return {
      init: function () {

        var d = $q.defer();

        if (!self.that) {
          signalRSvc.addHub('helloWorldHub', function(hub){

            // TODO : methods and handlers get added here...
            hub.on('acceptGreet', function (message) {
              $rootScope.$broadcast('acceptGreet', message);
            });

            self.that = {
              greetAll: function () {
                hub.invoke('greetAll');
              }
            };

          }).then(function () {
            d.resolve(self.that);
          }, function (error) {

            d.reject(error);
          });
        } else {
          d.resolve(self.that);
        }

        return d.promise;
      }
    };

  }]);

}());

