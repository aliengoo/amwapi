using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(NgTemplate.App_Start.SignalRStartUp))]

namespace NgTemplate.App_Start
{
    using Microsoft.AspNet.SignalR;

    public class SignalRStartUp
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR(new HubConfiguration
								{
									EnableDetailedErrors = true
								});
        }
    }
}
