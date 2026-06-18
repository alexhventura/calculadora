import { describe, it, expect } from 'vitest';
import { calcularPeriodoRescisao } from './rescisaoDates';

describe('calcularPeriodoRescisao', () => {
  it('calcula meses e dias a partir de datas', () => {
    const r = calcularPeriodoRescisao('2023-01-15', '2024-06-20');
    expect(r.mesesTrabalhados).toBeGreaterThanOrEqual(12);
    expect(r.diasUltimoMes).toBe(20);
  });

  it('retorna zero para datas inválidas ou vazias', () => {
    const r = calcularPeriodoRescisao('', '2024-01-01');
    expect(r.mesesTrabalhados).toBe(0);
    expect(r.diasUltimoMes).toBe(0);
  });
});
