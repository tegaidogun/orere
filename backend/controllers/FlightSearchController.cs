using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FlightSearchController : ControllerBase
{
    private readonly FlightSearchService _flightSearchService;

    public FlightSearchController(FlightSearchService flightSearchService)
    {
        _flightSearchService = flightSearchService;
    }

    [HttpGet]
    public async Task<IActionResult> SearchFlights(string origin, string destination, string departureDate, string returnDate)
    {
        var flights = await _flightSearchService.SearchFlightsAsync(origin, destination, departureDate, returnDate);
        return Ok(flights);
    }
}
