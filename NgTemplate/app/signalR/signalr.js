(function(){

  "use strict";

  angular.module('signalR').factory('signalR', signalR);

  signalR.$inject = ['common'];

  function signalR(common){

    var connection = $.hubConnection('signalR');
    connection.logging = true;

    var hubs = {};

    var that = {
      hubs : {},
      start : start,
      create: create
    };

    return that;

    // implementation

    function start(){
      var d = common.$q.defer();

      //Starting connection
      connection.start().done(function () {
        d.resolve(connection);
      }).fail(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function create(hubName, extend) {
      if (hubs.hasOwnProperty(hubName)) {
        return $q.when(hubs[hubName]);
      }

      if (!extend) {
        throw Error("extend argument required");
      }

      hubs[hubName] = connection.createHubProxy(hubName);

      extend(hubs[hubName]);

      if ($.signalR.connectionState.connected) {
        connection.stop();
      }

      var d = common.$q.defer();

      that.start().then(function () {
        d.resolve(hubs[hubName]);
      }, function (error) {
        d.reject(error);
      });

      return d.promise;
    }
  }

}());

