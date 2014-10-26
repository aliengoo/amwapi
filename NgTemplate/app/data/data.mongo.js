(function(){
  "use strict";

  angular.module('data').provider('mongoService', mongoServiceProvider);

  function mongoServiceProvider() {
    var that = {};

    that.mongoApiUrl = '';

    that.setMongoApiUrl = function(mongoApiUrl) {
      that.mongoApiUrl = mongoApiUrl;
    };

    that.$get = ['common', function (common) {

      var mongo = {
        get : get,
        query : query,
        save : save,
        remove : remove
      };

      return mongo;

      function get(collection, id, timeout){
        return common.$http({
          method : 'GET',
          timeout : timeout,
          url : that.mongoApiUrl + collection + '/' + id || ''
        });
      }

      function query(collection, remoteMongoQuery, timeout){

        return common.$http({
          method : 'POST',
          data : JSON.stringify(remoteMongoQuery || {}),
          timeout : timeout,
          url : that.mongoApiUrl + collection + '/query'
        });
      }

      function save(collection, doc, timeout) {

        var url = that.mongoApiUrl + collection + '/';

        if (doc.hasOwnProperty('_id')) {
          url += doc._id.$oid || '';
        }

        return common.$http({
          method : 'POST',
          timeout : timeout,
          url : url,
          data : JSON.stringify(doc)
        });
      }

      function remove(collection, id, timeout){
        return common.$http({
          method : 'DELETE',
          timeout : timeout,
          url : that.mongoApiUrl + collection + '/' + id || ''
        });
      }
    }];

    return that;
  }
}());
