import type { TempoUnidade } from '../types';

export type JurosPeriodicidade = 'mensal' | 'anual';

export function periodicidadeFromState(
  taxaPeriodo: 'anual' | 'mensal',
): JurosPeriodicidade {
  return taxaPeriodo === 'mensal' ? 'mensal' : 'anual';
}

export function tempoUnidadeForPeriodicidade(p: JurosPeriodicidade): TempoUnidade {
  return p === 'mensal' ? 'meses' : 'anos';
}

export function periodicidadeLabel(p: JurosPeriodicidade): string {
  return p === 'mensal' ? 'Mensal' : 'Anual';
}

export function periodicidadeResumo(p: JurosPeriodicidade): string {
  return p === 'mensal'
    ? 'Taxa ao mês · prazo em meses'
    : 'Taxa ao ano · prazo em anos';
}

export function taxaFieldLabel(p: JurosPeriodicidade): string {
  return p === 'mensal' ? 'Ganho mensal esperado (%)' : 'Ganho anual esperado (%)';
}

export function taxaFieldHint(p: JurosPeriodicidade): string {
  return p === 'mensal'
    ? 'Quanto você espera que o investimento renda por mês, em média.'
    : 'Quanto você espera que o investimento renda por ano, em média.';
}

export function taxaFieldSuffix(p: JurosPeriodicidade): string {
  return p === 'mensal' ? '% ao mês' : '% ao ano';
}

export function tempoFieldLabel(p: JurosPeriodicidade): string {
  return p === 'mensal' ? 'Por quantos meses' : 'Por quantos anos';
}

export function tempoFieldHint(p: JurosPeriodicidade): string {
  return p === 'mensal'
    ? 'Número de meses que você vai guardar dinheiro.'
    : 'Número de anos que você vai guardar dinheiro.';
}

export function tempoFieldSuffix(p: JurosPeriodicidade): string {
  return p === 'mensal' ? 'meses' : 'anos';
}

export function prazoInvestimentoLabel(p: JurosPeriodicidade): string {
  return p === 'mensal' ? 'Meses' : 'Anos';
}
