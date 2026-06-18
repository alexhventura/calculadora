export type CalculatorMode = 'simple' | 'advanced';

export type AporteFrequencia = 'mensal' | 'quinzenal' | 'semanal' | 'anual';
export type InflacaoModo = 'ipca_api' | 'ipca_manual' | 'none';
export type TributacaoModo = 'none' | 'ir_regressivo' | 'ir_custom';
export type TaxaPeriodoExtendido = 'anual' | 'mensal' | 'diaria';

export interface JurosAdvancedOptions {
  aporteFrequencia: AporteFrequencia;
  inflacaoModo: InflacaoModo;
  inflacaoManual: number;
  tributacao: TributacaoModo;
  irCustomPercent: number;
  taxaAdminAnual: number;
  taxaPerformanceAnual: number;
  taxaCustodiaAnual: number;
  taxaPeriodoExtendido: TaxaPeriodoExtendido;
}

export type RegimePj = 'simples_6' | 'mei' | 'lucro_presumido';
export type TipoBeneficioAposentadoria = 'inss' | 'servidor' | 'previdencia_privada' | 'independente';
export type ModoProjecaoAposentadoria = 'renda_alvo' | 'salario_atual' | 'salario_medio';
export type CenarioInvestimento = 'conservador' | 'moderado' | 'agressivo' | 'personalizado';

export interface CltPjAdvancedOptions {
  regimePj: RegimePj;
  contadorMensal: number;
  faturamentoPjManual: number | null;
  incluirFgtsComparativo: boolean;
}

export interface AposentadoriaAdvancedOptions {
  tipoBeneficio: TipoBeneficioAposentadoria;
  modoProjecao: ModoProjecaoAposentadoria;
  salarioMedio: number;
  cenario: CenarioInvestimento;
  taxaRealPersonalizada: number;
  taxaSaqueMensal: number;
}

export interface RescisaoAdvancedOptions {
  feriasVencidas: boolean;
  avisoPrevioIndenizado: boolean;
  avisoPrevioDias: number;
  usarVerbasManuais: boolean;
  manualSaldoSalario: number | null;
  manualDecimoTerceiro: number | null;
  manualFerias: number | null;
  usarPeriodoManual: boolean;
  mesesManual: number;
  diasManual: number;
}

export interface AdvancedCalculatorOptions {
  juros: JurosAdvancedOptions;
  cltPj: CltPjAdvancedOptions;
  aposentadoria: AposentadoriaAdvancedOptions;
  rescisao: RescisaoAdvancedOptions;
}

export const DEFAULT_JUROS_ADVANCED: JurosAdvancedOptions = {
  aporteFrequencia: 'mensal',
  inflacaoModo: 'ipca_api',
  inflacaoManual: 4.25,
  tributacao: 'none',
  irCustomPercent: 15,
  taxaAdminAnual: 0,
  taxaPerformanceAnual: 0,
  taxaCustodiaAnual: 0,
  taxaPeriodoExtendido: 'anual',
};

export const DEFAULT_CLT_PJ_ADVANCED: CltPjAdvancedOptions = {
  regimePj: 'simples_6',
  contadorMensal: 200,
  faturamentoPjManual: null,
  incluirFgtsComparativo: true,
};

export const DEFAULT_APOSENTADORIA_ADVANCED: AposentadoriaAdvancedOptions = {
  tipoBeneficio: 'inss',
  modoProjecao: 'renda_alvo',
  salarioMedio: 8000,
  cenario: 'moderado',
  taxaRealPersonalizada: 5,
  taxaSaqueMensal: 0.35,
};

export const DEFAULT_RESCISAO_ADVANCED: RescisaoAdvancedOptions = {
  feriasVencidas: false,
  avisoPrevioIndenizado: false,
  avisoPrevioDias: 30,
  usarVerbasManuais: false,
  manualSaldoSalario: null,
  manualDecimoTerceiro: null,
  manualFerias: null,
  usarPeriodoManual: false,
  mesesManual: 12,
  diasManual: 30,
};

export const DEFAULT_ADVANCED_OPTIONS: AdvancedCalculatorOptions = {
  juros: DEFAULT_JUROS_ADVANCED,
  cltPj: DEFAULT_CLT_PJ_ADVANCED,
  aposentadoria: DEFAULT_APOSENTADORIA_ADVANCED,
  rescisao: DEFAULT_RESCISAO_ADVANCED,
};
