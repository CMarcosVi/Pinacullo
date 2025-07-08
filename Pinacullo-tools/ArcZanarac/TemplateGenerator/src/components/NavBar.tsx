// src/components/Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

/* ——– Abas visíveis no sidebar ——– */
const tabs = [
  { name: "WppGenerator",     path: "/WppGenerator",        icon: "📱" },
  { name: "QrCodeGenerator",  path: "/QrCodeGenerator",     icon: "🔳" },
  { name: "ResizeImg",        path: "/ImgRedimensionation", icon: "↔️" },
  { name: "CreateTemplate",   path: "/CreateTemplate",      icon: "📄" },
];

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  /* Só mostra se a rota atual existir em tabs */
  const isVisible = tabs.some(tab => tab.path === pathname);
  if (!isVisible) return null;

  return (
    <aside style={styles.sidebar}>
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          style={{
            ...styles.link,
            ...(pathname === tab.path ? styles.active : {}),
          }}
        >
          <span style={styles.icon}>{tab.icon}</span>
          {tab.name}
        </Link>
      ))}
    </aside>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "200px",
    padding: "20px 12px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    background: "#111",
    borderRight: "1px solid #222",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    color: "#eee",
    fontWeight: 600,
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
  },
  icon: {
    fontSize: "1.1rem",
    lineHeight: 1,
  },
  active: {
    background: "#1f1f1f",
    borderLeft: "4px solid lime",
    transform: "translateX(2px)",
  },
} satisfies Record<string, React.CSSProperties>;

export default Navbar;
