using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<WeatherResponse> GetWeatherAsync(string city, string apiKey)
    {
        var response = await _httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}");
        
        var responseContent = await response.Content.ReadAsStringAsync();
        System.Console.WriteLine($"Status Code: {response.StatusCode}, Response: {responseContent}");
        
        response.EnsureSuccessStatusCode();
        
        return JsonConvert.DeserializeObject<WeatherResponse>(responseContent);
    }
}
