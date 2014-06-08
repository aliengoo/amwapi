namespace NgTemplate.Hubs
{
    using Microsoft.AspNet.SignalR;

    public class HelloWorldHub : Hub
    {
        public void GreetAll()
        {
            Clients.All.acceptGreet("Hello, SignalR");
        }
    }
}