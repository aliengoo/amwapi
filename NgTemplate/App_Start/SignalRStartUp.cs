using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof($safeprojectname$.App_Start.SignalRStartUp))]

namespace $safeprojectname$.App_Start
{
    public class SignalRStartUp
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
