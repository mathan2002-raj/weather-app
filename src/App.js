import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
import Home from './components/home';
import Button from './components/button';
import './App.css';
import CountryCities from './components/countryCities';
import HourlyForecast from './components/hourlyForecast';
import DailyForecast from './components/dailyForecast';
import Defined from './components/defined';
import TimeAndLocation from './components/timeAndLocation';
import TemperatureAndDetail from './components/temperatureAndDetail';
import { fetchWeather } from './slices/weatherSlices';

function App() {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  const handleCountryChange = (event) => {
    setInput(event.target.value);
  };

  const handleFetchWeather = () => {
    if (input) {
      dispatch(fetchWeather(input));
    }
  };

  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const WeekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const currentDate = new Date();
    return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const hourlyData = weather.forecast?.list?.slice(0, 6) || [];
  const dailyData = weather.forecast?.list?.filter((_, i) => i % 8 === 0).slice(0, 10) || [];

  return (
    <div className="custom-container">
      <h1>Weather App</h1>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/country/:countryName" element={<CountryCities />} />
        </Routes>
      </Router>
      <div className="search-bar">
        <input
          type="text" 
          ref={inputRef}
          className="city-search"
          placeholder="Enter City or Country Name.."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            handleCountryChange(event);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') handleFetchWeather();
          }}
        />
        <Button onClick={handleFetchWeather} />
      </div>
      <Defined />
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>City not found</span>
          </span>
        </>
      )}
      {weather.data.main && (
        <div>
          <TimeAndLocation
            location={weather.data.name}
            timezone={weather.timezone}
          />
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <TemperatureAndDetail
            temp={weather.data.main.temp}
            details={weather.data.weather[0].description}
          />
          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed} m/s</p>
          </div>
          <hr />
          <HourlyForecast hourlyData={hourlyData} timezone={weather.timezone} />
          <hr />
          <DailyForecast dailyData={dailyData} timezone={weather.timezone} />
        </div>
      )}
    </div>
  );
}

export default App;
