namespace NgTemplate
{
    using System.Web.Http;

    using NgTemplate.App_Start;

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var config = GlobalConfiguration.Configuration;

            UnityConfig.RegisterComponents();

            // Enable attribute routing
            config.MapHttpAttributeRoutes();

            // Enable default HTTP routing
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.EnsureInitialized(); 
        }
    }
}
