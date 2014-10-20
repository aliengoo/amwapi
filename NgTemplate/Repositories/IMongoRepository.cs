namespace NgTemplate.Repositories
{
	using MongoDB.Bson;
	using MongoDB.Driver;

    public interface IMongoRepository
    {
		MongoDatabase Database { get; }

		MongoCollection GetCollection(string name);

		MongoCollection<T> GetCollection<T>(string name);

		MongoCursor Find(string collectionName, IMongoQuery query, int? limit, int? skip, IMongoFields fields, IMongoSortBy sortBy);

		BsonDocument FindOne(string collectionName, IMongoQuery query);

		MongoCursor FindAll(string collectionName, IMongoFields fields, IMongoSortBy sortBy);

		BsonDocument Save(string collectionName, BsonDocument doc);

		BsonDocument FindById(string collectionName, BsonValue id);

		WriteConcernResult Remove(string collectionName, IMongoQuery mongoQuery);
    }
}