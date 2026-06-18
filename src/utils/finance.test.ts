import { describe, it, expect } from 'vitest';
import {
  calcularJurosCompostos,
  calcularTaxaPoupancaVal,
  converterMatrizMoedas,
  convertAnualParaMensal,
  convertMensalParaAnual,
  FALLBACK_SELIC,
} from './finance';

describe('calcularTaxaPoupancaVal', () => {
  it('retorna 70% da Selic quando Selic <= 8.5%', () => {
    expect(calcularTaxaPoupancaVal(8.0)).toBeCloseTo(5.6, 1);
  });

  it('retorna ~8.33% quando Selic > 8.5%', () => {
    expect(calcularTaxaPoupancaVal(FALLBACK_SELIC)).toBeCloseTo(8.33, 1);
  });
});

describe('calcularJurosCompostos', () => {
  it('calcula montante sem aportes com taxa anual conhecida', () => {
    const { totais } = calcularJurosCompostos(1000, 0, 1, 'anos', 12, 'anual', 14.5, 4.25);
    expect(totais.valorBrutoUser).toBeGreaterThan(1000);
    expect(totais.totalInvestidoUser).toBe(1000);
    expect(totais.totalJurosUser).toBeCloseTo(totais.valorBrutoUser - 1000, 0);
  });

  it('acumula aportes mensais corretamente', () => {
    const { totais } = calcularJurosCompostos(0, 100, 1, 'anos', 0, 'anual', 14.5, 4.25);
    expect(totais.totalInvestidoUser).toBe(1200);
  });

  it('sanitiza valores negativos e NaN', () => {
    const { totais } = calcularJurosCompostos(-500, -100, -5, 'anos', -10, 'anual');
    expect(totais.valorBrutoUser).toBe(0);
    expect(totais.totalInvestidoUser).toBe(0);
  });

  it('limita simulação a MAX_SIMULATION_MONTHS por segurança', () => {
    const { registros } = calcularJurosCompostos(1000, 0, 99999, 'meses', 10, 'anual');
    expect(registros.length).toBeLessThanOrEqual(7201);
  });

  it('diferencia periodicidade mensal e anual com mesma taxa nominal no mesmo prazo', () => {
    const mensal = calcularJurosCompostos(1000, 0, 12, 'meses', 10, 'mensal', 14.5, 4.25);
    const anual = calcularJurosCompostos(1000, 0, 12, 'meses', 10, 'anual', 14.5, 4.25);
    expect(mensal.totais.valorBrutoUser).toBeGreaterThan(3000);
    expect(anual.totais.valorBrutoUser).toBeCloseTo(1100, 0);
    expect(mensal.totais.valorBrutoUser).not.toBeCloseTo(anual.totais.valorBrutoUser, 0);
  });

  it('projeta 12 anos com taxa anual em mais períodos que 12 meses mensais', () => {
    const dozeMesesMensal = calcularJurosCompostos(1000, 0, 12, 'meses', 10, 'mensal', 14.5, 4.25);
    const dozeAnosAnual = calcularJurosCompostos(1000, 0, 12, 'anos', 10, 'anual', 14.5, 4.25);
    expect(dozeMesesMensal.registros).toHaveLength(13);
    expect(dozeAnosAnual.registros).toHaveLength(145);
    expect(dozeAnosAnual.totais.valorBrutoUser).toBeGreaterThan(dozeMesesMensal.totais.valorBrutoUser);
  });
});

describe('converterMatrizMoedas', () => {
  it('retorna o mesmo valor para mesma moeda', () => {
    expect(converterMatrizMoedas(100, 'BRL', 'BRL')).toBe(100);
  });

  it('converte USD para BRL com cotação fallback', () => {
    const result = converterMatrizMoedas(1, 'USD', 'BRL');
    expect(result).toBeGreaterThan(1);
  });

  it('retorna 0 para valores inválidos', () => {
    expect(converterMatrizMoedas(NaN, 'USD', 'BRL')).toBe(0);
    expect(converterMatrizMoedas(-10, 'USD', 'BRL')).toBe(0);
  });
});

describe('conversão de taxas', () => {
  it('converte anual para mensal e volta com consistência', () => {
    const mensal = convertAnualParaMensal(12);
    const anual = convertMensalParaAnual(mensal);
    expect(anual).toBeCloseTo(12, 1);
  });
});
