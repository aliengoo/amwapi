(function () {
  "use strict";

  angular.module('home').factory('homeHub', homeHub);

  homeHub.$inject = ['$rootScope', 'common', 'signalR'];

  function homeHub($rootScope, common, signalR){
    var self = {};

    self.that = undefined;

    return {
      init: function () {

        var d = common.$q.defer();

        if (!self.that) {
          signalR.create('homeHub', function(hub){

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
  }
}());

