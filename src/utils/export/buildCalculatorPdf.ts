import type { ActiveTool } from '../calculations/toolCalculations';
import { formatBRL } from '../format';
import type { PdfExportPayload, PdfLine } from './exportCalculationPdf';

interface BuildPdfInput {
  activeTool: ActiveTool;
  toolTitle: string;
  isAdvanced: boolean;
  // juros
  valorInicialStr?: string;
  aporteMensalStr?: string;
  tempo?: number;
  tempoUnidade?: string;
  taxaAnual?: number;
  // clt-pj
  salarioCltStr?: string;
  cltVrStr?: string;
  cltSaudeStr?: string;
  cltOutrosStr?: string;
  // aposentadoria
  aposIdadeAtual?: number;
  aposIdadeAlvo?: number;
  aposRendaStr?: string;
  aposPatrimonioStr?: string;
  // rescisao
  rescisaoSalarioStr?: string;
  rescisaoDataAdmissao?: string;
  rescisaoDataDesligamento?: string;
  rescisaoMotivo?: string;
  // conversor
  conversorValue?: number;
  conversorFrom?: string;
  conversorTo?: string;
  conversorResult?: number;
  // results
  painelCards: { titulo: string; valor: number; subtitulo?: string }[];
  extraLines?: PdfLine[];
}

const MOTIVO_LABELS: Record<string, string> = {
  sem_justa: 'Sem justa causa (empresa)',
  pedido_demissao: 'Pedido de demissão',
  com_justa: 'Com justa causa',
  acordo: 'Acordo trabalhista',
};

export function buildCalculatorPdfPayload(input: BuildPdfInput): PdfExportPayload {
  const entradas: PdfLine[] = [];
  const resultados: PdfLine[] = input.painelCards.map((c) => ({
    label: c.titulo,
    value: `${formatBRL(c.valor)}${c.subtitulo ? ` — ${c.subtitulo}` : ''}`,
  }));

  if (input.extraLines) {
    resultados.push(...input.extraLines);
  }

  switch (input.activeTool) {
    case 'juros':
      entradas.push(
        { label: 'Valor inicial', value: `R$ ${input.valorInicialStr ?? '0'}` },
        { label: 'Aporte mensal', value: `R$ ${input.aporteMensalStr ?? '0'}` },
        { label: 'Período', value: `${input.tempo ?? 0} ${input.tempoUnidade ?? 'anos'}` },
        { label: 'Taxa anual', value: `${input.taxaAnual?.toFixed(2) ?? '0'}%` },
      );
      break;
    case 'clt-pj':
      entradas.push(
        { label: 'Salário CLT', value: `R$ ${input.salarioCltStr ?? '0'}` },
        { label: 'VR/VA', value: `R$ ${input.cltVrStr ?? '0'}` },
        { label: 'Plano de saúde', value: `R$ ${input.cltSaudeStr ?? '0'}` },
        { label: 'Outros benefícios', value: `R$ ${input.cltOutrosStr ?? '0'}` },
      );
      break;
    case 'aposentadoria':
      entradas.push(
        { label: 'Idade atual', value: `${input.aposIdadeAtual ?? 0} anos` },
        { label: 'Idade para aposentar', value: `${input.aposIdadeAlvo ?? 0} anos` },
        { label: 'Renda mensal desejada', value: `R$ ${input.aposRendaStr ?? '0'}` },
        { label: 'Patrimônio atual', value: `R$ ${input.aposPatrimonioStr ?? '0'}` },
      );
      break;
    case 'rescisao':
      entradas.push(
        { label: 'Salário bruto', value: `R$ ${input.rescisaoSalarioStr ?? '0'}` },
        { label: 'Admissão', value: input.rescisaoDataAdmissao ?? '—' },
        { label: 'Desligamento', value: input.rescisaoDataDesligamento ?? '—' },
        {
          label: 'Tipo de rescisão',
          value: MOTIVO_LABELS[input.rescisaoMotivo ?? ''] ?? input.rescisaoMotivo ?? '—',
        },
      );
      break;
    default:
      break;
  }

  if (input.conversorFrom) {
    entradas.push(
      { label: 'Valor', value: String(input.conversorValue ?? 0) },
      { label: 'De', value: input.conversorFrom },
      { label: 'Para', value: input.conversorTo ?? 'BRL' },
    );
    if (input.conversorResult != null) {
      resultados.push({
        label: 'Valor convertido',
        value: `${input.conversorResult.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ${input.conversorTo}`,
      });
    }
  }

  const slug = input.activeTool === 'juros' ? 'juros-compostos' : input.activeTool;
  const nomeArquivo = input.conversorFrom
    ? `conversor-${input.conversorFrom}-${input.conversorTo}-${Date.now()}.pdf`
    : `calculo-${slug}-${Date.now()}.pdf`;

  return {
    titulo: input.toolTitle,
    subtitulo: input.isAdvanced ? 'Modo completo / personalizado' : 'Modo rápido',
    dataGeracao: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    entradas,
    resultados,
    observacao:
      'Simulação educativa gerada em calculojuroscompostos.com.br. Valores são estimativas e não substituem orientação profissional.',
    nomeArquivo,
  };
}
