import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng, toJpeg, toSvg } from "html-to-image";

/**
 * QRCodeGenerator – React/TypeScript (sem bibliotecas de UI/CSS)
 * ------------------------------------------------------------------
 *   • Edita cor do QR e do fundo
 *   • Permite logo central opcional
 *   • Controle de tamanho (128‑512 px)
 *   • Download em PNG, JPG e SVG
 *
 * Dependências:  npm i react-qr-code html-to-image
 */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 4,
  border: "1px solid #ccc",
  borderRadius: 4,
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  border: "none",
  borderRadius: 4,
  background: "#222",
  color: "#fff",
  cursor: "pointer",
};

const QRCodeGenerator: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(256);
  const [logoSrc, setLogoSrc] = useState<string | undefined>();
  const qrRef = useRef<HTMLDivElement>(null);

  // Logo upload → base64
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Download helper
  const download = async (format: "png" | "jpg" | "svg") => {
    if (!qrRef.current) return;

    let dataUrl: string;
    if (format === "svg") {
      const svgEl = qrRef.current.querySelector("svg");
      if (!svgEl) return;
      dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgEl.outerHTML
      )}`;
    } else if (format === "png") {
      dataUrl = await toPng(qrRef.current);
    } else {
      dataUrl = await toJpeg(qrRef.current);
    }

    const link = document.createElement("a");
    link.download = `qrcode.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section
      style={{
        margin: "auto",
        padding: 16,
        fontFamily: "Arial, sans-serif",
      }} className="qr-container"
    >
      <h2 style={{ textAlign: "center", marginBottom: 16 }} className="qr-title">Gerador de QR Code</h2>

      {/* Texto */}
      <label style={{ display: "block", marginTop: 12 }}>
        Conteúdo do QR:
        <input
          type="text"
          className="qr-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cole um link ou texto"
          style={inputStyle}
        />
      </label>

      {/* Cores */}
      <div className="qr-color-group" style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <label>
          Cor do QR:
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label>
          Cor de fundo:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>

      {/* Tamanho */}
      <label style={{ display: "block", marginTop: 12 }}>
        Tamanho ({size}px):
        <input
          type="range"
          className="qr-range"
          min={128}
          max={512}
          step={16}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          style={{ width: "100%" }}
        />
      </label>

      {/* Logo */}
      <label className="qr-upload" style={{ display: "block", marginTop: 12 }}>
        Logo (opcional):
        <input type="file" accept="image/*" onChange={handleFile} />
      </label>

      {/* Preview */}
      <div
        ref={qrRef}
        className="qr-preview"
        style={{
          margin: "24px auto",
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QRCode
          value={value || " "}
          bgColor={bgColor}
          fgColor={fgColor}
          size={size}
          level="H"
          style={{ width: "100%", height: "100%" }}
          {...(logoSrc && {
            imageSettings: {
              src: logoSrc,
              height: size * 0.2,
              width: size * 0.2,
              excavate: true,
            },
          })}
        />
      </div>

      {/* Download botões */}
      <div className="qr-buttons" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="qr-button" style={buttonStyle} onClick={() => download("png")}>PNG</button>
        <button className="qr-button" style={buttonStyle} onClick={() => download("jpg")}>JPG</button>
        <button className="qr-button" style={buttonStyle} onClick={() => download("svg")}>SVG</button>
      </div>
    </section>
  );
};
/* Paleta centralizada para ficar fácil trocar cores */
const palette = {
  primary: "#16a34a",
  primaryLight: "#4ade80",
  textLight: "#e2e8f0",
  border: "rgba(255,255,255,0.1)",
  glass: "rgba(255,255,255,0.05)",
};

export const styles = {
  /* ---------- Container/Card ---------- */
  container: {
    maxWidth: 420,
    margin: "48px auto",
    padding: "32px 28px",
    borderRadius: 16,
    background: palette.glass,
    backdropFilter: "blur(12px)",
    border: `1px solid ${palette.border}`,
    color: palette.textLight,
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  },

  /* ---------- Título ---------- */
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 24,
    color: palette.primaryLight,
  },

  /* ---------- Labels & inputs ---------- */
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginTop: 16,
  },

  input: {
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: "rgba(255,255,255,0.08)",
    color: palette.textLight,
    outline: "none",
  },

  range: {
    /* mesmo visual do input - muda só a aparência */
    width: "100%",
    marginTop: 6,
    cursor: "pointer",
  },

  /* ---------- Cores ---------- */
  colorGroup: {
    display: "flex",
    gap: 16,
    marginTop: 16,
  },

  /* ---------- Preview ---------- */
  preview: {
    margin: "32px auto",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },

  /* ---------- Botões ---------- */
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },

  button: {
    padding: "10px 22px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: palette.textLight,
    background: palette.primary,
    cursor: "pointer",
  },
};

export default QRCodeGenerator;
