
import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Select a Country</h1>
      <div className="country-list">
        <Link to="/country/India">
          <div className="country">
            <img className="country-flag" src="image/download (6).png" alt="India" />
            <p>India</p>
          </div>
        </Link>
        <Link to="/country/Russia">
          <div className="country">
            <img className="country-flag" src="image/download (1).png" alt="Russia" />
            <p>Russia</p>
          </div>
        </Link>
        <Link to="/country/Pakistan">
          <div className="country">
            <img className="country-flag" src="image/download (3).jpg" alt="Pakistan" />
            <p>Pakistan</p>
          </div>
        </Link>
        <Link to="/country/China">
          <div className="country">
            <img className="country-flag" src="image/download (4).jpg" alt="China" />
            <p>China</p>
          </div>
        </Link>
        <Link to="/country/America">
          <div className="country">
            <img className="country-flag" src="image/images.jpg" alt="America" />
            <p>America</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;