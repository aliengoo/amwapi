namespace NgTemplate.Repositories
{
    using System;

    using MongoDB.Bson;
    using MongoDB.Driver;

    using Newtonsoft.Json.Linq;

    public class MongoQueryData
    {
        private readonly MongoDatabase _db;

        public MongoQueryData(MongoDatabase db, JObject request)
        {
            _db = db;
            Collection = GetCollection(request);
            Query = new QueryDocument(BsonDocument.Parse((request["query"] ?? "{}").ToString()));
            Limit = (int?)request["limit"];
            Skip = (int?)request["skip"];
            SortBy = new SortByDocument(BsonDocument.Parse((request["sortBy"] ?? "{}").ToString()));
            Fields = new FieldsDocument(BsonDocument.Parse((request["fields"] ?? "{}").ToString()));
        }

        public MongoCollection Collection { get; set; }

        public IMongoQuery Query { get; set; }

        public IMongoSortBy SortBy { get; set; }

        public int? Limit { get; set; }

        public int? Skip { get; set; }

        public IMongoFields Fields { get; set; }

        private MongoCollection GetCollection(JObject request)
        {
            var collectionName = request["collection"].Value<string>();

            return GetCollection(collectionName);
        }

        private MongoCollection GetCollection(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException("name", "Collection name cannot be null, empty or whitespace");
            }

            return _db.GetCollection(name);
        }

        public MongoCursor Find()
        {
            var find = Collection.FindAs<BsonDocument>(Query);

            find.SetSortOrder(SortBy);
            find.SetFields(Fields);

            if (Limit.HasValue)
            {
                find.SetLimit(Limit.Value);
            }

            if (Skip.HasValue)
            {
                find.SetSkip(Skip.Value);
            }
            
            return find;
        }

        public MongoCursor FindAll()
        {
            var find = Collection.FindAllAs<BsonDocument>();

			find.SetSortOrder(SortBy);
			find.SetFields(Fields);

            if (Limit.HasValue)
            {
                find.SetLimit(Limit.Value);
            }

            if (Skip.HasValue)
            {
                find.SetSkip(Skip.Value);
            }

            find.SetFields(Fields);
            
            return find;
        }

        public BsonDocument FindOne()
        {
            return Collection.FindOneAs<BsonDocument>(Query);
        }
    }
}