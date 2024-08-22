import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CountryCities.css';

const CountryCities = () => {
  const { countryName } = useParams();
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState({ loading: false, data: {}, error: false });

  const countryData = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
    Pakistan: ['Karachi', 'Lahore', 'Islamabad'],
    China: ['Beijing', 'Shanghai', 'Guangzhou'],
    America: ['New York', 'Los Angeles', 'Chicago'],
  };

  const cities = countryData[countryName] || [];

  const fetchWeather = async (city) => {
    setWeather({ ...weather, loading: true });
    const api_key = '57bdda8d3ac8c6de0a17acc2416c36a8';
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          units: 'metric',
          appid: api_key,
        },
      });
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ data: {}, loading: false, error: true });
      console.error("Error fetching the weather data:", error);
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    fetchWeather(city);
  };

  return (
    <div className="cities-container">
      <h2>Cities in {countryName}</h2>
      <ul className="city-list">
        {(() => {
          const cityListItems = [];
          for (let i = 0; i < cities.length; i++) {
            cityListItems.push(
              <li key={i} onClick={() => handleCityClick(cities[i])}>
                {cities[i]}
              </li>
            );
          }
          return cityListItems;
        })()}
      </ul>
      {selectedCity && weather.loading && <p>Loading...</p>}
      {selectedCity && weather.error && <p>Could not fetch weather data. Please try again later.</p>}
      {selectedCity && weather.data.main && (
        <div className="weather-info">
          <h3>Weather in {selectedCity}</h3>
          <p>Temperature: {weather.data.main.temp} °C</p>
          <p>Description: {weather.data.weather[0].description}</p>
          <p>Wind Speed: {weather.data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryCities;

