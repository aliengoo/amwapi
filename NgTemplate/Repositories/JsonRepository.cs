namespace NgTemplate.Repositories
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;

    using NgTemplate.Helpers;

    using MongoDB.Driver;

    using Newtonsoft.Json.Linq;

    public class JsonRepository : IJsonRepository
    {
	    private readonly IMongoRepository _mongoRepository;

	    private readonly IIdGenerator _idGenerator;

        public JsonRepository(IMongoRepository mongoRepository, IIdGenerator idGenerator)
        {
	        _mongoRepository = mongoRepository;
	        _idGenerator = idGenerator;
        }

        public JArray Find(JObject request)
        {
            return new MongoQueryData(_mongoRepository.Database, request).Find().ToJArray();
        }

        public JObject FindOne(JObject request)
        {
			return new MongoQueryData(_mongoRepository.Database, request).FindOne().ToJObject();
        }

        public JArray FindAll(JObject request)
        {
			return new MongoQueryData(_mongoRepository.Database, request).FindAll().ToJArray();
        }

        public JObject Save(JObject request)
        {
            var collectionName = request["collection"];

            if (collectionName == null)
            {
                throw new MongoRepositoryException("No collection property defined");
            }

            var doc = BsonDocument.Parse((request["data"] ?? "{}").ToString());

			// TODO : Switch to convention pack.
            if (!doc.Contains("_id"))
            {
				doc.Add("_id", BsonValue.Create(_idGenerator.GenerateId(_mongoRepository.GetCollection(collectionName.Value<string>()), doc)));
            }

	        _mongoRepository.Save(collectionName.Value<string>(), doc);

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

            var collection = _mongoRepository.GetCollection(collectionName.Value<string>());

            if (id.Type == JTokenType.Object && id["$oid"] != null)
            {
	            return _mongoRepository.FindById(
		            collectionName.Value<string>(),
		            ObjectId.Parse(id["$oid"].Value<string>())).ToJObject();
            }
            
            if (id.Type == JTokenType.String)
            {

				return _mongoRepository.FindById(
					collectionName.Value<string>(),
					id.Value<string>()).ToJObject();
            }
            
            if (id.Type == JTokenType.Integer)
			{
				return _mongoRepository.FindById(
					collectionName.Value<string>(),
					id.Value<int>()).ToJObject();
            }
                
            throw new MongoRepositoryException("Invalid id");
        }

        public JObject Remove(JObject request)
        {
            var collectionName = request["collection"];

            if (collectionName == null)
            {
                throw new MongoRepositoryException("No collection property defined");
            }

            var query = request["query"];

            if (query == null)
            {
                throw new MongoRepositoryException("Query must be defined");
            }

            var actualQuery = new QueryDocument(BsonDocument.Parse((request["query"] ?? "{}").ToString()));

			var writeConcernResult = _mongoRepository.Remove(collectionName.Value<string>(), actualQuery);

            return JObject.FromObject(writeConcernResult);
        }
    }
}