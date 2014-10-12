namespace NgTemplate.Repositories
{
    using System.Configuration;

    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Driver;
    using MongoDB.Driver.Builders;

    public class SequenceIdGenerator : IIdGenerator
    {
        private class Sequence
        {
            [BsonId]
            public string Name { get; set; }

            public int Value { get; set; }
        }

        private readonly MongoCollection<Sequence> _collection;

        public SequenceIdGenerator(string connectionStringName, string collectionName = "Sequences")
        {
            var url = ConfigurationManager.ConnectionStrings[connectionStringName].ConnectionString;

            var mongoUrl = MongoUrl.Create(url);

            var database = new MongoClient(mongoUrl).GetServer().GetDatabase(mongoUrl.DatabaseName);

            _collection = database.GetCollection<Sequence>(collectionName);
        }

        public virtual object GenerateId(object container, object document)
        {
            return NextVal(document.GetType().Name);
        }

        public virtual bool IsEmpty(object id)
        {
            return id != null;
        }

        private int NextVal(string sequenceName)
        {
            var nextVal = 1;

            var q = Query.EQ("_id", sequenceName);

            if (_collection.FindOne(q) == null)
            {
                var sequence = new Sequence
                {
                    Value = nextVal,
                    Name = sequenceName
                };

                _collection.Insert(sequence);
            }


            var findAndModifyArgs = new FindAndModifyArgs
                                    {
                                        Query = q,
                                        Update = Update.Inc("Value", 1),
                                        VersionReturned = FindAndModifyDocumentVersion.Modified
                                    };
            var result = _collection.FindAndModify(findAndModifyArgs);

            BsonValue value;

            if (result.ModifiedDocument.TryGetValue("Value", out value))
            {
                nextVal = value.AsInt32;
            }

            return nextVal;
        }
    }
}