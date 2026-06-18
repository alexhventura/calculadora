export interface PdfLine {
  label: string;
  value: string;
}

export interface PdfSection {
  title: string;
  lines: PdfLine[];
}

export interface PdfTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface PdfExportPayload {
  titulo: string;
  subtitulo?: string;
  dataGeracao: string;
  sections: PdfSection[];
  tables?: PdfTable[];
  observacao?: string;
  nomeArquivo: string;
}

const MARGIN = 14;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;

function wrapText(doc: import('jspdf').jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

export async function exportCalculationPdf(payload: PdfExportPayload): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > 287) {
      doc.addPage();
      y = MARGIN;
    }
  };

  doc.setFillColor(128, 0, 32);
  doc.rect(0, 0, PAGE_W, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('CalculoJurosCompostos.com.br', MARGIN, 12);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(payload.titulo, MARGIN, 20);
  if (payload.subtitulo) {
    doc.setFontSize(8.5);
     doc.text(payload.subtitulo, MARGIN, 25);
  }

  y = 36;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text(`Gerado em ${payload.dataGeracao}`, MARGIN, y);
  y += 9;

  const renderSection = (section: PdfSection) => {
    if (section.lines.length === 0) return;
    addPageIfNeeded(12);
    doc.setTextColor(128, 0, 32);
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.text(section.title, MARGIN, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    for (const line of section.lines) {
      addPageIfNeeded(8);
      doc.setTextColor(90, 90, 90);
      doc.text(line.label, MARGIN, y);
      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      const valueLines = wrapText(doc, line.value, CONTENT_W * 0.52);
      doc.text(valueLines, MARGIN + CONTENT_W * 0.4, y);
      doc.setFont('helvetica', 'normal');
      y += Math.max(5.5, valueLines.length * 4.5);
    }
    y += 5;
  };

  const renderTable = (table: PdfTable) => {
    if (table.rows.length === 0) return;
    addPageIfNeeded(14);
    doc.setTextColor(128, 0, 32);
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.text(table.title, MARGIN, y);
    y += 6;

    const colCount = table.headers.length;
    const colW = CONTENT_W / colCount;
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    table.headers.forEach((h, i) => {
      doc.text(h, MARGIN + i * colW, y, { maxWidth: colW - 2 });
    });
    y += 5;
    doc.setDrawColor(220, 220, 220);
    doc.line(MARGIN, y - 2, MARGIN + CONTENT_W, y - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    for (const row of table.rows) {
      addPageIfNeeded(6);
      let rowH = 5;
      const cellLines = row.map((cell, i) => {
        const lines = wrapText(doc, cell, colW - 2);
        rowH = Math.max(rowH, lines.length * 4);
        return lines;
      });
      cellLines.forEach((lines, i) => {
        doc.setTextColor(i === colCount - 1 ? 25 : 60, i === colCount - 1 ? 25 : 60, i === colCount - 1 ? 25 : 60);
        if (i === colCount - 1) doc.setFont('helvetica', 'bold');
        doc.text(lines, MARGIN + i * colW, y, { maxWidth: colW - 2 });
        if (i === colCount - 1) doc.setFont('helvetica', 'normal');
      });
      y += rowH;
    }
    y += 6;
  };

  for (const section of payload.sections) {
    renderSection(section);
  }

  if (payload.tables) {
    for (const table of payload.tables) {
      renderTable(table);
    }
  }

  if (payload.observacao) {
    addPageIfNeeded(14);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    const obs = wrapText(doc, payload.observacao, CONTENT_W);
    doc.text(obs, MARGIN, y);
  }

  doc.save(payload.nomeArquivo);
}
