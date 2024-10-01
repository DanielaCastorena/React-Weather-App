// Daniela Castorena 2024
// Weather App - Search.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../App.css';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('city');
    return savedCity ? savedCity : '';
  });

  const [suggestions, setSuggestions] = useState([]);
  
  //api key from OpenWeatherApp
  const API_KEY = '796a69b10dfa2bb99f6d9b1fee30f49f';

  const fetchSuggestions = async (input) => {
    if (input) {
      try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/find', {
          params: {
            q: input,
            appid: API_KEY,
            limit: 5
          }
        });
        setSuggestions(response.data.list);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    localStorage.setItem('city', city);
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
    onSearch(suggestion.name);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Weather App</h1>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="enter city name..." 
            value={city} 
            onChange={handleInputChange} 
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch /> {/*magnifying glass icon*/}
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}, {suggestion.sys.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
