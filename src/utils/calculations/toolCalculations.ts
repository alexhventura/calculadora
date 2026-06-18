import { RegistroMensal, ResultadosTotais, TempoUnidade } from '../../types';
import {
  DEFAULT_ADVANCED_OPTIONS,
  DEFAULT_JUROS_ADVANCED,
  type AdvancedCalculatorOptions,
} from '../../types/calculator';
import { FISCAL_CONFIG } from '../../config/fiscal';
import { calcularJurosCompostos } from '../finance';
import { formatBRL } from '../format';
import { calcularInssProgressivo, calcularIrrfProgressivo } from './tax';

export type ActiveTool = 'juros' | 'clt-pj' | 'aposentadoria' | 'rescisao';
export type RescisaoMotivo = 'sem_justa' | 'com_justa' | 'pedido_demissao' | 'acordo';

export interface PainelTopCard {
  titulo: string;
  valor: number;
  subtitulo: string;
  isHighlight: boolean;
  iconType: string;
}

export interface ToolCalculationResult {
  tool: ActiveTool;
  registros: RegistroMensal[];
  totais: ResultadosTotais;
  painelTopCards: PainelTopCard[];
  extraInfo: {
    poderCompra: number;
    corrosao: number;
    corrosaoPercent: string | number;
  };
  comparativos: {
    poupanca: number;
    selic: number;
  };
  clt?: Record<string, number>;
  pj?: Record<string, number>;
  vantagemMensal?: number;
  vantagemAnual?: number;
  melhorCenario?: string;
  vantagemPercentual?: number;
  anosAcumulo?: number;
  mesesAcumulo?: number;
  coberturaINSS?: number;
  lacunaRenda?: number;
  patrimonioNecessario?: number;
  aporteMensalNecessario?: number;
  jurosTotais?: number;
  totalInvestido?: number;
  patrimonioAtual?: number;
  patrimonioAtualFuturo?: number;
  baseSalario?: number;
  mesesTrabalhadosVal?: number;
  motivo?: RescisaoMotivo;
  diasTrab?: number;
  verbas?: Record<string, number>;
  fgts?: Record<string, number | boolean>;
  totalGeral?: number;
  avisoPrevioValor?: number;
}

export interface ToolCalculationInput {
  activeTool: ActiveTool;
  valorInicialNum: number;
  aporteMensalNum: number;
  tempo: number;
  tempoUnidade: TempoUnidade;
  taxaAnual: number;
  taxaPeriodo: 'anual' | 'mensal';
  selicRate: number;
  ipcaRate: number;
  salarioCltNum: number;
  cltVrNum: number;
  cltSaudeNum: number;
  cltOutrosNum: number;
  aposentadoriaIdadeAtual: number;
  aposentadoriaIdadeAlvo: number;
  aposentadoriaRendaDesejadaNum: number;
  aposentadoriaPatrimonioAtualNum: number;
  aposentadoriaSalarioAtualNum: number;
  rescisaoSalarioNum: number;
  rescisaoMesesTrabalhados: number;
  rescisaoMotivo: RescisaoMotivo;
  rescisaoDiasTrabalhados: number;
  advancedMode?: boolean;
  advanced?: AdvancedCalculatorOptions;
}

function resolveJurosAdvanced(input: ToolCalculationInput) {
  if (!input.advancedMode) return DEFAULT_JUROS_ADVANCED;
  return input.advanced?.juros ?? DEFAULT_JUROS_ADVANCED;
}

function resolveCltPjAdvanced(input: ToolCalculationInput) {
  if (!input.advancedMode) return DEFAULT_ADVANCED_OPTIONS.cltPj;
  return input.advanced?.cltPj ?? DEFAULT_ADVANCED_OPTIONS.cltPj;
}

function resolveAposAdvanced(input: ToolCalculationInput) {
  if (!input.advancedMode) return DEFAULT_ADVANCED_OPTIONS.aposentadoria;
  return input.advanced?.aposentadoria ?? DEFAULT_ADVANCED_OPTIONS.aposentadoria;
}

