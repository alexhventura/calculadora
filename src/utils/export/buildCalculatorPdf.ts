import type { RegistroMensal } from '../../types';
import type { AdvancedCalculatorOptions } from '../../types/calculator';
import type { ToolCalculationResult } from '../calculations/toolCalculations';
import type { ActiveTool, RescisaoMotivo } from '../calculations/toolCalculations';
import { formatBRL } from '../format';
import type { PdfExportPayload, PdfLine, PdfSection, PdfTable } from './exportCalculationPdf';

const MOTIVO_LABELS: Record<RescisaoMotivo, string> = {
  sem_justa: 'Sem justa causa (empresa)',
  pedido_demissao: 'Pedido de demissão',
  com_justa: 'Com justa causa',
  acordo: 'Acordo trabalhista',
};

const REGIME_PJ_LABELS: Record<string, string> = {
  simples_6: 'Simples Nacional 6%',
  mei: 'MEI',
  lucro_presumido: 'Lucro Presumido',
};

const BENEFICIO_LABELS: Record<string, string> = {
  inss: 'INSS',
  servidor: 'Servidor público',
  previdencia_privada: 'Previdência privada',
  independente: 'Planejamento independente',
};

const CENARIO_LABELS: Record<string, string> = {
  conservador: 'Conservador (3% real a.a.)',
  moderado: 'Moderado (5% real a.a.)',
  agressivo: 'Agressivo (8% real a.a.)',
  personalizado: 'Personalizado',
};

function moneyStr(s: string): string {
  return s.trim() ? `R$ ${s}` : '—';
}

function line(label: string, value: string): PdfLine {
  return { label, value };
}

function cardLines(cards: { titulo: string; valor: number; subtitulo?: string }[]): PdfLine[] {
  return cards.map((c) => ({
    label: c.titulo,
    value: `${formatBRL(c.valor)}${c.subtitulo ? ` (${c.subtitulo})` : ''}`,
  }));
}

function advancedJurosLines(adv: AdvancedCalculatorOptions['juros']): PdfLine[] {
  return [
    line('Frequência de aportes', adv.aporteFrequencia),
    line('Inflação', adv.inflacaoModo === 'ipca_api' ? 'IPCA (API)' : adv.inflacaoModo === 'ipca_manual' ? `IPCA manual ${adv.inflacaoManual}%` : 'Desconsiderada'),
    line('Tributação', adv.tributacao === 'none' ? 'Sem IR' : adv.tributacao === 'ir_regressivo' ? 'IR regressivo' : `IR ${adv.irCustomPercent}%`),
    line('Taxa administração anual', `${adv.taxaAdminAnual}%`),
    line('Taxa performance anual', `${adv.taxaPerformanceAnual}%`),
    line('Taxa custódia anual', `${adv.taxaCustodiaAnual}%`),
  ];
}

function advancedCltLines(adv: AdvancedCalculatorOptions['cltPj']): PdfLine[] {
  return [
    line('Regime PJ', REGIME_PJ_LABELS[adv.regimePj] ?? adv.regimePj),
    line('Contador mensal', formatBRL(adv.contadorMensal)),
    line('Faturamento PJ informado', adv.faturamentoPjManual != null ? formatBRL(adv.faturamentoPjManual) : '—'),
    line('Incluir FGTS na equivalência', adv.incluirFgtsComparativo ? 'Sim' : 'Não'),
  ];
}

function advancedAposLines(adv: AdvancedCalculatorOptions['aposentadoria'], salarioStr: string): PdfLine[] {
  return [
    line('Salário atual', moneyStr(salarioStr)),
    line('Tipo de benefício', BENEFICIO_LABELS[adv.tipoBeneficio] ?? adv.tipoBeneficio),
    line('Forma de projeção', adv.modoProjecao.replace(/_/g, ' ')),
    line('Salário médio', formatBRL(adv.salarioMedio)),
    line('Benefício mensal manual', adv.beneficioMensalManual != null ? formatBRL(adv.beneficioMensalManual) : 'Estimativa automática'),
    line('Aporte mensal atual', formatBRL(adv.aporteMensalAtual)),
    line('Cenário de investimento', CENARIO_LABELS[adv.cenario] ?? adv.cenario),
    line('Taxa real personalizada', `${adv.taxaRealPersonalizada}% a.a.`),
    line('Retirada mensal do patrimônio', `${adv.taxaSaqueMensal}%`),
  ];
}

