import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ titulo, linkTexto, linkDestino }) {
  return (
    <nav style={{
      backgroundColor: '#0a4a90', // azul SAP
      padding: '0.75rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
      fontFamily: "'Roboto', sans-serif"
    }}>
      {/* Logo + Título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Espaço para logo */}
        <div style={{
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}>

           <img src="src/assets/truck_16061035.gif" alt="Logo" width={45} />
          
        </div>

        <h1 style={{ margin: 0, fontWeight: 700, fontSize: '1.4rem', userSelect: 'none' }}>
          {titulo}
        </h1>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {linkTexto && linkDestino && (
          <Link
            to={linkDestino}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#073763'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {linkTexto}
          </Link>
        )}

        {/* Botão destacado para Avarias */}
        <Link
          to="/avarias"
          style={{
            color: 'white',
            backgroundColor: '#f0a500',
            padding: '8px 18px',
            borderRadius: '8px',
            fontWeight: '700',
            textDecoration: 'none',
            boxShadow: '0 3px 8px rgba(240, 165, 0, 0.7)',
            transition: 'background-color 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#cf8e00'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f0a500'}
        >
          Avarias
        </Link>
      </div>
    </nav>
  );
}