function resolveRescisaoAdvanced(input: ToolCalculationInput) {
  if (!input.advancedMode) return DEFAULT_ADVANCED_OPTIONS.rescisao;
  return input.advanced?.rescisao ?? DEFAULT_ADVANCED_OPTIONS.rescisao;
}

function calcularAliquotaPj(regime: string): number {
  switch (regime) {
    case 'mei':
      return 0;
    case 'lucro_presumido':
      return FISCAL_CONFIG.simples.lucroPresumido;
    default:
      return FISCAL_CONFIG.simples.anexoIIIInicial;
  }
}

function calcularCoberturaPrevidenciaria(
  rendaReferencia: number,
  tipoBeneficio: string,
): number {
  const teto = FISCAL_CONFIG.previdencia.tetoBeneficio;
  switch (tipoBeneficio) {
    case 'previdencia_privada':
    case 'independente':
      return 0;
    case 'servidor':
      return Math.min(rendaReferencia * 0.7, teto * 1.2);
    default:
      return Math.min(
        rendaReferencia * FISCAL_CONFIG.previdencia.substituicaoInssEstimada,
        teto,
      );
  }
}

function calcularTaxaRealAnual(
  cenario: string,
  taxaPersonalizada: number,
  selicRate: number,
  ipcaRate: number,
): number {
  if (cenario === 'personalizado') return Math.max(0.001, taxaPersonalizada / 100);
  const map = FISCAL_CONFIG.cenariosRendimento;
  if (cenario in map) return map[cenario as keyof typeof map];
  return Math.max(0.001, (selicRate - ipcaRate) / 100);
}

