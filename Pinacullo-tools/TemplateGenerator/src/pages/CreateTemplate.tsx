import React, { useState } from 'react';
import heroSections from './sections/Hero';
// Exemplo para mais seções: import aboutSections from '../sections/About';

type SectionCode = {
  html: string;
  css: string;
  js: string;
};

type SectionGroup = {
  [key: string]: SectionCode;
};

const allSections: { [group: string]: SectionGroup } = {
  Hero: heroSections,
  // About: aboutSections,
};

const TemplateGenerate: React.FC = () => {
  const [selectedSections, setSelectedSections] = useState<SectionCode[]>([]);

  const handleSelect = (section: SectionCode) => {
    setSelectedSections([...selectedSections, section]);
  };

  const handleClear = () => {
    setSelectedSections([]);
  };

  const combinedCode = {
    html: selectedSections.map(s => s.html).join('\n'),
    css: selectedSections.map(s => s.css).join('\n'),
    js: selectedSections.map(s => s.js).join('\n'),
  };

  return (
    <div className="p-4">
      <h1>Gerador de Template</h1>

      {Object.entries(allSections).map(([groupName, group]) => (
        <div key={groupName}>
          <h2>{groupName}</h2>
          {Object.entries(group).map(([name, section]) => (
            <button
              key={name}
              onClick={() => handleSelect(section)}
              className="m-2 p-2 border"
            >
              Selecionar {name}
            </button>
          ))}
        </div>
      ))}

      <div className="my-4">
        <button onClick={handleClear} className="p-2 bg-red-500 text-white">
          Limpar Seleções
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3>HTML</h3>
          <textarea readOnly value={combinedCode.html} className="w-full h-40" />
        </div>
        <div>
          <h3>CSS</h3>
          <textarea readOnly value={combinedCode.css} className="w-full h-40" />
        </div>
        <div>
          <h3>JS</h3>
          <textarea readOnly value={combinedCode.js} className="w-full h-40" />
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerate;
