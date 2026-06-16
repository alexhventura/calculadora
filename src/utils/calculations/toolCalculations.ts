import { RegistroMensal, ResultadosTotais, TempoUnidade } from '../../types';
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
  rescisaoSalarioNum: number;
  rescisaoMesesTrabalhados: number;
  rescisaoMotivo: RescisaoMotivo;
  rescisaoDiasTrabalhados: number;
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
    rescisaoSalarioNum,
    rescisaoMesesTrabalhados,
    rescisaoMotivo,
    rescisaoDiasTrabalhados,
  } = input;

  if (activeTool === 'juros') {
    const compostosRes = calcularJurosCompostos(
      valorInicialNum,
      aporteMensalNum,
      tempo,
      tempoUnidade,
      taxaAnual,
      taxaPeriodo,
      selicRate,
      ipcaRate,
    );
    return {
      tool: 'juros',
      registros: compostosRes.registros,
      totais: compostosRes.totais,
      painelTopCards: [
        {
          titulo: 'Montante Bruto Final',
          valor: compostosRes.totais.valorBrutoUser,
          subtitulo: `Crescimento de ${((compostosRes.totais.valorBrutoUser / Math.max(1, compostosRes.totais.totalInvestidoUser) - 1) * 100).toFixed(1)}%`,
          isHighlight: true,
          iconType: 'percent',
        },
        {
          titulo: 'Total Investido',
          valor: compostosRes.totais.totalInvestidoUser,
          subtitulo: `Aporte Inicial: ${formatBRL(valorInicialNum)}`,
          isHighlight: false,
          iconType: 'investido',
        },
        {
          titulo: 'Total em Juros',
          valor: compostosRes.totais.totalJurosUser,
          subtitulo: `${compostosRes.totais.valorBrutoUser > 0 ? ((compostosRes.totais.totalJurosUser / compostosRes.totais.valorBrutoUser) * 100).toFixed(0) : 0}% de lucro`,
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
    const inssClt = calcularInssProgressivo(salarioCltNum);
    const irrfClt = calcularIrrfProgressivo(Math.max(0, salarioCltNum - inssClt));
    const cltLiquidoMensal = Math.max(0, salarioCltNum - inssClt - irrfClt);
    const custoBeneficiosMensal = cltVrNum + cltSaudeNum + cltOutrosNum;
    const cltLiquidoAnualReal =
      cltLiquidoMensal * 13.33 +
      salarioCltNum * 0.08 * 12 +
      cltVrNum * 12 +
      cltSaudeNum * 12 +
      cltOutrosNum * 12;
    const cltReceitaRealMensalEquiv = cltLiquidoAnualReal / 12;
    const pjFaturamentoMinimo = (cltReceitaRealMensalEquiv + 200) / (1 - 0.06);
    const dasPj = pjFaturamentoMinimo * 0.06;
    const pjLiquidoMensalCalculado = pjFaturamentoMinimo - dasPj - 200;
    const pjLiquidoAnualCalculado = pjLiquidoMensalCalculado * 12;

    return {
      tool: 'clt-pj',
      clt: {
        salarioBruto: salarioCltNum,
        inss: inssClt,
        irrf: irrfClt,
        mensalLiquido: cltLiquidoMensal,
        beneficiosMensais: custoBeneficiosMensal,
        fgtsAnual: salarioCltNum * 0.08 * 12,
        anualLiquidoReal: cltLiquidoAnualReal,
        receitaMensalEquiv: cltReceitaRealMensalEquiv,
      },
      pj: {
        minimoFaturamento: pjFaturamentoMinimo,
        mensalLiquido: pjLiquidoMensalCalculado,
        anualLiquido: pjLiquidoAnualCalculado,
        das: dasPj,
        contador: 200,
        totalCustos: dasPj + 200,
      },
      vantagemMensal: pjFaturamentoMinimo - salarioCltNum,
      vantagemAnual: pjLiquidoAnualCalculado - cltLiquidoMensal * 12,
      melhorCenario: 'PJ',
      vantagemPercentual:
        cltLiquidoMensal > 0 ? ((pjFaturamentoMinimo - salarioCltNum) / salarioCltNum) * 100 : 0,
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
          titulo: 'Conversão PJ Indicada',
          valor: pjFaturamentoMinimo,
          subtitulo: 'Faturamento PJ Mínimo Equivalente',
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
    const anosAcumulo = Math.max(1, aposentadoriaIdadeAlvo - aposentadoriaIdadeAtual);
    const mesesAcumulo = anosAcumulo * 12;
    const coberturaINSS = Math.min(aposentadoriaRendaDesejadaNum, 7786.02);
    const lacunaRenda = Math.max(0, aposentadoriaRendaDesejadaNum - 7786.02);
    const patrimonioNecessario = lacunaRenda / 0.0035;
    const taxaRealAnual = Math.max(0.001, (selicRate - ipcaRate) / 100);
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
          titulo: 'Cobertura Estimada INSS',
          valor: coberturaINSS,
          subtitulo: `Lacuna a cobrir: ${formatBRL(lacunaRenda)}/mês`,
          isHighlight: false,
          iconType: 'clt',
        },
        {
          titulo: 'Patrimônio Privado',
          valor: patrimonioNecessario,
          subtitulo: 'Montante de acúmulo complementar',
          isHighlight: true,
          iconType: 'patrimonio',
        },
        {
          titulo: 'Aporte Mensal Previsto',
          valor: aporteMensalNecessario,
          subtitulo: `Tempo de acúmulo: ${anosAcumulo} anos`,
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

  const baseSalario = rescisaoSalarioNum;
  const mesesTrabalhadosVal = rescisaoMesesTrabalhados;
  const motivo = rescisaoMotivo;
  const diasTrab = rescisaoDiasTrabalhados;
  const saldoSalario = (baseSalario / 30) * Math.min(30, Math.max(0, diasTrab));
  const avos13 = mesesTrabalhadosVal % 12;
  const decimoTerceiroProp = (baseSalario / 12) * avos13;
  const feriasProporcionais = (baseSalario / 12) * avos13;
  const feriasUmTerco = feriasProporcionais * (1 / 3);
  const totalFerias = feriasProporcionais + feriasUmTerco;
  const fgtsAcumuladoVal = baseSalario * 0.08 * mesesTrabalhadosVal;
  let multaFgtsVal = 0;
  let fgtsLiberado = false;

  if (motivo === 'sem_justa') {
    multaFgtsVal = fgtsAcumuladoVal * 0.4;
    fgtsLiberado = true;
  }

  const totalVerbasLiquidas = saldoSalario + decimoTerceiroProp + totalFerias;
  const totalFGTSSacavel = fgtsLiberado ? fgtsAcumuladoVal + multaFgtsVal : 0;
  const totalRescisaoGeral = totalVerbasLiquidas + totalFGTSSacavel;

  return {
    tool: 'rescisao',
    baseSalario,
    mesesTrabalhadosVal,
    motivo,
    diasTrab,
    verbas: {
      saldoSalario,
      decimoTerceiro: decimoTerceiroProp,
      feriasProp: feriasProporcionais,
      feriasUmTerco,
      totalFerias,
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
        titulo: 'Verbas a Receber',
        valor: totalVerbasLiquidas,
        subtitulo: 'Saldo + 13º + Férias inclusive 1/3',
        isHighlight: true,
        iconType: 'rescisao-total',
      },
      {
        titulo: 'Saque FGTS + Multa',
        valor: fgtsLiberado ? totalFGTSSacavel : 0,
        subtitulo: fgtsLiberado ? 'FGTS liberado com multa 40%' : 'Retido (Pedido de Demissão)',
        isHighlight: false,
        iconType: 'fgts',
      },
      {
        titulo: 'Total da Rescisão',
        valor: totalRescisaoGeral,
        subtitulo: 'Investimento total de direitos',
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
