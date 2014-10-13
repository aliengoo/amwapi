namespace NgTemplate.Repositories
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;

    using NgTemplate.Helpers;

    using MongoDB.Driver;

    using Newtonsoft.Json.Linq;

    public class MongoRepository : IRepository
    {
        private readonly MongoDatabase _db;

        private readonly IIdGenerator _idGenerator;

        public MongoRepository(MongoDatabase db, IIdGenerator idGenerator)
        {
            _db = db;
            _idGenerator = idGenerator;
        }

        public JArray Find(JObject request)
        {
            return new MongoQueryData(_db, request).Find().ToJArray();
        }

        public JObject FindOne(JObject request)
        {
            return new MongoQueryData(_db, request).FindOne().ToJObject();
        }

        public JArray FindAll(JObject request)
        {
            return new MongoQueryData(_db, request).FindAll().ToJArray();
        }

        public JObject Save(JObject request)
        {
            var collectionName = request["collection"];

            if (collectionName == null)
            {
                throw new MongoRepositoryException("No collection property defined");
            }

            var collection = _db.GetCollection(collectionName.Value<string>());

            var doc = BsonDocument.Parse((request["data"] ?? "{}").ToString());

			// TODO : Switch to convention pack.
            if (!doc.Contains("_id"))
            {
                doc.Add("_id", BsonValue.Create(_idGenerator.GenerateId(collection, doc)));
            }

            collection.Save(doc);

            return doc.ToJObject();
        }

        public JObject FindById(JObject request)
        {
            var id = request["_id"];

            if (id == null)
            {
                throw new MongoRepositoryException("No _id property defined");
            }

            var collectionName = request["collection"];

            if (collectionName == null)
            {
                throw new MongoRepositoryException("No collection property defined");
            }

            var collection = _db.GetCollection(collectionName.Value<string>());

            if (id.Type == JTokenType.Object && id["$oid"] != null)
            {
                return collection.FindOneByIdAs<BsonDocument>(ObjectId.Parse(id["$oid"].Value<string>())).ToJObject();
            }
            
            if (id.Type == JTokenType.String)
            {
                return collection.FindOneByIdAs<BsonDocument>(id.Value<string>()).ToJObject();
            }
            
            if (id.Type == JTokenType.Integer)
            {
                return collection.FindOneByIdAs<BsonDocument>(id.Value<int>()).ToJObject();
            }
                
            throw new MongoRepositoryException("Invalid id");
        }
    }
}