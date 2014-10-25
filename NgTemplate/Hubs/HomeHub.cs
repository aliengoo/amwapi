namespace NgTemplate.Hubs
{
    using Microsoft.AspNet.SignalR;

    public class HomeHub : Hub
    {
        public void GreetAll()
        {
            Clients.Caller.acceptGreet("SignalR is working, Yay!");
        }
    }
}