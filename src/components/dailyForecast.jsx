import React from 'react';
import moment from 'moment';

const DailyForecast = ({ dailyData, timezone }) => {
    console.log(dailyData);
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      <div className="daily-list">
        {dailyData.map((day, index) => {
          const localDay = moment.unix(day.dt).utcOffset(timezone / 60).format('dddd');
          return (
            <div key={index} className="day-item">
              <p>{localDay}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.main.temp)}°C </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};




export default DailyForecast;
