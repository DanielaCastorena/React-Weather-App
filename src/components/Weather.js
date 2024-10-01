// Daniela Castorena 2024
// Weather App - Weather.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import rainIcon from './images/humidity.png'; 
import windIcon from './images/wind.png'; 

function Weather({ data }) {
    const [weatherData, setWeatherData] = useState(() => {
        const savedData = localStorage.getItem('weatherData');
        return savedData ? JSON.parse(savedData) : data;
    });

    const [forecastData, setForecastData] = useState(null); 
    const [unit, setUnit] = useState('F');  
    const [searchTime, setSearchTime] = useState('');  
    
    const API_KEY = '796a69b10dfa2bb99f6d9b1fee30f49f'; 
    const city = data.name; 

    useEffect(() => {
        if (data) {
            localStorage.setItem('weatherData', JSON.stringify(data));
            setWeatherData(data);

            const now = new Date();
            const formattedTime = now.toLocaleString([], {
                hour: 'numeric', minute: '2-digit',
                year: 'numeric', month: 'long', day: 'numeric'
            }).replace('at', ' |');
            setSearchTime(formattedTime);  

            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
                .then(response => {
                    setForecastData(response.data); //set forecast data
                })
                .catch(error => console.error('Error fetching forecast data:', error));
        }
    }, [data, city]);

    const { name, sys, main, weather, wind } = weatherData || {};

    if (!weatherData || !main || !weather || !sys || !wind) {
        return <p>Loading weather data...</p>; //loading message
    }

    const feelsLikeF = Math.round(main.feels_like * 9 / 5 + 32);
    const feelsLikeC = Math.round(main.feels_like);
    const tempCelsius = Math.round(main.temp);
    const tempFahrenheit = Math.round(main.temp * 9 / 5 + 32);
    const weatherDescription = weather[0].description;
    const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const windSpeedMph = Math.round(wind.speed);
    const humidity = main.humidity;

    const iconUrl = weather ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` : '';

    const toggleUnit = () => {
        setUnit(unit === 'F' ? 'C' : 'F'); //allows users to toggle between fahrenheit and celsius
    };

    const hourlyForecast = forecastData && forecastData.list.length > 0
        ? forecastData.list.slice(0, 5).map((forecast, index) => {
            const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { 
                hour: 'numeric',
                minute: '2-digit'
            });
            const tempF = Math.round((forecast.main.temp - 273.15) * 9 / 5 + 32);
            const tempC = Math.round(forecast.main.temp - 273.15);
            return (
                <div key={index} className="hourly">
                    <p>{time}</p>
                    <p>{unit === 'F' ? `${tempF}°F` : `${tempC}°C`}</p>
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} />
                </div>
            );
        })
        : <p>No hourly forecast available.</p>;

    return (
        <div className="weather-container">
            <h1>{name}, {sys.country}</h1>
            <p>{searchTime}</p>
            <img src={iconUrl} alt={weatherDescription} />
            <h1>
                {unit === 'F' ? `${tempFahrenheit}°F` : `${tempCelsius}°C`}
                <span className="temp-toggle" onClick={toggleUnit}>
                    | {unit === 'F' ? '°C' : '°F'}
                </span>
            </h1>
            <p>{capitalizedDescription}</p>
            <p>Feels like: {unit === 'F' ? `${feelsLikeF}°F` : `${feelsLikeC}°C`}</p>
            <div className="wind-humidity-container">
                <div className="wind-section">
                    <img src={windIcon} alt="Wind icon" className="wind-icon" />
                    <p>Wind Speed: {windSpeedMph}mph</p>
                </div>
                <div className="humidity-section">
                    <img src={rainIcon} alt="Rain icon" className="humidity-icon" />
                    <p>Humidity: {humidity}%</p>
                </div>
            </div>
            <h3>Hourly Forecast:</h3>
            <div className="hourly-forecast">
                {hourlyForecast}
            </div>
        </div>
    );
}

export default Weather;
