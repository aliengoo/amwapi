namespace NgTemplate.Controllers
{
    using System.Web.Http;

    using Newtonsoft.Json.Linq;

    using NgTemplate.Repositories;

    [RoutePrefix("api/collection")]
    public class CollectionController : ApiController
    {
        private readonly IRepository _repository;

        public CollectionController(IRepository repository)
        {
            _repository = repository;
        }

        [Route("{collection}/find")]
        public IHttpActionResult PostFind(JObject request, string collection = null)
        {
            if (!string.IsNullOrWhiteSpace(collection))
            {
                request["collection"] = collection;
            }

            var results = _repository.Find(request);

            return Ok(results);
        }

        [Route("{collection}/find-by-id")]
        public IHttpActionResult PostFindById(JObject request, string collection = null)
        {
            if (!string.IsNullOrWhiteSpace(collection))
            {
                request["collection"] = collection;
            }

            var result = _repository.FindById(request);

            return Ok(result);
        }

        [Route("{collection}/save")]
        public IHttpActionResult PostSave(JObject request, string collection = null)
        {
            if (!string.IsNullOrWhiteSpace(collection))
            {
                request["collection"] = collection;
            }

            var result = _repository.Save(request);

            return Ok(result);
        }
    }
}