import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/cozco-logo.png';


const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="title">Cozco backoffice</div>
      <button className="get-started-button" onClick={handleGetStartedClick}>
        Let's go
      </button>
    </div>
  );
};

export default Home;