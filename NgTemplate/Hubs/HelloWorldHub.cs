namespace NgTemplate.Hubs
{
    using Microsoft.AspNet.SignalR;

    public class HelloWorldHub : Hub
    {
        public void GreetAll()
        {
            Clients.Caller.acceptGreet("Hello, all");
        }
    }
}