import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const SeoSearch: React.FC = () => {
  const mode = useSelector((state: RootState) => state.seo.mode);

  if (!mode) return null;

  return (
    <div style={{ padding: '20px' }}>
      {mode === 'url' && (
        <div>
          <h2>Pesquisar por URL</h2>
          <input type="text" placeholder="https://exemplo.com" />
          <button>Pesquisar</button>
        </div>
      )}

      {mode === 'code' && (
        <div>
          <h2>Análise por Código</h2>
          <textarea placeholder="HTML" rows={4} cols={50}></textarea>
          <textarea placeholder="CSS" rows={4} cols={50}></textarea>
          <textarea placeholder="JS" rows={4} cols={50}></textarea>
        </div>
      )}

      {mode === 'files' && (
        <div>
          <h2>Importar Arquivos</h2>
          <input type="file" accept=".html" />
          <input type="file" accept=".css" />
          <input type="file" accept=".js" />
        </div>
      )}
    </div>
  );
};

export default SeoSearch;