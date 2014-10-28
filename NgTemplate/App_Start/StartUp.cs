namespace NgTemplate.App_Start
{
    using System.Web.Http;
    using System.Web.Http.ModelBinding;
    using System.Web.Http.ModelBinding.Binders;

    using Microsoft.AspNet.SignalR;
    using Microsoft.Owin.Cors;

    using MongoDB.Bson;

    using NgTemplate.Converters;
    using NgTemplate.CustomModelBinders;
    using NgTemplate.Pipeline;

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

            var container = UnityConfig.RegisterComponents();

            // Enable attribute routing
            configuration.MapHttpAttributeRoutes();

            // Enable default HTTP routing
            configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            configuration.EnsureInitialized();

            configuration.DependencyResolver = new CustomUnityDependencyResolver(container);

            app.UseCors(CorsOptions.AllowAll);
            app.Use(typeof(MongoAuthMiddleware));
            app.MapSignalR(new HubConfiguration
            {
                EnableDetailedErrors = true
            });
            app.UseWebApi(configuration);
        } 
    }
}