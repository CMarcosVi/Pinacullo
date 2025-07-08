// src/components/WhatsAppLinkGenerator.tsx
import React, { useState } from "react";

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
    maxWidth: 420,
    maxHeight: 500,
    margin: "48px auto",
    padding: "32px 28px",
    borderRadius: 16,
    background: palette.glass,
    backdropFilter: "blur(12px)",
    border: `1px solid ${palette.border}`,
    color: palette.textLight,
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  },

  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center" as const,
    marginBottom: 24,
    color: palette.primaryLight,
  },

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

  textarea: {
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: "rgba(255,255,255,0.08)",
    color: palette.textLight,
    outline: "none",
    resize: "vertical" as const,
    minHeight: 80,
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

  linkBox: {
    marginTop: 28,
    wordBreak: "break-all" as const,
    padding: "14px 16px",
    borderRadius: 8,
    background: "rgba(0,0,0,0.35)",
    border: `1px solid ${palette.border}`,
  },
} as const;

/* ============================================================
   🧩 COMPONENTE
   ============================================================ */
const WhatsAppLinkGenerator: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const sanitizePhone = (raw: string) => raw.replace(/\D/g, ""); // remove tudo que não é número

  const generateLink = () => {
    const sanitizedPhone = sanitizePhone(phone);
    const encodedMessage = encodeURIComponent(message.trim());

    if (!sanitizedPhone || sanitizedPhone.length < 8) {
      alert("Número de telefone inválido.");
      return;
    }

    setLink(`https://wa.me/${sanitizedPhone}?text=${encodedMessage}`);
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Gerador de Link para WhatsApp</h2>

      <label style={styles.label}>
        Número de telefone (com DDD)
        <input
          type="tel"
          placeholder="Ex: 11999998888"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Mensagem
        <textarea
          placeholder="Digite sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />
      </label>

      <button style={styles.button} onClick={generateLink}>
        Gerar Link
      </button>

      {link && (
        <div style={styles.linkBox}>
          <strong>Link Gerado:</strong>
          <br />
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </div>
      )}
    </section>
  );
};

export default WhatsAppLinkGenerator;
