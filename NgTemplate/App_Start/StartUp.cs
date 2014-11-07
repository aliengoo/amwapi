namespace NgTemplate.App_Start
{
    using System.Web.Http;
    using System.Web.Http.ModelBinding;
    using System.Web.Http.ModelBinding.Binders;

    using Microsoft.AspNet.SignalR;
    using Microsoft.Owin.Cors;
    using Microsoft.Practices.Unity;

    using MongoDB.Bson;

    using NgTemplate.Converters;
    using NgTemplate.CustomModelBinders;
    using NgTemplate.Seed;

    using Owin;

    public class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            var configuration = new HttpConfiguration();

            // init formatting of JSON request/responses
            var formatters = configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.Converters.Add(new BsonDocumentJsonConverter());
            jsonFormatter.SerializerSettings.Converters.Add(new RemoteMongoQueryConverter());

            var objectIdModelBinderProvider = new SimpleModelBinderProvider(typeof(ObjectId), new ObjectIdModelBinder());
            configuration.Services.Insert(typeof(ModelBinderProvider), 0, objectIdModelBinderProvider);

            // register the DI container
            var container = UnityConfig.RegisterComponents();
            configuration.DependencyResolver = new CustomUnityDependencyResolver(container);

            // Seed the admin role
            container.Resolve<SeedRoles>().Init();

            // Enable attribute routing
            configuration.MapHttpAttributeRoutes();

            // Enable default HTTP routing
            configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            configuration.EnsureInitialized();

            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR(new HubConfiguration
            {
                EnableDetailedErrors = true
            });

            app.UseWebApi(configuration);
        } 
    }
}