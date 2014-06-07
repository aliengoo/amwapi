using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(NgTemplate.App_Start.SignalRStartUp))]

namespace NgTemplate.App_Start
{
    public class SignalRStartUp
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
