import type { ActiveTool } from '../utils/calculations/toolCalculations';
import type { AdvancedCalculatorOptions } from '../types/calculator';
import { DEFAULT_ADVANCED_OPTIONS } from '../types/calculator';
import type { TempoUnidade, TaxaTipo } from '../types';
import type { RescisaoMotivo } from '../utils/calculations/toolCalculations';

export interface JurosFormDefaults {
  valorInicialStr: string;
  aporteMensalStr: string;
  tempo: number;
  tempoUnidade: TempoUnidade;
  taxaAnual: number;
  taxaTipo: TaxaTipo;
  taxaPeriodo: 'anual' | 'mensal';
}

export interface CltPjFormDefaults {
  salarioCltStr: string;
  cltVrStr: string;
  cltSaudeStr: string;
  cltOutrosStr: string;
}

export interface AposentadoriaFormDefaults {
  idadeAtual: number;
  idadeAlvo: number;
  salarioAtualStr: string;
  rendaDesejadaStr: string;
  patrimonioAtualStr: string;
}

export interface RescisaoFormDefaults {
  salarioStr: string;
  dataAdmissao: string;
  dataDesligamento: string;
  motivo: RescisaoMotivo;
}

export const FORM_DEFAULTS = {
  juros: {
    valorInicialStr: '1.000',
    aporteMensalStr: '500',
    tempo: 20,
    tempoUnidade: 'anos' as TempoUnidade,
    taxaAnual: 10,
    taxaTipo: 'manual' as TaxaTipo,
    taxaPeriodo: 'anual' as const,
  },
  'clt-pj': {
    salarioCltStr: '8.000',
    cltVrStr: '1.000',
    cltSaudeStr: '650',
    cltOutrosStr: '400',
  },
  aposentadoria: {
    idadeAtual: 35,
    idadeAlvo: 65,
    salarioAtualStr: '8.000',
    rendaDesejadaStr: '10.000',
    patrimonioAtualStr: '0',
  },
  rescisao: {
    salarioStr: '5.000',
    dataAdmissao: '2022-01-10',
    dataDesligamento: '2024-06-15',
    motivo: 'sem_justa' as RescisaoMotivo,
  },
} satisfies Record<
  ActiveTool,
  JurosFormDefaults | CltPjFormDefaults | AposentadoriaFormDefaults | RescisaoFormDefaults
>;

export function defaultAdvancedForTool(_tool: ActiveTool): AdvancedCalculatorOptions {
  return structuredClone(DEFAULT_ADVANCED_OPTIONS);
}

/** Valores vazios — usados ao clicar em "Limpar dados" (sem exemplos pré-preenchidos). */
export const EMPTY_FORM_VALUES = {
  juros: {
    valorInicialStr: '',
    aporteMensalStr: '',
    tempo: 0,
    tempoUnidade: 'anos' as TempoUnidade,
    taxaAnual: 0,
    taxaTipo: 'manual' as TaxaTipo,
    taxaPeriodo: 'anual' as const,
  },
  'clt-pj': {
    salarioCltStr: '',
    cltVrStr: '',
    cltSaudeStr: '',
    cltOutrosStr: '',
  },
  aposentadoria: {
    idadeAtual: 18,
    idadeAlvo: 40,
    salarioAtualStr: '',
    rendaDesejadaStr: '',
    patrimonioAtualStr: '',
  },
  rescisao: {
    salarioStr: '',
    dataAdmissao: '',
    dataDesligamento: '',
    motivo: 'sem_justa' as RescisaoMotivo,
  },
} satisfies Record<
  ActiveTool,
  JurosFormDefaults | CltPjFormDefaults | AposentadoriaFormDefaults | RescisaoFormDefaults
>;

export function emptyAdvancedForTool(_tool: ActiveTool): AdvancedCalculatorOptions {
  const opts = structuredClone(DEFAULT_ADVANCED_OPTIONS);
  opts.juros.inflacaoManual = 0;
  opts.juros.irCustomPercent = 0;
  opts.juros.taxaAdminAnual = 0;
  opts.juros.taxaPerformanceAnual = 0;
  opts.juros.taxaCustodiaAnual = 0;
  opts.cltPj.contadorMensal = 0;
  opts.cltPj.faturamentoPjManual = null;
  opts.aposentadoria.salarioMedio = 0;
  opts.aposentadoria.taxaRealPersonalizada = 0;
  opts.aposentadoria.beneficioMensalManual = null;
  opts.aposentadoria.aporteMensalAtual = 0;
  opts.rescisao.manualSaldoSalario = null;
  opts.rescisao.manualDecimoTerceiro = null;
  opts.rescisao.manualFerias = null;
  opts.rescisao.mesesManual = 0;
  opts.rescisao.diasManual = 0;
  return opts;
}
