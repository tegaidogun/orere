import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './WeatherForm';

function Weather() {
    const [username, setUsername] = useState(localStorage.getItem('geonamesUsername') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('openWeatherMapApiKey') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('geonamesUsername') && !!localStorage.getItem('openWeatherMapApiKey'));
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        const storedApiKey = localStorage.getItem('openWeatherMapApiKey');
        try {
            const response = await axios.get(`http://localhost:5254/api/weather/${city}`, {
                params: { apiKey: storedApiKey }
            });
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError(`Failed to fetch weather data for ${city}. Please try again.`);
            setWeather(null);
        }
    };

    const fetchCities = async (query) => {
        if (!username) {
            setError('Please log in to fetch city suggestions.');
            return;
        }
        try {
            const response = await axios.get(`http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=10&username=${username}`);
            setSuggestions(response.data.geonames.map(geo => geo.name));
        } catch (err) {
            console.error('Failed to fetch city suggestions:', err);
            setSuggestions([]);
        }
    };

    const onChangeHandler = (e) => {
        const userInput = e.target.value;
        setCity(userInput);
        if (userInput.length > 0) {
            fetchCities(userInput);
        } else {
            setSuggestions([]);
        }
    };

    const onSuggestionClick = (suggestion) => {
        setCity(suggestion);
        setSuggestions([]);
        fetchWeather(suggestion);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeather(city);
        } else {
            setError('City not found. Please select a valid city from the suggestions.');
        }
    };

    const onLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('geonamesUsername', username);
        localStorage.setItem('openWeatherMapApiKey', apiKey);
        setIsLoggedIn(true);
        setError('');
    };

    const onLogout = () => {
        localStorage.removeItem('geonamesUsername');
        localStorage.removeItem('openWeatherMapApiKey');
        setUsername('');
        setApiKey('');
        setIsLoggedIn(false);
        setError('');
        setSuggestions([]);
        setWeather(null);
    };

    return (
        <WeatherForm
            isLoggedIn={isLoggedIn}
            username={username}
            setUsername={setUsername}
            apiKey={apiKey}
            setApiKey={setApiKey}
            onLogin={onLogin}
            onLogout={onLogout}
            city={city}
            onChangeHandler={onChangeHandler}
            onSubmitHandler={onSubmitHandler}
            suggestions={suggestions}
            onSuggestionClick={onSuggestionClick}
            error={error}
            weather={weather}
        />
    );
}

export default Weather;
