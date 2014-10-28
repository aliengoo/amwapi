namespace NgTemplate.Filters
{
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    using NgTemplate.Helpers;

    public class MongoAuthorizationFilterAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var basicCredentials = actionContext.GetBasicCredentials();


            base.OnAuthorization(actionContext);
        }
    }
}