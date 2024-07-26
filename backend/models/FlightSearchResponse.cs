public class FlightSearchResponse
{
    public Flight[] Flights { get; set; }
}

public class Flight
{
    public string Airline { get; set; }
    public string FlightNumber { get; set; }
    public string Origin { get; set; }
    public string Destination { get; set; }
    public string DepartureTime { get; set; }
    public string ArrivalTime { get; set; }
    public decimal Price { get; set; }
}
