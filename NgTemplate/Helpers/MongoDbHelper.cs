namespace NgTemplate.Helpers
{
    using System.Configuration;

    using MongoDB.Driver;

    public class MongoDbHelper
    {
        public static MongoDatabase GetDatabase(string connectionStringName)
        {
            var connectionStringSetting = ConfigurationManager.ConnectionStrings[connectionStringName];

            if (connectionStringSetting == null)
            {
                throw new ConfigurationErrorsException(string.Format("Connection {0} was not defined", connectionStringName));
            }

            var url = new MongoUrl(connectionStringSetting.ConnectionString);

            if (string.IsNullOrWhiteSpace(url.DatabaseName))
            {
                throw new ConfigurationErrorsException(string.Format("The connection {0} does not appear to have a database name", connectionStringName));
            }

            return new MongoClient(url).GetServer().GetDatabase(url.DatabaseName);
        }
    }
}