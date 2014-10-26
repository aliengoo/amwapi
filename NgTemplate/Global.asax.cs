namespace NgTemplate
{
    using System.Web.Http;
    using System.Web.Http.ModelBinding;

    using MongoDB.Bson;

    using NgTemplate.App_Start;
    using NgTemplate.Converters;
    using NgTemplate.CustomModelBinders;

    using SimpleModelBinderProvider = System.Web.Http.ModelBinding.Binders.SimpleModelBinderProvider;

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var config = GlobalConfiguration.Configuration;

            var formatters = config.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.Converters.Add(new BsonDocumentJsonConverter());
            jsonFormatter.SerializerSettings.Converters.Add(new RemoteMongoQueryConverter());
           
            var objectIdModelBinderProvider = new SimpleModelBinderProvider(typeof(ObjectId), new ObjectIdModelBinder());
            config.Services.Insert(typeof(ModelBinderProvider), 0, objectIdModelBinderProvider);
            
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
