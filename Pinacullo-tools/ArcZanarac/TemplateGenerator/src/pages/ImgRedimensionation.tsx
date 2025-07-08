// src/components/ImageOptimizer.tsx
import React, { useState } from "react";
import imageCompression from "browser-image-compression";

/* ============================================================
   🎨 ESTILOS – no mesmo arquivo
   ============================================================ */
const palette = {
  primary: "#16a34a",
  primaryLight: "#4ade80",
  textLight: "#e2e8f0",
  border: "rgba(255,255,255,0.1)",
  glass: "rgba(255,255,255,0.05)",
};

const styles = {
  container: {
    maxWidth: 440,
    maxHeight: 800,
    margin: "48px auto",
    padding: "32px 28px",
    borderRadius: 16,
    background: palette.glass,
    backdropFilter: "blur(12px)",
    border: `1px solid ${palette.border}`,
    color: palette.textLight,
    fontFamily: '"Inter",system-ui,-apple-system,sans-serif',
    textAlign: "center" as const,
  },

  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: 24,
    color: palette.primaryLight,
  },

  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    marginTop: 20,
    display: "block",
  },

  input: {
    width: "100%",
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: "rgba(255,255,255,0.08)",
    color: palette.textLight,
    outline: "none",
  },

  numberInput: {
    width: 90,
    marginLeft: 8,
    padding: "6px 10px",
    borderRadius: 6,
    border: `1px solid ${palette.border}`,
    background: "rgba(255,255,255,0.08)",
    color: palette.textLight,
    outline: "none",
  },

  button: {
    marginTop: 24,
    padding: "10px 22px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: palette.textLight,
    background: palette.primary,
    cursor: "pointer",
  },

  previewBox: {
    marginTop: 32,
    wordBreak: "break-all" as const,
    padding: "14px 16px",
    borderRadius: 8,
    background: "rgba(0,0,0,0.35)",
    border: `1px solid ${palette.border}`,
  },

  img: {
    maxWidth: "100%",
    borderRadius: 8,
  },
} as const;

/* ============================================================
   🧩 COMPONENTE
   ============================================================ */
const ImageOptimizer: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [optimizedURL, setOptimizedURL] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8); // 0–1
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);

  /* ---------- Handlers ---------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setOriginalFile(e.target.files[0]);
  };

  const optimizeImage = async () => {
    if (!originalFile) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      initialQuality: quality,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(originalFile, options);
      setOptimizedURL(URL.createObjectURL(compressedFile));
    } catch (err) {
      console.error("Erro ao comprimir imagem:", err);
    }
  };

  const resizeImage = async () => {
    if (!originalFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = resizeWidth;
        canvas.height = resizeHeight;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
          canvas.toBlob(
            (blob) => blob && setOptimizedURL(URL.createObjectURL(blob)),
            "image/jpeg",
            quality
          );
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(originalFile);
  };

  /* ---------- JSX ---------- */
  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Otimizador de Imagem</h2>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={styles.input}
      />

      {/* Qualidade */}
      <label style={styles.label}>
        Qualidade (0 – 1)
        <input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          style={styles.numberInput}
        />
      </label>

      {/* Botão otimizar */}
      <button style={styles.button} onClick={optimizeImage}>
        Otimizar / Minificar
      </button>

      {/* Redimensionamento */}
      <label style={styles.label}>
        Largura
        <input
          type="number"
          value={resizeWidth}
          onChange={(e) => setResizeWidth(Number(e.target.value))}
          style={styles.numberInput}
        />
        &nbsp;px
      </label>

      <label style={styles.label}>
        Altura
        <input
          type="number"
          value={resizeHeight}
          onChange={(e) => setResizeHeight(Number(e.target.value))}
          style={styles.numberInput}
        />
        &nbsp;px
      </label>

      <button style={styles.button} onClick={resizeImage}>
        Redimensionar
      </button>

      {/* Resultado */}
      {optimizedURL && (
        <div style={styles.previewBox}>
          <h4>Resultado:</h4>
          <img src={optimizedURL} alt="Imagem otimizada" style={styles.img} />
          <br />
          <a href={optimizedURL} download="imagem_otimizada.jpg">
            Baixar Imagem
          </a>
        </div>
      )}
    </section>
  );
};

export default ImageOptimizer;