export function calculateToolResult(input: ToolCalculationInput): ToolCalculationResult {
  const {
    activeTool,
    valorInicialNum,
    aporteMensalNum,
    tempo,
    tempoUnidade,
    taxaAnual,
    taxaPeriodo,
    selicRate,
    ipcaRate,
    salarioCltNum,
    cltVrNum,
    cltSaudeNum,
    cltOutrosNum,
    aposentadoriaIdadeAtual,
    aposentadoriaIdadeAlvo,
    aposentadoriaRendaDesejadaNum,
    aposentadoriaPatrimonioAtualNum,
    aposentadoriaSalarioAtualNum,
    rescisaoSalarioNum,
    rescisaoMesesTrabalhados,
    rescisaoMotivo,
    rescisaoDiasTrabalhados,
  } = input;

  if (activeTool === 'juros') {
    const jurosAdv = resolveJurosAdvanced(input);
    const compostosRes = calcularJurosCompostos(
      valorInicialNum,
      aporteMensalNum,
      tempo,
      tempoUnidade,
      taxaAnual,
      taxaPeriodo,
      selicRate,
      ipcaRate,
      jurosAdv,
    );
    return {
      tool: 'juros',
      registros: compostosRes.registros,
      totais: compostosRes.totais,
      painelTopCards: [
        {
          titulo: 'Valor acumulado',
          valor: compostosRes.totais.valorBrutoUser,
          subtitulo: `Crescimento de ${((compostosRes.totais.valorBrutoUser / Math.max(1, compostosRes.totais.totalInvestidoUser) - 1) * 100).toFixed(1)}%`,
          isHighlight: true,
          iconType: 'percent',
        },
        {
          titulo: 'Total que você investiu',
          valor: compostosRes.totais.totalInvestidoUser,
          subtitulo: `Inclui aporte inicial de ${formatBRL(valorInicialNum)}`,
          isHighlight: false,
          iconType: 'investido',
        },
        {
          titulo: 'Ganho com juros',
          valor: compostosRes.totais.totalJurosUser,
          subtitulo: `${compostosRes.totais.valorBrutoUser > 0 ? ((compostosRes.totais.totalJurosUser / compostosRes.totais.valorBrutoUser) * 100).toFixed(0) : 0}% do total`,
          isHighlight: false,
          iconType: 'juros',
        },
      ],
      extraInfo: {
        poderCompra: compostosRes.totais.poderCompraReal,
        corrosao: compostosRes.totais.desvalorizacaoInflacao,
        corrosaoPercent:
          compostosRes.totais.valorBrutoUser > 0
            ? ((compostosRes.totais.desvalorizacaoInflacao / compostosRes.totais.valorBrutoUser) * 100).toFixed(0)
            : 0,
      },
      comparativos: {
        poupanca: compostosRes.totais.ganhoAdicionalPoupanca,
        selic: compostosRes.totais.ganhoAdicionalSelic,
      },
    };
  }

  if (activeTool === 'clt-pj') {
    const cltAdv = resolveCltPjAdvanced(input);
    const inssClt = calcularInssProgressivo(salarioCltNum);
    const irrfClt = calcularIrrfProgressivo(Math.max(0, salarioCltNum - inssClt));
    const cltLiquidoMensal = Math.max(0, salarioCltNum - inssClt - irrfClt);
    const custoBeneficiosMensal = cltVrNum + cltSaudeNum + cltOutrosNum;
    const fgtsMensal = cltAdv.incluirFgtsComparativo ? salarioCltNum * 0.08 : 0;
    const cltLiquidoAnualReal =
      cltLiquidoMensal * 13.33 +
      fgtsMensal * 12 +
      cltVrNum * 12 +
      cltSaudeNum * 12 +
      cltOutrosNum * 12;
    const cltReceitaRealMensalEquiv = cltLiquidoAnualReal / 12;

    const aliquotaPj = calcularAliquotaPj(cltAdv.regimePj);
    const contador = cltAdv.contadorMensal;
    let pjFaturamentoMinimo: number;
    let dasPj: number;

    if (cltAdv.regimePj === 'mei') {
      dasPj = FISCAL_CONFIG.simples.meiDasMensal;
      pjFaturamentoMinimo = cltReceitaRealMensalEquiv + dasPj + contador;
    } else {
      pjFaturamentoMinimo = (cltReceitaRealMensalEquiv + contador) / (1 - aliquotaPj);
      dasPj = pjFaturamentoMinimo * aliquotaPj;
    }

    const pjLiquidoMensalCalculado = pjFaturamentoMinimo - dasPj - contador;
    const pjLiquidoAnualCalculado = pjLiquidoMensalCalculado * 12;

    const faturamentoComparado = cltAdv.faturamentoPjManual ?? pjFaturamentoMinimo;
    const dasComparado =
      cltAdv.regimePj === 'mei'
        ? FISCAL_CONFIG.simples.meiDasMensal
        : faturamentoComparado * aliquotaPj;
    const pjLiquidoProposta = faturamentoComparado - dasComparado - contador;
    const melhorCenario = pjLiquidoProposta >= cltReceitaRealMensalEquiv ? 'PJ' : 'CLT';

    return {
      tool: 'clt-pj',
      clt: {
        salarioBruto: salarioCltNum,
        inss: inssClt,
        irrf: irrfClt,
        mensalLiquido: cltLiquidoMensal,
        beneficiosMensais: custoBeneficiosMensal,
        fgtsAnual: fgtsMensal * 12,
        anualLiquidoReal: cltLiquidoAnualReal,
        receitaMensalEquiv: cltReceitaRealMensalEquiv,
      },
      pj: {
        minimoFaturamento: pjFaturamentoMinimo,
        mensalLiquido: pjLiquidoMensalCalculado,
        anualLiquido: pjLiquidoAnualCalculado,
        das: dasPj,
        contador,
        totalCustos: dasPj + contador,
        faturamentoProposta: faturamentoComparado,
        liquidoProposta: pjLiquidoProposta,
      },
      vantagemMensal: faturamentoComparado - salarioCltNum,
      vantagemAnual: pjLiquidoAnualCalculado - cltLiquidoMensal * 12,
      melhorCenario,
      vantagemPercentual:
        cltLiquidoMensal > 0 ? ((faturamentoComparado - salarioCltNum) / salarioCltNum) * 100 : 0,
      registros: [],
      totais: {
        valorBrutoUser: pjFaturamentoMinimo,
        totalInvestidoUser: cltLiquidoMensal,
        totalJurosUser: custoBeneficiosMensal,
        valorBrutoPoupanca: 0,
        totalJurosPoupanca: 0,
        valorBrutoSelic: 0,
        totalJurosSelic: 0,
        valorBrutoCDI: 0,
        totalJurosCDI: 0,
        poderCompraReal: cltReceitaRealMensalEquiv,
        desvalorizacaoInflacao: inssClt + irrfClt,
        ganhoAdicionalPoupanca: pjFaturamentoMinimo - cltReceitaRealMensalEquiv,
        ganhoAdicionalSelic: pjFaturamentoMinimo,
        ganhoAdicionalCDI: 0,
      },
      painelTopCards: [
        {
          titulo: 'Salário Líquido CLT',
          valor: cltLiquidoMensal,
          subtitulo: `Bruto: ${formatBRL(salarioCltNum)}`,
          isHighlight: false,
          iconType: 'clt',
        },
        {
          titulo: cltAdv.faturamentoPjManual ? 'Faturamento PJ Informado' : 'Conversão PJ Indicada',
          valor: faturamentoComparado,
          subtitulo: cltAdv.faturamentoPjManual ? 'Proposta comparada' : 'Faturamento PJ Mínimo Equivalente',
          isHighlight: true,
          iconType: 'pj',
        },
        {
          titulo: 'Custo Benefícios CLT',
          valor: custoBeneficiosMensal,
          subtitulo: `Soma que o PJ terá de pagar: ${formatBRL(custoBeneficiosMensal)}`,
          isHighlight: false,
          iconType: 'vantagem',
        },
      ],
      extraInfo: {
        poderCompra: cltReceitaRealMensalEquiv,
        corrosao: inssClt + irrfClt,
        corrosaoPercent:
          salarioCltNum > 0 ? (((inssClt + irrfClt) / salarioCltNum) * 100).toFixed(0) : 0,
      },
      comparativos: {
        poupanca: cltLiquidoAnualReal,
        selic: pjLiquidoAnualCalculado,
      },
    };
  }

  if (activeTool === 'aposentadoria') {
    const aposAdv = resolveAposAdvanced(input);
    const anosAcumulo = Math.max(1, aposentadoriaIdadeAlvo - aposentadoriaIdadeAtual);
    const mesesAcumulo = anosAcumulo * 12;

    let rendaProjetada = aposentadoriaRendaDesejadaNum;
    if (aposAdv.modoProjecao === 'salario_atual') {
      rendaProjetada = aposentadoriaSalarioAtualNum;
    } else if (aposAdv.modoProjecao === 'salario_medio') {
      rendaProjetada = aposAdv.salarioMedio;
    }

    const coberturaINSS = calcularCoberturaPrevidenciaria(rendaProjetada, aposAdv.tipoBeneficio);
    const lacunaRenda = Math.max(0, rendaProjetada - coberturaINSS);
    const taxaSaque = aposAdv.taxaSaqueMensal / 100;
    const patrimonioNecessario = taxaSaque > 0 ? lacunaRenda / taxaSaque : 0;

    const taxaRealAnual = calcularTaxaRealAnual(
      aposAdv.cenario,
      aposAdv.taxaRealPersonalizada,
      selicRate,
      ipcaRate,
    );
    const taxaRealMensal = Math.pow(1 + taxaRealAnual, 1 / 12) - 1;
    const patrimonioAtualFuturo =
      aposentadoriaPatrimonioAtualNum * Math.pow(1 + taxaRealMensal, mesesAcumulo);
    const deficitPatrimonial = Math.max(0, patrimonioNecessario - patrimonioAtualFuturo);

    let aporteMensalNecessario = 0;
    if (deficitPatrimonial > 0 && taxaRealMensal > 0) {
      aporteMensalNecessario =
        (deficitPatrimonial * taxaRealMensal) / (Math.pow(1 + taxaRealMensal, mesesAcumulo) - 1);
    }

    const totalAportes = aporteMensalNecessario * mesesAcumulo;
    const totalInvestido = aposentadoriaPatrimonioAtualNum + totalAportes;
    const jurosTotais = Math.max(0, patrimonioNecessario - totalInvestido);

    return {
      tool: 'aposentadoria',
      anosAcumulo,
      mesesAcumulo,
      coberturaINSS,
      lacunaRenda,
      patrimonioNecessario,
      aporteMensalNecessario,
      jurosTotais,
      totalInvestido,
      patrimonioAtual: aposentadoriaPatrimonioAtualNum,
      patrimonioAtualFuturo,
      registros: [],
      totais: {
        valorBrutoUser: coberturaINSS,
        totalInvestidoUser: patrimonioNecessario,
        totalJurosUser: aporteMensalNecessario,
        valorBrutoPoupanca: 0,
        totalJurosPoupanca: 0,
        valorBrutoSelic: 0,
        totalJurosSelic: 0,
        valorBrutoCDI: 0,
        totalJurosCDI: 0,
        poderCompraReal: patrimonioNecessario,
        desvalorizacaoInflacao: totalAportes,
        ganhoAdicionalPoupanca: jurosTotais,
        ganhoAdicionalSelic: jurosTotais,
        ganhoAdicionalCDI: 0,
      },
      painelTopCards: [
        {
          titulo: 'Renda do INSS (estimada)',
          valor: coberturaINSS,
          subtitulo: `Falta complementar: ${formatBRL(lacunaRenda)}/mês`,
          isHighlight: false,
          iconType: 'clt',
        },
        {
          titulo: 'Valor necessário guardado',
          valor: patrimonioNecessario,
          subtitulo: 'Para viver da renda desejada',
          isHighlight: true,
          iconType: 'patrimonio',
        },
        {
          titulo: 'Guardar por mês',
          valor: aporteMensalNecessario,
          subtitulo: `Por ${anosAcumulo} anos até aposentar`,
          isHighlight: false,
          iconType: 'juros-aposentadoria',
        },
      ],
      extraInfo: {
        poderCompra: patrimonioNecessario,
        corrosao: totalAportes,
        corrosaoPercent:
          patrimonioNecessario > 0 ? ((totalAportes / patrimonioNecessario) * 100).toFixed(0) : 0,
      },
      comparativos: {
        poupanca: patrimonioNecessario - totalInvestido,
        selic: jurosTotais,
      },
    };
  }

  const rescAdv = resolveRescisaoAdvanced(input);
  const baseSalario = rescisaoSalarioNum;
  const mesesTrabalhadosVal = Math.min(
    Math.max(1, rescisaoMesesTrabalhados),
    FISCAL_CONFIG.rescisao.maxMeses,
  );
  const motivo = rescisaoMotivo;
  const diasTrab = rescisaoDiasTrabalhados;

  let saldoSalario = (baseSalario / 30) * Math.min(30, Math.max(0, diasTrab));
  const avos13 = mesesTrabalhadosVal % 12;
  let decimoTerceiroProp = (baseSalario / 12) * avos13;
  let feriasProporcionais = (baseSalario / 12) * avos13;
  let feriasUmTerco = feriasProporcionais * (1 / 3);

  if (rescAdv.feriasVencidas) {
    feriasProporcionais += baseSalario;
    feriasUmTerco += baseSalario * (1 / 3);
  }

  if (rescAdv.usarVerbasManuais) {
    if (rescAdv.manualSaldoSalario != null) saldoSalario = rescAdv.manualSaldoSalario;
    if (rescAdv.manualDecimoTerceiro != null) decimoTerceiroProp = rescAdv.manualDecimoTerceiro;
    if (rescAdv.manualFerias != null) {
      feriasProporcionais = rescAdv.manualFerias / (4 / 3);
      feriasUmTerco = rescAdv.manualFerias - feriasProporcionais;
    }
  }

  const totalFerias = feriasProporcionais + feriasUmTerco;
  const avisoPrevioValor = rescAdv.avisoPrevioIndenizado
    ? (baseSalario / 30) * Math.min(90, Math.max(0, rescAdv.avisoPrevioDias))
    : 0;

  const fgtsAcumuladoVal = baseSalario * FISCAL_CONFIG.rescisao.fgtsPercentual * mesesTrabalhadosVal;
  let multaFgtsVal = 0;
  let fgtsLiberado = false;

  if (motivo === 'sem_justa' || motivo === 'acordo') {
    const multaRate =
      motivo === 'acordo'
        ? FISCAL_CONFIG.rescisao.multaAcordo
        : FISCAL_CONFIG.rescisao.multaSemJusta;
    multaFgtsVal = fgtsAcumuladoVal * multaRate;
    fgtsLiberado = true;
  }

  const totalVerbasLiquidas =
    saldoSalario + decimoTerceiroProp + totalFerias + avisoPrevioValor;
  const totalFGTSSacavel = fgtsLiberado ? fgtsAcumuladoVal + multaFgtsVal : 0;
  const totalRescisaoGeral = totalVerbasLiquidas + totalFGTSSacavel;

  return {
    tool: 'rescisao',
    baseSalario,
    mesesTrabalhadosVal,
    motivo,
    diasTrab,
    avisoPrevioValor,
    verbas: {
      saldoSalario,
      decimoTerceiro: decimoTerceiroProp,
      feriasProp: feriasProporcionais,
      feriasUmTerco,
      totalFerias,
      avisoPrevio: avisoPrevioValor,
      totalLiquido: totalVerbasLiquidas,
    },
    fgts: {
      acumulado: fgtsAcumuladoVal,
      multa: multaFgtsVal,
      liberado: fgtsLiberado,
      sacavel: totalFGTSSacavel,
    },
    totalGeral: totalRescisaoGeral,
    registros: [],
    totais: {
      valorBrutoUser: totalVerbasLiquidas,
      totalInvestidoUser: totalFGTSSacavel,
      totalJurosUser: totalRescisaoGeral,
      valorBrutoPoupanca: 0,
      totalJurosPoupanca: 0,
      valorBrutoSelic: 0,
      totalJurosSelic: 0,
      valorBrutoCDI: 0,
      totalJurosCDI: 0,
      poderCompraReal: totalRescisaoGeral,
      desvalorizacaoInflacao: fgtsAcumuladoVal * 0.4,
      ganhoAdicionalPoupanca: totalVerbasLiquidas,
      ganhoAdicionalSelic: totalFGTSSacavel,
      ganhoAdicionalCDI: 0,
    },
    painelTopCards: [
      {
        titulo: 'Total a receber (verbas)',
        valor: totalVerbasLiquidas,
        subtitulo: 'Saldo + 13º + férias + aviso (se houver)',
        isHighlight: true,
        iconType: 'rescisao-total',
      },
      {
        titulo: 'Saque FGTS + Multa',
        valor: fgtsLiberado ? totalFGTSSacavel : 0,
        subtitulo: fgtsLiberado
          ? motivo === 'acordo'
            ? 'Multa 20% (acordo trabalhista)'
            : 'FGTS liberado com multa 40%'
          : 'Retido neste motivo',
        isHighlight: false,
        iconType: 'fgts',
      },
      {
        titulo: 'Total da Rescisão',
        valor: totalRescisaoGeral,
        subtitulo: 'Soma de verbas e FGTS sacável',
        isHighlight: false,
        iconType: 'descontos',
      },
    ],
    extraInfo: {
      poderCompra: totalVerbasLiquidas,
      corrosao: fgtsAcumuladoVal,
      corrosaoPercent:
        baseSalario > 0 ? ((fgtsAcumuladoVal / baseSalario) * 100).toFixed(0) : '0',
    },
    comparativos: {
      poupanca: saldoSalario,
      selic: totalFGTSSacavel,
    },
  };
}
