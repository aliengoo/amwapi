namespace NgTemplate.Hubs
{
    using Microsoft.AspNet.SignalR;

    public class HelloWorldHub : Hub
    {
        public void GreetAll()
        {
            Clients.All.broadcastMessage("Hello, all");
        }
    }
}