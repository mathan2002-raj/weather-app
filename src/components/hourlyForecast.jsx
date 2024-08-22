import React from 'react';
import moment from 'moment';

const HourlyForecast = ({ hourlyData, timezone }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-list">
        {hourlyData.map((hour, index) => {
          const localTime = moment.unix(hour.dt).utcOffset(timezone / 60).format('h A');
          return (
            <div key={index} className="hour-item">
              <p>{localTime}</p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />
              <p>{Math.round(hour.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;