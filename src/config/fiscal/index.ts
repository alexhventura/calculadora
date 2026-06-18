/** Parâmetros fiscais e previdenciários versionados — atualizar via commit, sem API paga. */
export const FISCAL_CONFIG = {
  versao: '2026-06',
  vigencia: '2026-01-01',
  inss: {
    teto: 7786.02,
  },
  previdencia: {
    tetoBeneficio: 7786.02,
    taxaSaquePadraoMensal: 0.0035,
    substituicaoInssEstimada: 0.6,
  },
  simples: {
    anexoIIIInicial: 0.06,
    meiLimiteAnual: 81000,
    meiDasMensal: 70,
    lucroPresumido: 0.1633,
    contadorPadrao: 200,
  },
  rescisao: {
    multaSemJusta: 0.4,
    multaAcordo: 0.2,
    fgtsPercentual: 0.08,
    maxMeses: 600,
  },
  cenariosRendimento: {
    conservador: 0.03,
    moderado: 0.05,
    agressivo: 0.08,
  },
} as const;

export type CenarioRendimento = keyof typeof FISCAL_CONFIG.cenariosRendimento;
