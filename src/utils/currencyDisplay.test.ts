import { describe, it, expect } from 'vitest';
import {
  currencyAmountFontSizeRem,
  currencyFormattedLength,
  getCurrencyAmountMetrics,
} from './currencyDisplay';

describe('currencyFormattedLength', () => {
  it('conta caracteres do valor formatado em BRL', () => {
    expect(currencyFormattedLength(1_000_000)).toBeGreaterThan(14);
    expect(currencyFormattedLength(50_000)).toBeGreaterThan(10);
  });
});

describe('currencyAmountFontSizeRem', () => {
  it('mantém fonte maior para valores menores', () => {
    const small = currencyAmountFontSizeRem(50_000, 'card');
    const million = currencyAmountFontSizeRem(1_000_000, 'card');
    expect(small).toBeGreaterThan(million);
    expect(small).toBeGreaterThanOrEqual(1.2);
  });

  it('reduz gradualmente conforme o valor cresce, sem ficar ilegível no mobile', () => {
    const million = currencyAmountFontSizeRem(1_000_000, 'card');
    const tenMillion = currencyAmountFontSizeRem(10_000_000, 'card');
    const hundredMillion = currencyAmountFontSizeRem(100_000_000, 'card');

    expect(million).toBeGreaterThanOrEqual(0.85);
    expect(tenMillion).toBeGreaterThanOrEqual(0.85);
    expect(hundredMillion).toBeGreaterThanOrEqual(0.85);
    expect(million).toBeGreaterThan(tenMillion);
    expect(tenMillion).toBeGreaterThan(hundredMillion);
  });

  it('highlight usa escala maior que card para o mesmo valor', () => {
    const card = currencyAmountFontSizeRem(1_000_000, 'card');
    const highlight = currencyAmountFontSizeRem(1_000_000, 'highlight');
    expect(highlight).toBeGreaterThan(card);
  });
});

describe('getCurrencyAmountMetrics', () => {
  it('expõe variáveis CSS para escala fluida', () => {
    const metrics = getCurrencyAmountMetrics(1_000_000, 'card');
    expect(metrics.charLength).toBeGreaterThan(0);
    expect(metrics.cssVars['--currency-len']).toBe(metrics.charLength);
    expect(metrics.cssVars['--currency-size']).toContain('rem');
  });
});
