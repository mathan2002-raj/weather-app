import React from 'react';

const TemperatureAndDetail = ({ temp, details }) => (
  <div>
    <h2>{Math.round(temp)}°C</h2>
    <p>{details.toUpperCase()}</p>
  </div>
);

export default TemperatureAndDetail;