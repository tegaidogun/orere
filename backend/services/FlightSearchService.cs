using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class FlightSearchService
{
    private readonly HttpClient _httpClient;

    public FlightSearchService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<FlightSearchResponse> SearchFlightsAsync(string origin, string destination, string departureDate, string returnDate)
    {
        var response = await _httpClient.GetAsync($"https://api.example.com/flights?origin={origin}&destination={destination}&departureDate={departureDate}&returnDate={returnDate}");
        response.EnsureSuccessStatusCode();
        var responseContent = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<FlightSearchResponse>(responseContent);
    }
}
