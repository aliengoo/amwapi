namespace NgTemplate.Repositories
{
    using MongoDB.Driver;

    public interface IMongoRepository : IRepository
    {
        MongoDatabase Database { get; }

        MongoCollection GetCollection(string name);

        MongoCollection<T> GetCollection<T>(string name);
    }
}