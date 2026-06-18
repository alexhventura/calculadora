import { describe, it, expect } from 'vitest';
import { calcularIrRegressivo } from './investmentTax';

describe('calcularIrRegressivo', () => {
  it('aplica 15% acima de 720 dias', () => {
    expect(calcularIrRegressivo(800, 10000)).toBeCloseTo(1500, 0);
  });

  it('aplica 22,5% até 180 dias', () => {
    expect(calcularIrRegressivo(90, 1000)).toBeCloseTo(225, 0);
  });
});
