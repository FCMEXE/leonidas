import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ titulo, linkTexto, linkDestino }) {
  return (
    <nav style={{
      backgroundColor: '#000',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    }}>
      <h1 style={{ margin: 0 }}>{titulo}</h1>
      {linkTexto && linkDestino && (
        <Link 
          to={linkDestino} 
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          {linkTexto}
        </Link>
      )}
    </nav>
  );
}