function advancedRescisaoLines(adv: AdvancedCalculatorOptions['rescisao']): PdfLine[] {
  return [
    line('Férias vencidas', adv.feriasVencidas ? 'Sim' : 'Não'),
    line('Aviso prévio indenizado', adv.avisoPrevioIndenizado ? 'Sim' : 'Não'),
    line('Dias aviso prévio', String(adv.avisoPrevioDias)),
    line('Verbas manuais', adv.usarVerbasManuais ? 'Sim' : 'Não'),
    line('Período manual', adv.usarPeriodoManual ? `${adv.mesesManual} meses / ${adv.diasManual} dias` : 'Calculado pelas datas'),
  ];
}

function jurosMonthlyTable(registros: RegistroMensal[]): PdfTable {
  const rows = registros
    .filter((r) => r.mesIndex > 0)
    .map((r) => [
      r.tempoExibicao || `Mês ${r.mesIndex}`,
      formatBRL(r.totalInvestido),
      formatBRL(r.jurosDoMesUser),
      formatBRL(r.jurosAcumuladoUser),
      formatBRL(r.saldoUser),
      formatBRL(r.saldoPoupanca),
      formatBRL(r.saldoCDI ?? r.saldoSelic),
    ]);
  return {
    title: 'Evolução mês a mês',
    headers: ['Período', 'Investido', 'Juros/mês', 'Juros acum.', 'Saldo', 'Poupança', 'CDI/Selic'],
    rows,
  };
}

export interface CalculatorPdfFormState {
  activeTool: ActiveTool;
  toolTitle: string;
  isAdvanced: boolean;
  advanced?: AdvancedCalculatorOptions;
  selicRate: number;
  ipcaRate: number;
  taxaPeriodo?: 'anual' | 'mensal';
  taxaTipo?: string;
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
  faturamentoPjStr?: string;
  // aposentadoria
  aposIdadeAtual?: number;
  aposIdadeAlvo?: number;
  aposRendaStr?: string;
  aposPatrimonioStr?: string;
  aposSalarioStr?: string;
  // rescisao
  rescisaoSalarioStr?: string;
  rescisaoDataAdmissao?: string;
  rescisaoDataDesligamento?: string;
  rescisaoMotivo?: string;
  rescisaoMeses?: number;
  rescisaoDias?: number;
}

export interface ConversorPdfState {
  toolTitle: string;
  isAdvanced: boolean;
  value: number;
  from: string;
  to: string;
  result: number;
  quoteType?: string;
  rate?: number;
  lastUpdated?: string;
}

