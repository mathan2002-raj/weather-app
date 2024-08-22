import React, { useState } from 'react';

const Button = ({ onClick }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);


  const countryData = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
    Pakistan: ['Karachi', 'Lahore', 'Islamabad'],
    China: ['Beijing', 'Shanghai', 'Guangzhou'],
    America: ['New York', 'Los Angeles', 'Chicago'],
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setCities(countryData[country] || []);
  };

  return (
    <>
      <button onClick={onClick}>Search</button>
      

      {selectedCountry && (
        <div>
          <h2>Cities in {selectedCountry}</h2>
          <ul>
            {cities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Button;