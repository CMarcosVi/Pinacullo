import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Tela 404 simples – ajuste o layout conforme sua identidade visual.
 */
const NotFound: React.FC = () => (
  <section
    style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '1.5rem',
      color: '#e2e8f0',                // mesmo tom do palette
      fontFamily: '"Inter", system-ui, sans-serif',
    }}
  >
    <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
    <p style={{ fontSize: '1.25rem', maxWidth: 460 }}>
      Oops! A página que você procurou não existe ou foi movida.
    </p>

    <Link
      to="/"
      style={{
        padding: '12px 28px',
        borderRadius: 8,
        background: '#555555',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 600,
      }}
    >
      ← Voltar para a Home
    </Link>
  </section>
);

export default NotFound;
