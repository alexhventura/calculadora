import { describe, it, expect } from 'vitest';
import { currencyAmountSizeClass } from './currencyDisplay';

describe('currencyAmountSizeClass', () => {
  it('reduz fonte a partir de 1 milhão no variant card', () => {
    expect(currencyAmountSizeClass(999_999, 'card')).toContain('text-lg');
    expect(currencyAmountSizeClass(1_000_000, 'card')).toContain('text-xs');
    expect(currencyAmountSizeClass(10_000_000, 'card')).toContain('text-[0.62rem]');
  });

  it('mantém tamanho maior para valores menores', () => {
    expect(currencyAmountSizeClass(50_000, 'card')).toContain('text-lg');
  });
});
