// src/pages/ArcGenerator.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Editor from "@monaco-editor/react";
import type * as monaco from "monaco-editor";

import { useAppSelector } from "../store/templateSlice";
import defaults from "./sections/StaticFiles";

/* ------------------------------------------------------------
   🎨  PALETA E ESTILOS CENTRALIZADOS
   ------------------------------------------------------------ */
const palette = {
  gradFrom: "#111111",
  gradTo:   "#111111",
  glass:    "rgba(255,255,255,0.04)",
  border:   "rgba(255,255,255,0.08)",
  text:     "#e2e8f0",
  primary:  "#555555",
};

const styles = {
  wrapper: {
    minHeight: "230vh",
    display: "flex",
    flexDirection: "column" as const,
    background: `linear-gradient(135deg, ${palette.gradFrom}, ${palette.gradTo})`,
    color: palette.text,
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(12px)",
    background: "#212121",
    borderBottom: `1px solid ${palette.border}`,
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: "1.5rem", fontWeight: 700 },
  backLink: {
    padding: "8px 16px",
    borderRadius: 8,
    background: palette.glass,
    border: `1px solid ${palette.border}`,
    textDecoration: "none",
    color: palette.text,
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    width: "100%",
    margin: "32px auto",
    padding: "0 32px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 32,
  },
  editorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(600px,1fr))",
    gap: 32,
  },
  downloadBtn: {
    alignSelf: "flex-start",
    padding: "12px 28px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.95rem",
    marginBottom: "20px",
    color: "#fff",
    background: palette.primary,
    cursor: "pointer",
  },
  editorWrapper: {
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${palette.border}`,
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },
} as const;

/* ------------------------------------------------------------
   🧩  PÁGINA PRINCIPAL
   ------------------------------------------------------------ */
const ArcGenerator: React.FC = () => {
  const selected = useAppSelector((s) => s.template.selectedSections);

  /* conteúdo inicial dinâmico */
  const initial = useMemo(
    () => ({
      html: selected
        .map((s) => `<!-- ${s.group}/${s.name} -->\n${s.code.html}`)
        .join("\n"),
      css: `${defaults.cssBase}\n${selected
        .map((s) => `/* ${s.group}/${s.name} */\n${s.code.css}`)
        .join("\n")}`,
      js: `${defaults.jsBase}\n${selected
        .map((s) => `// ${s.group}/${s.name}\n${s.code.js}`)
        .join("\n")}`,
      php: selected
        .map((s) => s.code.php)
        .filter(Boolean)
        .join("\n\n"),
    }),
    [selected]
  );

  /* estados */
  const [wrapper,  setWrapper]  = useState(defaults.wrapper);
  const [html,     setHtml]     = useState(initial.html);
  const [css,      setCss]      = useState(initial.css);
  const [js,       setJs]       = useState(initial.js);
  const [robots,   setRobots]   = useState(defaults.robots);
  const [htaccess, setHtaccess] = useState(defaults.htaccess);
  const [php,      setPhp]      = useState(initial.php);  // agora herda dos blocos

  /* injeta conteúdo no wrapper */
  const htmlWithWrapper = useMemo(
    () => wrapper.replace("<!-- CONTENT -->", html),
    [wrapper, html]
  );

  /* gera ZIP */
  const handleDownload = async () => {
    const zip = new JSZip();
    zip.file("index.html", htmlWithWrapper);
    zip.file("styles.css", css);
    zip.file("scripts.js", js);
    zip.file("robots.txt", robots);
    zip.file(".htaccess", htaccess);
    if (php.trim()) zip.file("mail.php", php); // só cria se houver conteúdo
    saveAs(await zip.generateAsync({ type: "blob" }), "template.zip");
  };

  return (
    <div style={styles.wrapper}>
      {/* cabeçalho fixo */}
      <header style={styles.header}>
        <h1 style={styles.title}>Arc Generator</h1>
        <Link to="/CreateTemplate" style={styles.backLink}>← Voltar</Link>
      </header>

      {/* conteúdo */}
      <main style={styles.main}>
        <section style={styles.editorGrid}>
          <CodeEditor label="wrapper.html"         language="html"        value={wrapper}  onChange={setWrapper} />
          <CodeEditor label="index-content.html"   language="html"        value={html}     onChange={setHtml} />
          <CodeEditor label="style.css"            language="css"         value={css}      onChange={setCss} />
          <CodeEditor label="script.js"            language="javascript"  value={js}       onChange={setJs} />
          <CodeEditor label="robots.txt"           language="plaintext"   value={robots}   onChange={setRobots} />
          <CodeEditor label=".htaccess"            language="plaintext"   value={htaccess} onChange={setHtaccess} />
          <CodeEditor label="mail.php"             language="php"         value={php}      onChange={setPhp} />
          <button style={styles.downloadBtn} onClick={handleDownload}>
            Gerar ZIP
          </button>
        </section>
      </main>
    </div>
  );
};

export default ArcGenerator;

/* ------------------------------------------------------------
   🖋️  CODEEDITOR COMPONENT
   ------------------------------------------------------------ */
interface CodeEditorProps {
  label: string;
  language: "html" | "css" | "javascript" | "plaintext" | "php";
  value: string;
  onChange: (v: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  label, language, value, onChange,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontWeight: 600 }}>{label}</span>
    <div style={styles.editorWrapper}>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          fontSize: 14,
          wordWrap: "on",
          minimap: { enabled: false },
          dragAndDrop: false,
          links: false,
          readOnlyMessage: {
            value: "Apenas edição de texto – nada é executado aqui.",
          } as monaco.IMarkdownString,
        }}
      />
    </div>
  </div>
);
  