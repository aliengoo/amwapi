namespace NgTemplate.App_Start
{
    using System.Web.Configuration;
    using System.Web.Http;
    using System.Web.Http.ModelBinding;
    using System.Web.Http.ModelBinding.Binders;

    using MongoDB.Bson;

    using NgTemplate.Converters;
    using NgTemplate.CustomModelBinders;

    using Owin;

    public class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            var configuration = new HttpConfiguration();

            var formatters = configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.Converters.Add(new BsonDocumentJsonConverter());
            jsonFormatter.SerializerSettings.Converters.Add(new RemoteMongoQueryConverter());

            var objectIdModelBinderProvider = new SimpleModelBinderProvider(typeof(ObjectId), new ObjectIdModelBinder());
            configuration.Services.Insert(typeof(ModelBinderProvider), 0, objectIdModelBinderProvider);

            UnityConfig.RegisterComponents();

            // Enable attribute routing
            configuration.MapHttpAttributeRoutes();

            // Enable default HTTP routing
            configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            configuration.EnsureInitialized();

            app.UseWebApi(configuration);
        } 
    }
}