namespace NgTemplate.Hubs
{
    using System.Threading.Tasks;

    using Microsoft.AspNet.SignalR;

    using Newtonsoft.Json.Linq;

    using NgTemplate.Contexts;
    using NgTemplate.Repositories;

    public class WhosThereHub : Hub
    {
	    private readonly IJsonRepository _jsonRepository;

	    private readonly IUserContext _userContext;

        private readonly IDateContext _dateContext;

        public WhosThereHub(IJsonRepository jsonRepository, IUserContext userContext, IDateContext dateContext)
        {
	        _jsonRepository = jsonRepository;
	        _userContext = userContext;
            _dateContext = dateContext;
        }

        public override Task OnConnected()
        {
			var user = _jsonRepository.FindById(JObject.FromObject(new
                                                               {
                                                                   collection = "whos_there",
                                                                   _id = _userContext.Name
															   })) ?? _jsonRepository.Save(JObject.FromObject(new
                                                                                                          {
                                                                                                              _id = _userContext.Name,
                                                                                                              created = _dateContext.Now,
                                                                                                              updated = _dateContext.Now
                                                                                                          }));

            Clients.All.userConnected(user);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
			var user = _jsonRepository.FindById(JObject.FromObject(new
                                                               {
                                                                   collection = "whos_there",
                                                                   _id = _userContext.Name
                                                               }));

            if (user != null)
            {
                Clients.All.userDisconnected(user);

				_jsonRepository.Remove(
                    JObject.FromObject(new { collection = "whos_there", query = new { _id = _userContext.Name } }));
            }

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }
    }
}