import { RegistroMensal, ResultadosTotais, TempoUnidade, MoedaTipo } from '../types';

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
  taxaIpcaRef: number = FALLBACK_IPCA
): { registros: RegistroMensal[]; totais: ResultadosTotais } {
  // Garantir higienização contra NaN e valores negativos durante a digitação
  const valInicialClean = isNaN(valorInicial) || valorInicial < 0 ? 0 : valorInicial;
  const aporteMensalClean = isNaN(aporteMensal) || aporteMensal < 0 ? 0 : aporteMensal;
  const tempoCleanRaw = isNaN(tempo) || tempo < 0 ? 0 : tempo;
  const tempoClean = Math.min(600, tempoCleanRaw); // Evita loop infinito por tempo absurdo
  const taxaAnualClean = isNaN(taxaAnual) || taxaAnual < 0 ? 0 : taxaAnual;

  const totalMeses = tempoUnidade === 'anos' ? Math.round(tempoClean * 12) : Math.round(tempoClean);
  
  // Taxa do usuário (simulação manual ou outras) de acordo com o período da taxa
  let iMesUser = 0;
  let iAnoUser = 0;

  if (taxaPeriodo === 'anual') {
    iAnoUser = taxaAnualClean / 100;
    iMesUser = Math.pow(1 + iAnoUser, 1 / 12) - 1;
  } else {
    iMesUser = taxaAnualClean / 100;
    iAnoUser = Math.pow(1 + iMesUser, 12) - 1;
  }
  
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

  // Inflação Mensal IPCA para cálculo de poder de compra real
  const iAnoIPCA = taxaIpcaRef / 100;
  const iMesIPCA = Math.pow(1 + iAnoIPCA, 1 / 12) - 1;

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
    saldoUserVal = saldoUserVal + jurosMesUser + aporteMensalClean;
    jurosAcumUserVal += jurosMesUser;

    // 2. Simulação Poupança
    const jurosMesPoupanca = saldoPoupancaVal * iMesPoupanca;
    saldoPoupancaVal = saldoPoupancaVal + jurosMesPoupanca + aporteMensalClean;
    jurosAcumPoupancaVal += jurosMesPoupanca;

    // 3. Simulação Selic
    const jurosMesSelic = saldoSelicVal * iMesSelic;
    saldoSelicVal = saldoSelicVal + jurosMesSelic + aporteMensalClean;
    jurosAcumSelicVal += jurosMesSelic;

    // 4. Simulação CDI
    const jurosMesCDI = saldoCDIVal * iMesCDI;
    saldoCDIVal = saldoCDIVal + jurosMesCDI + aporteMensalClean;
    jurosAcumCDIVal += jurosMesCDI;

    totalInvestidoAcumulado += aporteMensalClean;

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

  // Desconto da Inflação Composta sobre o Montante Final
  // A inflação acumulada no tempo é (1 + iMesIPCA)^totalMeses
  const inflacaoAcumuladaDivisor = Math.pow(1 + iMesIPCA, totalMeses);
  const poderCompraReal = totalMeses > 0 ? (saldoUserVal / inflacaoAcumuladaDivisor) : saldoUserVal;
  const desvalorizacaoInflacao = Math.max(0, saldoUserVal - poderCompraReal);

  const totais: ResultadosTotais = {
    valorBrutoUser: saldoUserVal,
    totalInvestidoUser: totalInvestidoAcumulado,
    totalJurosUser: jurosAcumUserVal,
    
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

