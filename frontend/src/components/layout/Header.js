import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <span className="logo-text">StudyInWorld</span>
            <span className="logo-domain">.mn</span>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Нүүр
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/countries" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Улс орнууд
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/agencies" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Зуучлалын газрууд
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agency-register" 
                className="btn btn-primary btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Зуучлагч бүртгүүлэх
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;