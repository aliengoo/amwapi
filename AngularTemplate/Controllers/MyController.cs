namespace AngularTemplate.Controllers
{
    using System.Web.Http;

    public class MyController : ApiController
    {
        public MyController()
        {
        }

        public IHttpActionResult Get()
        {
            return Ok(new
                      {
                          hello = "World"
                      });
        }
    }
}