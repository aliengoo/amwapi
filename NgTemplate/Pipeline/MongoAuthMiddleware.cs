namespace NgTemplate.Pipeline
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Threading.Tasks;

    using Microsoft.Owin;

    public class MongoAuthMiddleware
    {
        private readonly Func<IDictionary<string, object>, Task> _next;

        public MongoAuthMiddleware(Func<IDictionary<string, object>, Task> next)
        {
            _next = next;
        }

        public async Task Invoke(IDictionary<string, object> environment)
        {
            var context = new OwinContext(environment);

            // TODO : Get the current principal here

            Debug.WriteLine("MongoAuthMiddleware: User->" + context.Request.User);

            await _next(environment);
        }
    }
}