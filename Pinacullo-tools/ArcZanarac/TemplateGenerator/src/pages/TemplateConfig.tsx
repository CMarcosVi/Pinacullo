// src/pages/TemplateConfig.tsx
import { useState } from 'react';
import { useAppDispatch } from '../store/templateSlice';
import { templateActions } from '../store/templateSlice';
import { useNavigate } from 'react-router-dom';

export default function TemplateConfig() {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGenerate = () => {
    dispatch(templateActions.clearSections()); // limpa antigos
    for (let i = 0; i < count; i++) {
      dispatch(templateActions.addSection({
        group: `Container ${i + 1}`,
        name: `Seção ${i + 1}`,
        code: { html: '', css: '', js: '', php: '' }
      }));
    }
    navigate('/create-template'); // redireciona
  };

  return (
    <section style={{ padding: 40 }}>
      <h2>Quantos containers você deseja criar?</h2>
      <input
        type="number"
        min={1}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleGenerate}>
        Gerar Containers
      </button>
    </section>
  );
}
