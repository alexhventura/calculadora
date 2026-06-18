import { describe, it, expect } from 'vitest';
import {
  periodicidadeFromState,
  tempoUnidadeForPeriodicidade,
  periodicidadeResumo,
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

  it('gera resumo claro por periodicidade', () => {
    expect(periodicidadeResumo('mensal')).toContain('mês');
    expect(periodicidadeResumo('anual')).toContain('ano');
  });
});
