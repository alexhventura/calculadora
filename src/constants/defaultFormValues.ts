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

export function defaultAdvancedForTool(tool: ActiveTool): AdvancedCalculatorOptions {
  return structuredClone(DEFAULT_ADVANCED_OPTIONS);
}
