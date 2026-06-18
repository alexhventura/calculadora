export interface PdfLine {
  label: string;
  value: string;
}

export interface PdfExportPayload {
  titulo: string;
  subtitulo?: string;
  dataGeracao: string;
  entradas: PdfLine[];
  resultados: PdfLine[];
  observacao?: string;
  nomeArquivo: string;
}

const MARGIN = 16;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BRAND = '#800020';

function wrapText(doc: import('jspdf').jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

export async function exportCalculationPdf(payload: PdfExportPayload): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > 285) {
      doc.addPage();
      y = MARGIN;
    }
  };

  doc.setFillColor(128, 0, 32);
  doc.rect(0, 0, PAGE_W, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CalculoJurosCompostos.com.br', MARGIN, 12);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(payload.titulo, MARGIN, 20);
  if (payload.subtitulo) {
    doc.setFontSize(9);
    doc.text(payload.subtitulo, MARGIN, 25);
  }

  y = 36;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text(`Gerado em ${payload.dataGeracao}`, MARGIN, y);
  y += 10;

  const section = (title: string, lines: PdfLine[]) => {
    addPageIfNeeded(14);
    doc.setTextColor(128, 0, 32);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, MARGIN, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (const line of lines) {
      addPageIfNeeded(10);
      doc.setTextColor(80, 80, 80);
      doc.text(line.label, MARGIN, y);
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'bold');
      const valueLines = wrapText(doc, line.value, CONTENT_W * 0.55);
      doc.text(valueLines, MARGIN + CONTENT_W * 0.42, y);
      doc.setFont('helvetica', 'normal');
      y += Math.max(6, valueLines.length * 5);
    }
    y += 4;
  };

  section('Dados informados', payload.entradas);
  section('Resultados', payload.resultados);

  if (payload.observacao) {
    addPageIfNeeded(16);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(8);
    const obs = wrapText(doc, payload.observacao, CONTENT_W);
    doc.text(obs, MARGIN, y);
  }

  doc.save(payload.nomeArquivo);
}

export function formatPdfDate(): string {
  return new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
