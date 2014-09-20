namespace NgTemplate.Hubs
{
    using System.Diagnostics;

    using Microsoft.AspNet.SignalR;

    public class HelloWorldHub : Hub
    {
        public void GreetAll()
        {
            Clients.Caller.acceptGreet("SignalR is working, Yay!");
        }
    }
}