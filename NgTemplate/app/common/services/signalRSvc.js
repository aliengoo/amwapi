(function () {

  "use strict";

  app.factory('signalRSvc', ['$rootScope', '$log', '$q', function ($rootScope, $log, $q) {

    var connection = $.hubConnection('signalR');

    connection.logging = true;

    var hubs = {};

    var that = {
      hubs : {},
      start : function(){
        var d = $q.defer();

        //Starting connection
        connection.start().done(function () {
          d.resolve(connection);
        }).fail(function (err) {
          d.reject(err);
        });

        return d.promise;
      },
      create: function (hubName, extend) {
        if (hubs.hasOwnProperty(hubName)){
          return $q.when(hubs[hubName]);
        }

        if (!extend) {
          throw Error("extend argument required");
        }

        hubs[hubName] = connection.createHubProxy(hubName);

        extend(hubs[hubName]);

        if ($.signalR.connectionState.connected){
          connection.stop();
        }

        var d = $q.defer();

        this.start().then(function(){
          d.resolve(hubs[hubName]);
        }, function(error) {
          d.reject(error);
        });

        return d.promise;
      }
    };

    return {
      start : that.start,
      create : that.create
    };
  }]);

}());