export function buildCalculatorPdfPayload(
  form: CalculatorPdfFormState,
  result: ToolCalculationResult,
): PdfExportPayload {
  const sections: PdfSection[] = [];

  // --- Entradas principais ---
  const entradas: PdfLine[] = [];
  switch (form.activeTool) {
    case 'juros':
      entradas.push(
        line('Quanto você já tem', moneyStr(form.valorInicialStr ?? '')),
        line('Quanto guardar por mês', moneyStr(form.aporteMensalStr ?? '')),
        line('Por quanto tempo', `${form.tempo ?? 0} ${form.tempoUnidade ?? 'anos'}`),
        line('Ganho esperado', `${form.taxaAnual?.toFixed(2) ?? '0'}% ${form.taxaPeriodo === 'mensal' ? 'a.m.' : 'a.a.'}`),
        line('Referência de taxa', form.taxaTipo ?? 'manual'),
        line('Selic referência', `${form.selicRate.toFixed(2)}% a.a.`),
        line('IPCA referência', `${form.ipcaRate.toFixed(2)}% a.a.`),
      );
      break;
    case 'clt-pj':
      entradas.push(
        line('Salário bruto CLT', moneyStr(form.salarioCltStr ?? '')),
        line('VR/VA mensal', moneyStr(form.cltVrStr ?? '')),
        line('Plano de saúde mensal', moneyStr(form.cltSaudeStr ?? '')),
        line('Outros benefícios mensais', moneyStr(form.cltOutrosStr ?? '')),
      );
      if (form.faturamentoPjStr?.trim()) {
        entradas.push(line('Faturamento PJ informado', moneyStr(form.faturamentoPjStr)));
      }
      break;
    case 'aposentadoria':
      entradas.push(
        line('Idade atual', `${form.aposIdadeAtual ?? 0} anos`),
        line('Idade para aposentar', `${form.aposIdadeAlvo ?? 0} anos`),
        line('Renda mensal desejada', moneyStr(form.aposRendaStr ?? '')),
        line('Patrimônio atual', moneyStr(form.aposPatrimonioStr ?? '')),
      );
      break;
    case 'rescisao':
      entradas.push(
        line('Salário bruto', moneyStr(form.rescisaoSalarioStr ?? '')),
        line('Data de admissão', form.rescisaoDataAdmissao || '—'),
        line('Data de desligamento', form.rescisaoDataDesligamento || '—'),
        line('Tipo de rescisão', MOTIVO_LABELS[form.rescisaoMotivo as RescisaoMotivo] ?? form.rescisaoMotivo ?? '—'),
        line('Tempo trabalhado', `${form.rescisaoMeses ?? 0} meses · ${form.rescisaoDias ?? 0} dias no último mês`),
      );
      break;
  }
  sections.push({ title: 'Dados informados', lines: entradas });

  if (form.isAdvanced && form.advanced) {
    let advLines: PdfLine[] = [];
    if (form.activeTool === 'juros') advLines = advancedJurosLines(form.advanced.juros);
    if (form.activeTool === 'clt-pj') advLines = advancedCltLines(form.advanced.cltPj);
    if (form.activeTool === 'aposentadoria') advLines = advancedAposLines(form.advanced.aposentadoria, form.aposSalarioStr ?? '');
    if (form.activeTool === 'rescisao') advLines = advancedRescisaoLines(form.advanced.rescisao);
    if (advLines.length) sections.push({ title: 'Modo completo / personalização', lines: advLines });
  }

  sections.push({
    title: 'Resumo em destaque',
    lines: cardLines(result.painelTopCards),
  });

  const tables: PdfTable[] = [];
  const t = result.totais;

  if (form.activeTool === 'juros') {
    sections.push({
      title: 'Análise de inflação e poder de compra',
      lines: [
        line('Poder de compra real protegido', formatBRL(t.poderCompraReal)),
        line('Perda por corrosão inflacionária', formatBRL(t.desvalorizacaoInflacao)),
        line('Corrosão sobre valor bruto', t.valorBrutoUser > 0 ? `${((t.desvalorizacaoInflacao / t.valorBrutoUser) * 100).toFixed(0)}%` : '0%'),
        line('IPCA meta referência', `${form.ipcaRate.toFixed(2)}% a.a.`),
      ],
    });
    sections.push({
      title: 'Comparativos de rendimento',
      lines: [
        line('Ganho acima da Poupança', formatBRL(t.ganhoAdicionalPoupanca)),
        line('Diferença vs Selic/CDI', formatBRL(t.ganhoAdicionalSelic)),
        line('Valor final Poupança', formatBRL(t.valorBrutoPoupanca)),
        line('Valor final Selic', formatBRL(t.valorBrutoSelic)),
        line('Valor final CDI', formatBRL(t.valorBrutoCDI)),
        line('Total investido', formatBRL(t.totalInvestidoUser)),
        line('Ganho com juros', formatBRL(t.totalJurosUser)),
        line('Valor acumulado bruto', formatBRL(t.valorBrutoUser)),
      ],
    });
    if (result.registros.length > 1) {
      tables.push(jurosMonthlyTable(result.registros));
    }
  }

  if (form.activeTool === 'clt-pj' && result.clt && result.pj) {
    const clt = result.clt;
    const pj = result.pj;
    sections.push({
      title: 'Detalhamento CLT',
      lines: [
        line('Salário bruto mensal', formatBRL(clt.salarioBruto)),
        line('INSS', `-${formatBRL(clt.inss)}`),
        line('IRRF', `-${formatBRL(clt.irrf)}`),
        line('Renda líquida na conta', formatBRL(clt.mensalLiquido)),
        line('Benefícios (VR/VA + saúde + outros)', `+${formatBRL(clt.beneficiosMensais)}`),
        line('FGTS provisionado (mensal)', `+${formatBRL(clt.fgtsAnual / 12)}`),
        line('Renda equivalente mensal real CLT', formatBRL(clt.receitaMensalEquiv)),
      ],
    });
    sections.push({
      title: 'Detalhamento PJ',
      lines: [
        line('Faturamento PJ mínimo equivalente', formatBRL(pj.minimoFaturamento)),
        line('Simples Nacional / impostos', `-${formatBRL(pj.das)}`),
        line('Contabilidade', `-${formatBRL(pj.contador)}`),
        line('PJ disponível para retirada', formatBRL(pj.mensalLiquido)),
        line('Faturamento proposta comparada', formatBRL(pj.faturamentoProposta ?? pj.minimoFaturamento)),
        line('Líquido da proposta PJ', formatBRL(pj.liquidoProposta ?? pj.mensalLiquido)),
      ],
    });
    sections.push({
      title: 'Conclusão comparativa',
      lines: [
        line('Cenário recomendado', result.melhorCenario ?? '—'),
        line('Vantagem anual de equivalência', formatBRL(result.vantagemAnual ?? 0)),
        line('Vantagem mensal', formatBRL(result.vantagemMensal ?? 0)),
        line(
          'Fator multiplicador PJ/CLT',
          clt.salarioBruto > 0 ? `${((pj.minimoFaturamento / clt.salarioBruto)).toFixed(2)}x` : '—',
        ),
      ],
    });
  }

  if (form.activeTool === 'aposentadoria') {
    sections.push({
      title: 'Planejamento de aposentadoria',
      lines: [
        line('Anos para acumular', `${result.anosAcumulo ?? 0} anos`),
        line('Meses de acúmulo', `${result.mesesAcumulo ?? 0} meses`),
        line('Renda desejada mensal', moneyStr(form.aposRendaStr ?? '')),
        line('Cobertura INSS estimada', formatBRL(result.coberturaINSS ?? 0)),
        line('Lacuna a complementar', formatBRL(result.lacunaRenda ?? 0)),
        line('Meta patrimonial', formatBRL(result.patrimonioNecessario ?? 0)),
        line('Patrimônio atual', formatBRL(result.patrimonioAtual ?? 0)),
        line('Projeção do patrimônio atual', formatBRL(result.patrimonioAtualFuturo ?? 0)),
        line('Aporte mensal recomendado', formatBRL(result.aporteMensalNecessario ?? 0)),
        line('Total a investir (estimado)', formatBRL(result.totalInvestido ?? 0)),
        line('Juros totais projetados', formatBRL(result.jurosTotais ?? 0)),
      ],
    });
  }

  if (form.activeTool === 'rescisao' && result.verbas && result.fgts) {
    const v = result.verbas;
    const f = result.fgts;
    sections.push({
      title: 'Verbas rescisórias',
      lines: [
        line('Saldo de salário proporcional', formatBRL(v.saldoSalario)),
        line('13º salário proporcional', formatBRL(v.decimoTerceiro)),
        line('Férias vencidas e proporcionais', formatBRL(v.feriasProp)),
        line('1/3 constitucional de férias', formatBRL(v.feriasUmTerco)),
        line('Aviso prévio indenizado', formatBRL(v.avisoPrevio ?? result.avisoPrevioValor ?? 0)),
        line('Total verbas líquidas diretas', formatBRL(v.totalLiquido)),
      ],
    });
    sections.push({
      title: 'FGTS e total geral',
      lines: [
        line('FGTS acumulado estimado', formatBRL(f.acumulado as number)),
        line('Multa rescisória FGTS', f.multa ? `+${formatBRL(f.multa as number)}` : '—'),
        line('FGTS sacável total', formatBRL(f.sacavel as number)),
        line('FGTS liberado para saque', f.liberado ? 'Sim' : 'Não (retido pelo motivo)'),
        line('Total geral estimado', formatBRL(result.totalGeral ?? 0)),
      ],
    });

    tables.push({
      title: 'Demonstrativo de verbas (detalhado)',
      headers: ['Verba', 'Base de cálculo', 'Valor'],
      rows: [
        ['Saldo de salário proporcional', `${result.diasTrab ?? 0} dias no mês`, formatBRL(v.saldoSalario)],
        ['13º salário proporcional', `${(result.mesesTrabalhadosVal ?? 0) % 12} avos`, formatBRL(v.decimoTerceiro)],
        ['Férias vencidas e proporcionais', `${(result.mesesTrabalhadosVal ?? 0) % 12} avos`, formatBRL(v.feriasProp)],
        ['1/3 adicional de férias', '33,3%', formatBRL(v.feriasUmTerco)],
        ['Total verbas diretas', '—', formatBRL(v.totalLiquido)],
        ['FGTS acumulado', `${result.mesesTrabalhadosVal ?? 0} meses`, formatBRL(f.acumulado as number)],
        ...(f.multa && (f.multa as number) > 0
          ? [['Multa FGTS', MOTIVO_LABELS[result.motivo as RescisaoMotivo] ?? '', `+${formatBRL(f.multa as number)}`]]
          : []),
        ['FGTS sacável', '—', formatBRL(f.sacavel as number)],
        ['Total geral', '—', formatBRL(result.totalGeral ?? 0)],
      ],
    });
  }

  const slug = form.activeTool === 'juros' ? 'juros-compostos' : form.activeTool;
  return {
    titulo: form.toolTitle,
    subtitulo: form.isAdvanced ? 'Modo completo / personalizado' : 'Modo rápido',
    dataGeracao: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    sections,
    tables: tables.length ? tables : undefined,
    observacao:
      'Simulação educativa gerada em calculojuroscompostos.com.br. Valores são estimativas e não substituem orientação profissional, contábil ou jurídica.',
    nomeArquivo: `calculo-${slug}-${Date.now()}.pdf`,
  };
}

