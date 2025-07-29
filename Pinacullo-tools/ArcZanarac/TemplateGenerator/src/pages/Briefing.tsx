import React, { useState } from "react";
import jsPDF from "jspdf";
import "./loginpage.css";

type BriefingData = {
  historia: string;
  significado: string;
  objetivo: string;
  cores: string[];
  nicho: string;
  layout: string;
  publico: string;
  concorrentes: string;
  experiencia: string;
};

export default function BriefingPage() {
  const [data, setData] = useState<BriefingData>({
    historia: "",
    significado: "",
    objetivo: "",
    cores: Array(5).fill("#000000"),
    nicho: "",
    layout: "",
    publico: "",
    concorrentes: "",
    experiencia: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Caso queira enviar para um backend, coloque a lógica aqui.
    // Por enquanto só evita o reload.
    alert("Briefing enviado (client-side). Você ainda pode gerar o PDF!");
  };

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    colorIndex?: number
  ) => {
    const { name, value } = e.target;

    if (name === "cores" && typeof colorIndex === "number") {
      setData((prev) => {
        const next = [...prev.cores];
        next[colorIndex] = value;
        return { ...prev, cores: next };
      });
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 18;
    let y = margin;

    const addTitle = (title: string) => {
      y = maybeAddPage(y, pageHeight, margin, doc);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(title, margin, y);
      y += lineHeight;
    };

    const addParagraph = (text: string) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const splitted = doc.splitTextToSize(text || "-", maxWidth);
      splitted.forEach((line: string) => {
        y = maybeAddPage(y, pageHeight, margin, doc);
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += 6;
    };

    // HERO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Briefing Supremo de Personalização", margin, y);
    y += lineHeight * 1.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const heroText =
      "Cada resposta sua faz nossa equipe explodir em criatividade e garante um resultado digno de manchete! Prepare‑se para impressionar.";
    const heroSplit = doc.splitTextToSize(heroText, maxWidth);
    heroSplit.forEach((line: string) => {
      y = maybeAddPage(y, pageHeight, margin, doc);
      doc.text(line, margin, y);
      y += lineHeight;
    });

    y += lineHeight;

    // Campos
    addTitle("Qual a história da EMPRESA?");
    addParagraph(data.historia);

    addTitle("Qual o significado de NOME_DA_EMPRESA?");
    addParagraph(data.significado);

    addTitle("Objetivo da EMPRESA");
    addParagraph(data.objetivo);

    addTitle("Cores da EMPRESA (até 5)");
    addParagraph(data.cores.join(", "));

    addTitle("Nicho da EMPRESA");
    addParagraph(data.nicho);

    addTitle("Estilos de layout desejados");
    addParagraph(data.layout);

    addTitle("Público‑alvo");
    addParagraph(data.publico);

    addTitle("Concorrentes para análise técnica");
    addParagraph(data.concorrentes);

    addTitle("Experiência passada com empresas de desenvolvimento (opcional)");
    addParagraph(data.experiencia);

    doc.save("briefing.pdf");
  };

  return (
    <main className="page">
      {/* TOPO */}
      <header className="hero">

        <h1 className="hero-title">Do Zero ao Deploy</h1>
        <p className="hero-subtitle">
          Projetamos, desenvolvemos e testamos aplicações robustas, seguras e
          escaláveis — com foco total no seu resultado.
        </p>
      </header>

      {/* BRIEFING */}
      <div className="briefing-container">
        <div className="banner">
          <h1>Briefing de Personalização</h1>
          <p>
            Cada resposta sua faz nossa equipe <strong>explodir em criatividade</strong> e
            garante um resultado digno de manchete! Prepare‑se para impressionar.
          </p>
        </div>

        <form className="briefing-form" onSubmit={submit}>
          <label>
            Qual a história da <em></em>
            <textarea
              name="historia"
              value={data.historia}
              onChange={handle}
              required
            />
          </label>

          <label>
          Qual o significado de <em></em>
            <textarea
              name="significado"
              value={data.significado}
              onChange={handle}
              required
            />
          </label>

          <label>
            Qual o objetivo da <em></em>
            <textarea
              name="objetivo"
              value={data.objetivo}
              onChange={handle}
              required
            />
          </label>

          <fieldset>
            <legend>Cores da <em></em> (até&nbsp;5)</legend>
            {data.cores.map((c, i) => (
              <input
                key={i}
                type="color"
                name="cores"
                value={c}
                onChange={(e) => handle(e, i)}
                required
              />
            ))}
          </fieldset>

          <label className="inline">
            Nicho <em></em>
            <input
              type="text"
              name="nicho"
              value={data.nicho}
              onChange={handle}
              required
            />
          </label>

          <label>
            Estilos de layout desejados
            <textarea
              name="layout"
              value={data.layout}
              onChange={handle}
              required
            />
          </label>

          <label>
            Público‑alvo
            <textarea
              name="publico"
              value={data.publico}
              onChange={handle}
              required
            />
          </label>

          <label>
            Concorrentes para análise técnica
            <textarea
              name="concorrentes"
              value={data.concorrentes}
              onChange={handle}
              required
            />
          </label>

          <label>
            Experiência passada com empresas de desenvolvimento (opcional)
            <textarea
              name="experiencia"
              value={data.experiencia}
              onChange={handle}
            />
          </label>

          <button type="submit" className="send-btn">
            Enviar Briefing
          </button>
        </form>

        <button className="pdf-btn" onClick={generatePDF}>
          Gerar PDF do Briefing
        </button>
      </div>
    </main>
  );
}

// --- Helpers ---
function maybeAddPage(
  currentY: number,
  pageHeight: number,
  margin: number,
  doc: jsPDF
) {
  if (currentY + 24 > pageHeight - margin) {
    doc.addPage();
    return margin;
  }
  return currentY;
}
