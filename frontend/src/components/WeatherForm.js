import React from 'react';

function WeatherForm({
    isLoggedIn,
    username,
    setUsername,
    apiKey,
    setApiKey,
    onLogin,
    onLogout,
    city,
    onChangeHandler,
    onSubmitHandler,
    suggestions,
    onSuggestionClick,
    error,
    weather
}) {
    return (
        <div>
            {!isLoggedIn ? (
                <form onSubmit={onLogin}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter GeoNames username"
                    />
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter OpenWeatherMap API key"
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <button onClick={onLogout}>Logout</button>
                    <h1>Weather Forecast</h1>
                    <form onSubmit={onSubmitHandler}>
                        <input
                            type="text"
                            value={city}
                            onChange={onChangeHandler}
                            placeholder="Enter city name"
                        />
                        <button type="submit">Get Weather</button>
                    </form>
                    {suggestions.length > 0 && (
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => onSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {weather && (
                        <div>
                            <h2>{weather.name}</h2>
                            <p>{weather.weather[0].description}</p>
                            <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            {weather.wind && (
                                <>
                                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                                    <p>Wind Direction: {weather.wind.deg}°</p>
                                </>
                            )}
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default WeatherForm;
