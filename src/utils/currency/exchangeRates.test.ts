import { describe, it, expect } from 'vitest';
import { parseUsdBaseResponse, isCacheFresh } from './exchangeRates';

describe('parseUsdBaseResponse', () => {
  it('converte taxas USD-base para cotações em BRL', () => {
    const result = parseUsdBaseResponse({
      date: '2026-06-15',
      usd: { usd: 1, brl: 5, eur: 0.5, jpy: 100 },
    });
    expect(result).not.toBeNull();
    expect(result!.rates.BRL).toBe(1);
    expect(result!.rates.USD).toBeCloseTo(5, 4);
    expect(result!.rates.EUR).toBeCloseTo(10, 4);
    expect(result!.rates.JPY).toBeCloseTo(0.05, 4);
    expect(result!.sourceDate).toBe('2026-06-15');
  });

  it('retorna null para dados inválidos', () => {
    expect(parseUsdBaseResponse({})).toBeNull();
    expect(parseUsdBaseResponse({ usd: { usd: 1 } })).toBeNull();
  });
});

describe('isCacheFresh', () => {
  it('identifica cache dentro do TTL', () => {
    const now = Date.now();
    expect(isCacheFresh(now - 5 * 60 * 1000)).toBe(true);
    expect(isCacheFresh(now - 60 * 60 * 1000)).toBe(false);
  });
});
