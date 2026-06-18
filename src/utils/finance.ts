import { MAX_SIMULATION_MONTHS } from '../constants/limits';
import { RegistroMensal, ResultadosTotais, TempoUnidade, MoedaTipo } from '../types';
import type { AporteFrequencia, JurosAdvancedOptions } from '../types/calculator';
import { DEFAULT_JUROS_ADVANCED } from '../types/calculator';
import { calcularIrCustom, calcularIrRegressivo } from './calculations/investmentTax';

function aporteNoMes(aporteBase: number, freq: AporteFrequencia, mesIndex: number): number {
  switch (freq) {
    case 'quinzenal':
      return aporteBase * 2;
    case 'semanal':
      return aporteBase * (52 / 12);
    case 'anual':
      return mesIndex > 0 && mesIndex % 12 === 0 ? aporteBase : 0;
    default:
      return aporteBase;
  }
}

function taxaMensalFromInput(
  taxaValor: number,
  taxaPeriodo: 'anual' | 'mensal',
  periodoExtendido?: JurosAdvancedOptions['taxaPeriodoExtendido'],
): number {
  const periodo = periodoExtendido === 'diaria' ? 'diaria' : taxaPeriodo;
  if (periodo === 'diaria') {
    return Math.pow(1 + taxaValor / 100, 30) - 1;
  }
  if (periodo === 'mensal') {
    return taxaValor / 100;
  }
  return Math.pow(1 + taxaValor / 100, 1 / 12) - 1;
}

function taxaLiquidaMensal(iMes: number, opts: JurosAdvancedOptions): number {
  const custoAnual = opts.taxaAdminAnual + opts.taxaPerformanceAnual + opts.taxaCustodiaAnual;
  if (custoAnual <= 0) return iMes;
  const iCustoMes = Math.pow(1 + custoAnual / 100, 1 / 12) - 1;
  return Math.max(0, iMes - iCustoMes);
}

// Taxas e cotações de referência estáveis para o cenário de 2026 (fallbacks)
export const FALLBACK_SELIC = 14.50;  // % a.a
export const FALLBACK_CDI = 14.40;    // % a.a (normalmente Selic - 0.10%)
export const FALLBACK_IPCA = 4.25;    // % a.a (inflação aproximada)

// Cotações base estáveis em BRL para todas as moedas
export const FALLBACK_COTAS: Record<MoedaTipo, number> = {
  BRL: 1.0,
  USD: 5.15,
  EUR: 5.55,
  GBP: 6.50,
  JPY: 0.033,
  CAD: 3.75,
  AUD: 3.40,
  CHF: 5.65,
  ARS: 0.006,
  BTC: 340000.00,
  ETH: 18000.00
};

// Calcula a taxa da poupança com base nas regras do Banco Central do Brasil
export function calcularTaxaPoupancaVal(selicAnual: number): number {
  if (selicAnual > 8.5) {
    // Rendimento de 0.5% ao mês + TR. Estimado historicamente em ~8.33% a.a. com TR inclusa em patamares normais
    return 8.33; 
  } else {
    // 70% da Selic + TR
    return (0.7 * selicAnual);
  }
}

