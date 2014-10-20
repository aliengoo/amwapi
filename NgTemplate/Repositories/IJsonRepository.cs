namespace NgTemplate.Repositories
{
	using Newtonsoft.Json.Linq;

	public interface IJsonRepository
    {
        JArray Find(JObject request);

        JObject FindOne(JObject request);

        JArray FindAll(JObject request);

        JObject Save(JObject request);

        JObject FindById(JObject request);

        JObject Remove(JObject request);
    }
}