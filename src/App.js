// Daniela Castorena 2024
// Weather App - App.js

import React, { useState } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (city) => {
    if (!city) {
      setError('Please enter a city.'); //empty input
      return;
    }

    const API_KEY = '796a69b10dfa2bb99f6d9b1fee30f49f';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    //fetch weather data from api
    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found.'); //error message
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError('');

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${API_KEY}&units=metric`;
        
        //additional forecast data
        return fetch(oneCallUrl);
      })
      .then((response) => response.json())
      .then((forecastData) => {
        setForecast(forecastData);
      })
      .catch((error) => {
        setError(error.message);
        setWeather(null);
        setForecast(null);
      });
  };


  return (
    <div className="App">
      <Search onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      {weather && forecast && <Weather data={weather} forecast={forecast} />}
    </div>
  );
}

export default App;
