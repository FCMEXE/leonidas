import React from 'react';
import { Link } from 'react-router-dom';

// AQUI: O caminho foi corrigido para "./Navbar.css"
import './Navbar.css'; 

import logo from '../assets/truck_16061035.gif'; 

export default function Navbar({ titulo, children }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <h1 className="navbar-title">{titulo}</h1>
      </div>
      <div className="navbar-links">{children}</div>
    </nav>
  );
}