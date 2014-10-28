namespace NgTemplate.Helpers
{
    using System;
    using System.Net;
    using System.Security.Principal;
    using System.Text;
    using System.Web.Http.Controllers;

    public static class HttpHelper
    {
        public static ICredentials GetBasicCredentials(this HttpActionContext context)
        {
            string authHeader = null;
            var auth = context.Request.Headers.Authorization;
            if (auth != null && auth.Scheme == "Basic")
            {
                authHeader = auth.Parameter;
            }

            if (string.IsNullOrEmpty(authHeader))
            {
                return null;
            }

            authHeader = Encoding.UTF8.GetString(Convert.FromBase64String(authHeader));

            var tokens = authHeader.Split(':');

            if (tokens.Length < 2)
            {
                return null;
            }

            return new NetworkCredential(tokens[0], tokens[1]);
        }

        //public static IIdentity GetIdentity(this HttpActionContext context)
        //{
        //    string authHeader = null;
        //    var auth = context.Request.Headers.Authorization;
        //    if (auth != null && auth.Scheme == "Bearer")
        //    {
        //        authHeader = auth.Parameter;
        //    }

        //    if (string.IsNullOrEmpty(authHeader))
        //    {
        //        return null;
        //    }

        //    return new GenericIdentity();
        //}
    }
}