(function () {

  "use strict";

  angular.module('data').factory('mongo', mongo);

  mongo.$inject = ['common', 'logger'];

  function mongo(common, logger) {
    var mongoSelf = {
      newCollectionRepository : newCollectionRepository,
      newQuery : newQuery
    };

    /**
     * Collection repository
     * @param baseApiUrl e.g. virtual-directory/api/
     * @param collection - the name of the collection
     * @returns {{find: find, save: save, collection: *}}
     * @constructor
     */
    function CollectionRepository(baseApiUrl, collection) {

      function execute(clearEmpty, data, canceller) {

        if (clearEmpty) {
          common.obj.clearEmptyProps(data);
        }

        //https://github.com/angular/angular.js/issues/1463
        return common.$http({
            method: 'POST',
            url: baseApiUrl + "/collection/" + collection + "/find",
            data: JSON.stringify(data),
            timeout: canceller
          }
        );
      }

      var that = {
        find: find,
        save: save,
        collection: collection
      };

      function find(data, canceller) {
        return execute(true, data, canceller);
      }

      function save(data, canceller) {
        return execute(false, data, canceller);
      }

      return that;
    }

    function Query(){

      var self = this;
      self.state = {
        query : {}
      };
      self.that = {
        and : function(queries){

          if (angular.isDefined(queries)){

            var current = angular.copy(self.state.query);

            if (angular.isArray(queries)) {
              queries.push(current);
              self.state.query = {
                $and : _.map(queries, function(q){
                  return q.getState().query;
                })
              };
            } else {
              self.state.query = {
                $and : [queries.getState().query, current]
              };
            }
          }

          return self.that;
        },
        or : function(queries){

          if (angular.isDefined(queries)){

            var current = angular.copy(self.state.query);

            if (angular.isArray(queries)) {
              queries.push(current);
              self.state.query = {
                $or : _.map(queries, function(q){
                  return q.getState().query;
                })
              };
            } else {
              self.state.query = {
                $or : [queries.getState().query, current]
              };
            }
          }

          return self.that;
        },
        eq : function(property, value) {
          self.state.query[property] = value;
          return self.that;
        },
        ne : function(property, value) {
          self.state.query[property] = {
            $ne : value
          };
          return self.that;
        },
        /**
         * http://docs.mongodb.org/manual/reference/operator/query/gt/#op._S_gt
         * @param property
         * @param value
         * @returns {{and: and, or: or, eq: eq, ne: ne, gt: gt, gte: gte, lt: lt, lte: lte, in: in, nin: nin, match: match, sortBy: sortBy, limit: limit, skip: skip, getState: getState}|*|Query.that}
         */
        gt : function(property, value){
          self.state.query[property] = {
            $gt : value
          };

          return self.that;
        },
        gte : function(property, value) {
          self.state.query[property] = {
            $gte : value
          };

          return self.that;
        },
        lt : function(property, value){
          self.state.query[property] = {
            $lt : value
          };

          return self.that;
        },
        lte : function(property, value) {
          self.state.query[property] = {
            $lte : value
          };

          return self.that;
        },
        in : function(property, value) {
          if (angular.isArray(value)){
            self.state.query[property] = {
              $in : value
            };
          } else {
            logger.error("Query.in requires an array value");
          }

          return self.that;
        },
        nin : function(property, value) {
          if (angular.isArray(value)){
            self.state.query[property] = {
              $nin : value
            };
          } else {
            logger.error("Query.nin requires an array value");
          }

          return self.that;
        },
        /**
         * http://docs.mongodb.org/manual/reference/operator/query/regex/#op._S_regex
         * @param property
         * @param regularExpression
         * @param options
         * @returns {{and: and, or: or, eq: eq, ne: ne, gt: gt, gte: gte, lt: lt, lte: lte, in: in, nin: nin, match: match, sortBy: sortBy, limit: limit, skip: skip, getState: getState}|*|Query.that}
         */
        match : function(property, regularExpression, options){
          self.state.query[property] = {
            $regex : regularExpression
          };

          if (angular.isDefined(options)) {
            self.state.query[property].$options = options;
          }
          return self.that;
        },
        sortBy : function(property, direction){
          if (!state.hasOwnProperty('sortBy')){
            self.state.sortBy = {};
          }

          if (angular.isNumber(direction)){
            self.state.sortBy[property] = direction;
          } else {
            delete self.state.sortBy[property];
          }

          return self.that;
        },
        limit : function(limit) {

          if (angular.isNumber(limit)) {
            self.state.limit = limit;
          } else {
            delete self.state.limit;
          }
        },
        skip : function(skip){
          if (angular.isNumber(skip)) {
            self.state.skip = skip;
          } else {
            delete self.state.skip;
          }
        },
        getState : function() {
          return self.state;
        }
      };
      return self.that;
    }

    function newCollectionRepository(baseApiUrl, collection) {
      
      if (angular.isUndefined(baseApiUrl)){
        logger.error('data.mongo.CollectionRepository requires a baseApiUrl');
        return;
      }
      
      if (angular.isUndefined(collection) || !angular.isString(collection)){
        logger.error('data.mongo.CollectionRepository requires a collection name');
        return;
      }
      
      return new CollectionRepository(baseApiUrl, collection);      
    }
    
    function newQuery() {
      return new Query();
    }

    return mongoSelf;
  }
}());
