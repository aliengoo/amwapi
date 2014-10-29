namespace NgTemplate.Seed
{
    using System.Dynamic;

    using MongoDB.Bson;

    using NgTemplate.Repositories;

    public class SeedRoles
    {
        private readonly IMongoRepository _mongoRepository;

        public SeedRoles(IMongoRepository mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }

        public void Init()
        {
            if (_mongoRepository.Database.CollectionExists("roles"))
            {
                return;
            }

            var roles = _mongoRepository.GetCollection("roles");
           
            var adminRole = new BsonDocument
                            {
                                { "roles", new BsonArray(new[] { "admin" }) },
                                {
                                    "collections",
                                    new BsonArray(
                                    new[]
                                    {
                                        new BsonDocument { { "name", "*" }, { "r", true }, { "w", true } }
                                    })
                                }
                            };

            roles.Insert(adminRole);
        }
    }
}