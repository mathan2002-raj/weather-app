import React from 'react';
import moment from 'moment-timezone';

const TimeAndLocation = ({ location, timezone }) => {

  const localTime = moment().utcOffset(timezone / 60).format('dddd, MMMM D, YYYY h:mm:ss A');

  return (
    <div className='time-location-container'>
      <h2>Location: {location}</h2>
      <p>Local Time: {localTime}</p>
    </div>
  );
};

export default TimeAndLocation;