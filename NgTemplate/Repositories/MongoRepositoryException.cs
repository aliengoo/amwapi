namespace NgTemplate.Repositories
{
    using System;

    public class MongoRepositoryException : Exception
    {
        public MongoRepositoryException()
        {
        }

        public MongoRepositoryException(string message)
            : base(message)
        {
        }

        public MongoRepositoryException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}