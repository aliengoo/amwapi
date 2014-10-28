namespace NgTemplate.App_Start
{
    using System.Web.Http;
    using System.Web.Http.Dependencies;

    using Microsoft.Practices.Unity;

    using MongoDB.Bson.Serialization;
    using MongoDB.Driver;

    using NgTemplate.Helpers;
    using NgTemplate.Repositories;

    using Unity.WebApi;

    public static class UnityConfig
    {
        public static IUnityContainer RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers

            var db = MongoDbHelper.GetDatabase("databaseUrl");
            container.RegisterInstance(typeof(MongoDatabase), db);

            container.RegisterType<IMongoRepository, MongoRepository>();

            return container;
        }
    }
}