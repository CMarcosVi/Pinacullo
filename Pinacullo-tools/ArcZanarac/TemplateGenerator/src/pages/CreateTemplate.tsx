// src/pages/TemplateGenerate.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroSections from './sections/Hero';
import './template-generate.css';
import formSections from './sections/Form';   // ← NOVO grupo
// Se tiver outros grupos, importe-os aqui
// import aboutSections from './sections/About';


import {
  templateActions,
  useAppDispatch,
  useAppSelector,
} from '../store/templateSlice';
import type { SectionCode } from '../store/templateSlice';

/* ----------------- Catálogo de blocos disponíveis ----------------- */
interface SectionGroup { [key: string]: SectionCode; }

const allSections: { [group: string]: SectionGroup } = {
  Hero: heroSections,
  Form: formSections,
  // About: aboutSections,
};

const TemplateGenerate: React.FC = () => {
  const dispatch  = useAppDispatch();
  const selected  = useAppSelector((s) => s.template.selectedSections);

  /* ---------------- Handlers (Redux actions) ---------------- */
  const handleSelect = (group: string, name: string, code: SectionCode) =>
    dispatch(templateActions.addSection({ group, name, code }));

  const handleRemove = (i: number) => dispatch(templateActions.removeSection(i));
  const handleUp     = (i: number) => dispatch(templateActions.moveSectionUp(i));
  const handleDown   = (i: number) => dispatch(templateActions.moveSectionDown(i));
  const handleClear  = ()            => dispatch(templateActions.clearSections());

  /* --------------- Geração do código combinado (debug) --------------- */
  const combined = {
    html: selected.map(s => `<!-- ${s.group}/${s.name} -->\n${s.code.html}`).join('\n'),
    css : selected.map(s => `/* ${s.group}/${s.name} */\n${s.code.css}`).join('\n'),
    js  : selected.map(s => `// ${s.group}/${s.name}\n${s.code.js}`).join('\n'),
  };

  useEffect(() => console.log('combinedCode', combined), [combined]);

  /* ------------------------------ UI ------------------------------ */
 return (
  <section className="containerCreateTemplate p-6 space-y-6">
    <h1 className="titleGenerator text-2xl font-bold">Gerador de Template</h1>

    {/* === 1. Seções disponíveis === */}
    {Object.entries(allSections).map(([groupName, group]) => (
      <div key={groupName} className="space-y-2">
        <h2 className="text-xl font-semibold">{groupName}</h2>

        {/* + tg-catalog */}
        <div className="container-parts-constructs tg-catalog">
          {Object.entries(group).map(([name, code]) => (
            <button
              key={name}
              onClick={() => handleSelect(groupName, name, code)}
              /* + tg-card (demais classes originais mantidas) */
              className="tg-card px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              Selecionar {name}
            </button>
          ))}
        </div>
      </div>
    ))}

 {/* limpar */}
      <button onClick={handleClear} className="tpl-btn-clear">
        Limpar Seleções
      </button>

      {/* continuar */}
      <Link
        to="/ArcGenerator"
        className={`tpl-btn-next${selected.length === 0 ? ' disabled' : ''}`}
        onClick={e => { if (selected.length === 0) e.preventDefault(); }}
      >
        Continuar → Edição &amp; Download
      </Link>

      {/* selecionados */}
      <div className="tpl-selected">
        <h3 className="tpl-selected-title">Blocos Selecionados</h3>

        {selected.length === 0 ? (
          <p className="tpl-empty">Nenhum bloco selecionado.</p>
        ) : (
          <ul className="tpl-selected-list">
            {selected.map(({ group, name, id }, idx) => (
              <li key={id} className="tpl-selected-card">
                <span className="tpl-card-name">{group} / {name}</span>

                <button
                  onClick={() => handleUp(idx)}
                  disabled={idx === 0}
                  className="tpl-icon-btn"
                >▲</button>

                <button
                  onClick={() => handleDown(idx)}
                  disabled={idx === selected.length - 1}
                  className="tpl-icon-btn"
                >▼</button>

                <button
                  onClick={() => handleRemove(idx)}
                  className="tpl-icon-btn danger"
                >✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
);}; 


export default TemplateGenerate;