export function buildConversorPdfPayload(state: ConversorPdfState): PdfExportPayload {
  const sections: PdfSection[] = [
    {
      title: 'Dados da conversão',
      lines: [
        line('Valor informado', `${state.value.toLocaleString('pt-BR')} ${state.from}`),
        line('Moeda de origem', state.from),
        line('Moeda de destino', state.to),
        ...(state.isAdvanced && state.quoteType ? [line('Tipo de cotação', state.quoteType)] : []),
        ...(state.rate != null ? [line('Cotação utilizada', state.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 }))] : []),
        ...(state.lastUpdated ? [line('Cotações atualizadas em', state.lastUpdated)] : []),
      ],
    },
    {
      title: 'Resultado',
      lines: [
        line('Valor convertido', `${state.result.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ${state.to}`),
        line('Operação', `${state.value.toLocaleString('pt-BR')} ${state.from} → ${state.to}`),
      ],
    },
  ];

  return {
    titulo: state.toolTitle,
    subtitulo: state.isAdvanced ? 'Cotação personalizada' : 'Cotação comercial',
    dataGeracao: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    sections,
    observacao:
      'Cotações indicativas geradas em calculojuroscompostos.com.br. Não constitui oferta de câmbio ou recomendação de investimento.',
    nomeArquivo: `conversor-${state.from}-${state.to}-${Date.now()}.pdf`,
  };
}
