namespace NgTemplate.Controllers
{
    using System.Web.Http;

    [RoutePrefix("api/my-controller")]
    public class MyController : ApiController
    {
        public MyController()
        {
        }

        [Route]
        public IHttpActionResult Get()
        {
            return Ok(new
                      {
                          hello = "World"
                      });
        }
    }
}