import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');

    const searchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:5254/api/flightsearch', {
                params: { origin, destination, departureDate, returnDate }
            });
            setFlights(response.data.flights);
            setError('');
        } catch (err) {
            setError('Failed to fetch flight data. Please try again.');
        }
    };

    return (
        <div>
            <h1>Flight Search</h1>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            <button onClick={searchFlights}>Search Flights</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {flights.map((flight, index) => (
                    <li key={index}>
                        {flight.airline} {flight.flightNumber} from {flight.origin} to {flight.destination} - {flight.price} USD
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FlightSearch;
