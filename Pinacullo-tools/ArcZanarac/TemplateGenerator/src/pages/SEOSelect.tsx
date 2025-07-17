import React from 'react';

const SeoOptions: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#222',
  };

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const buttonStyleBase: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    minWidth: '120px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  // Cores específicas dos botões
  const codeBtnStyle: React.CSSProperties = {
    ...buttonStyleBase,
    backgroundColor: '#007bff',
  };

  const filesBtnStyle: React.CSSProperties = {
    ...buttonStyleBase,
    backgroundColor: '#28a745',
  };

  const urlBtnStyle: React.CSSProperties = {
    ...buttonStyleBase,
    backgroundColor: '#6f42c1',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Escolha como deseja realizar a auditoria de SEO</h1>

      <div style={buttonsContainerStyle}>
        <button style={codeBtnStyle} onClick={() => console.log('Code')}>
          Code
        </button>
        <button style={filesBtnStyle} onClick={() => console.log('Files')}>
          Files
        </button>
        <button style={urlBtnStyle} onClick={() => console.log('URL')}>
          URL
        </button>
      </div>
    </div>
  );
};

export default SeoOptions;