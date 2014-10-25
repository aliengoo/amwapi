namespace NgTemplate.Controllers
{
    using System.Web.Http;
    using System.Web.Http.ModelBinding;

    using MongoDB.Bson;
    using MongoDB.Driver.Builders;

    using NgTemplate.Repositories;

    [RoutePrefix("api/mongo")]
    public class MongoController : ApiController
    {
        private readonly IMongoRepository _mongoRepository;

        public MongoController(IMongoRepository mongoRepository)
        {
            _mongoRepository = mongoRepository;
        }

        [Route("{collectionName}/{id}")]
        public IHttpActionResult Get(string collectionName, [ModelBinder]ObjectId id)
        {
            return Ok(_mongoRepository.FindById(collectionName, id));
        }

        [Route("{collectionName}")]
        public IHttpActionResult Post(string collectionName, BsonDocument document)
        {
            return Ok(_mongoRepository.Save(collectionName, document));
        }

        [Route("{collectionName}/{id}")]
        public IHttpActionResult Post(string collectionName, [ModelBinder]ObjectId id, BsonDocument document)
        {
            return Ok(_mongoRepository.Save(collectionName, document));
        }

        [Route("{collectionName}/{id}")]
        public IHttpActionResult Delete(string collectionName, [ModelBinder]ObjectId id)
        {
            return Ok(_mongoRepository.Remove(collectionName, Query.EQ("_id", id)));
        }
    }
}