export function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  tempo: number,
  tempoUnidade: TempoUnidade,
  taxaAnual: number,
  taxaPeriodo: 'anual' | 'mensal' = 'anual',
  taxaSelicRef: number = FALLBACK_SELIC,
  taxaIpcaRef: number = FALLBACK_IPCA,
  jurosAdvanced: JurosAdvancedOptions = DEFAULT_JUROS_ADVANCED,
): { registros: RegistroMensal[]; totais: ResultadosTotais } {
  // Garantir higienização contra NaN e valores negativos durante a digitação
  const valInicialClean = isNaN(valorInicial) || valorInicial < 0 ? 0 : valorInicial;
  const aporteMensalClean = isNaN(aporteMensal) || aporteMensal < 0 ? 0 : aporteMensal;
  const tempoCleanRaw = isNaN(tempo) || tempo < 0 ? 0 : tempo;
  const taxaAnualClean = isNaN(taxaAnual) || taxaAnual < 0 ? 0 : taxaAnual;

  const totalMesesRaw = tempoUnidade === 'anos' ? Math.round(tempoCleanRaw * 12) : Math.round(tempoCleanRaw);
  const totalMeses = Math.min(MAX_SIMULATION_MONTHS, totalMesesRaw);
  
  const iMesUserRaw = taxaMensalFromInput(
    taxaAnualClean,
    taxaPeriodo,
    jurosAdvanced.taxaPeriodoExtendido,
  );
  const iMesUser = taxaLiquidaMensal(iMesUserRaw, jurosAdvanced);
  const iAnoUser = Math.pow(1 + iMesUser, 12) - 1;
  
  // Taxa da Poupança baseada na Selic carregada
  const taxaPoupAnual = calcularTaxaPoupancaVal(taxaSelicRef);
  const iAnoPoupanca = taxaPoupAnual / 100;
  const iMesPoupanca = Math.pow(1 + iAnoPoupanca, 1 / 12) - 1;
  
  // Taxa da Selic Ref
  const iAnoSelic = taxaSelicRef / 100;
  const iMesSelic = Math.pow(1 + iAnoSelic, 1 / 12) - 1;

  // Taxa do CDI (Selic - 0.10%)
  const taxaCdiRef = Math.max(0, taxaSelicRef - 0.10);
  const iAnoCDI = taxaCdiRef / 100;
  const iMesCDI = Math.pow(1 + iAnoCDI, 1 / 12) - 1;

  const ipcaAnualRef =
    jurosAdvanced.inflacaoModo === 'ipca_manual'
      ? jurosAdvanced.inflacaoManual
      : jurosAdvanced.inflacaoModo === 'none'
        ? 0
        : taxaIpcaRef;
  const iAnoIPCA = ipcaAnualRef / 100;
  const iMesIPCA = ipcaAnualRef > 0 ? Math.pow(1 + iAnoIPCA, 1 / 12) - 1 : 0;

  const registros: RegistroMensal[] = [];
  
  // Mês zero (Estado Inicial)
  registros.push({
    mesIndex: 0,
    label: 'Início',
    tempoExibicao: 'Início',
    totalInvestido: valInicialClean,
    saldoUser: valInicialClean,
    jurosAcumuladoUser: 0,
    jurosDoMesUser: 0,
    
    saldoPoupanca: valInicialClean,
    jurosAcumuladoPoupanca: 0,
    jurosDoMesPoupanca: 0,
    
    saldoSelic: valInicialClean,
    jurosAcumuladoSelic: 0,
    jurosDoMesSelic: 0,

    saldoCDI: valInicialClean,
    jurosAcumuladoCDI: 0,
    jurosDoMesCDI: 0,
  });

  let totalInvestidoAcumulado = valInicialClean;
  let saldoUserVal = valInicialClean;
  let jurosAcumUserVal = 0;
  
  let saldoPoupancaVal = valInicialClean;
  let jurosAcumPoupancaVal = 0;
  
  let saldoSelicVal = valInicialClean;
  let jurosAcumSelicVal = 0;

  let saldoCDIVal = valInicialClean;
  let jurosAcumCDIVal = 0;

  for (let m = 1; m <= totalMeses; m++) {
    // 1. Simulação Usuário
    const jurosMesUser = saldoUserVal * iMesUser;
    const aporteMes = aporteNoMes(aporteMensalClean, jurosAdvanced.aporteFrequencia, m);
    saldoUserVal = saldoUserVal + jurosMesUser + aporteMes;
    jurosAcumUserVal += jurosMesUser;

    // 2. Simulação Poupança
    const jurosMesPoupanca = saldoPoupancaVal * iMesPoupanca;
    saldoPoupancaVal = saldoPoupancaVal + jurosMesPoupanca + aporteMes;
    jurosAcumPoupancaVal += jurosMesPoupanca;

    // 3. Simulação Selic
    const jurosMesSelic = saldoSelicVal * iMesSelic;
    saldoSelicVal = saldoSelicVal + jurosMesSelic + aporteMes;
    jurosAcumSelicVal += jurosMesSelic;

    // 4. Simulação CDI
    const jurosMesCDI = saldoCDIVal * iMesCDI;
    saldoCDIVal = saldoCDIVal + jurosMesCDI + aporteMes;
    jurosAcumCDIVal += jurosMesCDI;

    totalInvestidoAcumulado += aporteMes;

    const anoAtual = Math.floor(m / 12);
    const mesResidual = m % 12;
    let tempoExibicaoStr = '';
    
    if (anoAtual > 0) {
      tempoExibicaoStr = `${anoAtual}a ${mesResidual}m`;
    } else {
      tempoExibicaoStr = `${mesResidual}m`;
    }

    const labelStr = m % 12 === 0 ? `Ano ${m / 12}` : `Mês ${m}`;

    registros.push({
      mesIndex: m,
      label: labelStr,
      tempoExibicao: tempoExibicaoStr,
      totalInvestido: totalInvestidoAcumulado,
      saldoUser: saldoUserVal,
      jurosDoMesUser: jurosMesUser,
      jurosAcumuladoUser: jurosAcumUserVal,
      
      saldoPoupanca: saldoPoupancaVal,
      jurosDoMesPoupanca: jurosMesPoupanca,
      jurosAcumuladoPoupanca: jurosAcumPoupancaVal,
      
      saldoSelic: saldoSelicVal,
      jurosDoMesSelic: jurosMesSelic,
      jurosAcumuladoSelic: jurosAcumSelicVal,

      saldoCDI: saldoCDIVal,
      jurosDoMesCDI: jurosMesCDI,
      jurosAcumuladoCDI: jurosAcumCDIVal,
    });
  }

  let saldoUserFinal = saldoUserVal;
  const ganhoLiquido = Math.max(0, saldoUserFinal - totalInvestidoAcumulado);
  if (jurosAdvanced.tributacao === 'ir_regressivo' && ganhoLiquido > 0) {
    saldoUserFinal -= calcularIrRegressivo(totalMeses * 30, ganhoLiquido);
  } else if (jurosAdvanced.tributacao === 'ir_custom' && ganhoLiquido > 0) {
    saldoUserFinal -= calcularIrCustom(ganhoLiquido, jurosAdvanced.irCustomPercent);
  }

  const inflacaoAcumuladaDivisor =
    jurosAdvanced.inflacaoModo === 'none' || iMesIPCA <= 0
      ? 1
      : Math.pow(1 + iMesIPCA, totalMeses);
  const poderCompraReal =
    totalMeses > 0 ? saldoUserFinal / inflacaoAcumuladaDivisor : saldoUserFinal;
  const desvalorizacaoInflacao = Math.max(0, saldoUserFinal - poderCompraReal);

  const totais: ResultadosTotais = {
    valorBrutoUser: saldoUserFinal,
    totalInvestidoUser: totalInvestidoAcumulado,
    totalJurosUser: Math.max(0, saldoUserFinal - totalInvestidoAcumulado),
    
    valorBrutoPoupanca: saldoPoupancaVal,
    totalJurosPoupanca: jurosAcumPoupancaVal,
    
    valorBrutoSelic: saldoSelicVal,
    totalJurosSelic: jurosAcumSelicVal,

    valorBrutoCDI: saldoCDIVal,
    totalJurosCDI: jurosAcumCDIVal,
    
    ganhoAdicionalPoupanca: saldoUserVal - saldoPoupancaVal,
    ganhoAdicionalSelic: saldoUserVal - saldoSelicVal,
    ganhoAdicionalCDI: saldoUserVal - saldoCDIVal,

    poderCompraReal: poderCompraReal,
    desvalorizacaoInflacao: desvalorizacaoInflacao
  };

  return { registros, totais };
}

// Lógica de matriz bidirecional utilizando BRL como master base (moeda lastro)
export function converterMatrizMoedas(
  valor: number,
  deMoeda: string,
  paraMoeda: string,
  cotacoesCustomBRL: Record<string, number> = FALLBACK_COTAS as Record<string, number>
): number {
  if (valor <= 0 || isNaN(valor)) return 0;
  if (deMoeda === paraMoeda) return valor;

  const taxaDeParaBRL = cotacoesCustomBRL[deMoeda] ?? 1.0;
  const taxaParaParaBRL = cotacoesCustomBRL[paraMoeda] ?? 1.0;

  // Transforma de 'De' para BRL
  const valorEmBRL = valor * taxaDeParaBRL;
  
  // Transforma de BRL para 'Para'
  const valorConvertido = valorEmBRL / taxaParaParaBRL;
  
  return isNaN(valorConvertido) ? 0 : valorConvertido;
}

export function convertAnualParaMensal(tAnual: number): number {
  return (Math.pow(1 + tAnual / 100, 1 / 12) - 1) * 100;
}

export function convertMensalParaAnual(tMensal: number): number {
  return (Math.pow(1 + tMensal / 100, 12) - 1) * 100;
}

