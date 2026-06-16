export type TempoUnidade = 'anos' | 'meses';
export type TaxaPeriodo = 'anual' | 'mensal';
export type TaxaTipo = 'manual' | 'poupanca' | 'selic' | 'cdi';
export type MoedaTipo = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'ARS' | 'BTC' | 'ETH';

export interface RegistroMensal {
  mesIndex: number; // 0 para o ponto inicial, ou 1, 2, ...
  label: string; // "Mês 1", "Mês 2" ou "Mês 12 (1 Ano)"
  tempoExibicao: string; // Ex: "Mês 1" ou "Ano 1, Mês 1"
  totalInvestido: number;
  saldoUser: number;
  jurosAcumuladoUser: number;
  jurosDoMesUser: number;
  
  saldoPoupanca: number;
  jurosAcumuladoPoupanca: number;
  jurosDoMesPoupanca: number;
  
  saldoSelic: number;
  jurosAcumuladoSelic: number;
  jurosDoMesSelic: number;

  saldoCDI: number;
  jurosAcumuladoCDI: number;
  jurosDoMesCDI: number;
}

export interface ResultadosTotais {
  valorBrutoUser: number;
  totalInvestidoUser: number;
  totalJurosUser: number;
  
  valorBrutoPoupanca: number;
  totalJurosPoupanca: number;
  
  valorBrutoSelic: number;
  totalJurosSelic: number;

  valorBrutoCDI: number;
  totalJurosCDI: number;
  
  ganhoAdicionalPoupanca: number; // Quanto o usuário ganhou a mais que a poupança
  ganhoAdicionalSelic: number;    // Quanto o usuário ganhou a mais ou a menos que a Selic
  ganhoAdicionalCDI: number;      // Quanto o usuário ganhou a mais ou a menos que o CDI

  poderCompraReal: number;        // Valor líquido descontando a inflação real acumulada
  desvalorizacaoInflacao: number; // Quanto do montante bruto foi corroído pela inflação
}

