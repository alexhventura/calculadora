import { describe, it, expect } from 'vitest';
import {
  periodicidadeFromState,
  periodicidadeFromTempoUnidade,
  tempoUnidadeForPeriodicidade,
  periodicidadeResumo,
  periodicidadeResumoCombinado,
} from './jurosPeriodicity';

describe('jurosPeriodicity', () => {
  it('mapeia taxa mensal para unidade meses', () => {
    expect(periodicidadeFromState('mensal')).toBe('mensal');
    expect(tempoUnidadeForPeriodicidade('mensal')).toBe('meses');
  });

  it('mapeia taxa anual para unidade anos', () => {
    expect(periodicidadeFromState('anual')).toBe('anual');
    expect(tempoUnidadeForPeriodicidade('anual')).toBe('anos');
  });

  it('mapeia tempo em meses ou anos independentemente da taxa', () => {
    expect(periodicidadeFromTempoUnidade('meses')).toBe('mensal');
    expect(periodicidadeFromTempoUnidade('anos')).toBe('anual');
  });

  it('gera resumo claro por periodicidade', () => {
    expect(periodicidadeResumo('mensal')).toContain('mês');
    expect(periodicidadeResumo('anual')).toContain('ano');
  });

  it('combina taxa e prazo independentes no resumo', () => {
    expect(periodicidadeResumoCombinado('mensal', 'anual')).toBe('Taxa ao mês · prazo em anos');
    expect(periodicidadeResumoCombinado('anual', 'mensal')).toBe('Taxa ao ano · prazo em meses');
  });
});
