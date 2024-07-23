import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'; 

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    
    navigate('/login');
  };

  return (
    <div className="landing-page-container">
      <header className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-large-container">
            <h1 className="website-logo">FmMoney</h1>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/assessment-tasks" className="nav-link">
                  Assessment Tasks
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
            <button type="button" className="logout-desktop-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
