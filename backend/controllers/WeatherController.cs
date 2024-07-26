using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly WeatherService _weatherService;

    public WeatherController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather(string city, [FromQuery] string apiKey)
    {
        if (string.IsNullOrEmpty(apiKey))
        {
            return BadRequest("API key is required.");
        }

        try
        {
            System.Console.WriteLine($"Fetching weather for city: {city} with API key: {apiKey}");
            var weather = await _weatherService.GetWeatherAsync(city, apiKey);
            return Ok(weather);
        }
        catch (HttpRequestException ex)
        {
            System.Console.WriteLine($"Error fetching weather data for {city}: {ex.Message}");
            return StatusCode(500, $"Error fetching weather data for {city}: {ex.Message}");
        }
    }
}
