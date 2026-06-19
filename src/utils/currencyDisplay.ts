import { formatBRL } from './format';

/** Variantes de exibição monetária com escala tipográfica adaptativa. */
export type CurrencyAmountVariant = 'card' | 'highlight' | 'compact' | 'badge' | 'inline';

interface VariantScale {
  /** Tamanho máximo (valores curtos). */
  base: number;
  /** Tamanho mínimo permitido. */
  min: number;
  /** Redução por caractere acima da referência (rem). */
  step: number;
  /** Comprimento de referência do texto formatado (ex.: R$ 9.999,99). */
  ref: number;
}

const VARIANT_SCALE: Record<CurrencyAmountVariant, VariantScale> = {
  highlight: { base: 1.5, min: 0.875, step: 0.05, ref: 11 },
  card: { base: 1.3, min: 0.85, step: 0.048, ref: 11 },
  compact: { base: 1.1, min: 0.8, step: 0.045, ref: 11 },
  badge: { base: 1.2, min: 0.8, step: 0.045, ref: 11 },
  inline: { base: 0.75, min: 0.65, step: 0.03, ref: 11 },
};

export function currencyFormattedLength(value: number): number {
  return formatBRL(Math.abs(value)).length;
}

/** Calcula font-size em rem conforme quantidade de caracteres do valor formatado. */
export function currencyAmountFontSizeRem(
  value: number,
  variant: CurrencyAmountVariant = 'card',
): number {
  const len = currencyFormattedLength(value);
  const { base, min, step, ref } = VARIANT_SCALE[variant];
  return Math.max(min, base - (len - ref) * step);
}

export interface CurrencyAmountMetrics {
  charLength: number;
  fontSizeRem: number;
  cssVars: Record<string, string | number>;
}

export function getCurrencyAmountMetrics(
  value: number,
  variant: CurrencyAmountVariant = 'card',
): CurrencyAmountMetrics {
  const len = currencyFormattedLength(value);
  const scale = VARIANT_SCALE[variant];
  const fontSizeRem = currencyAmountFontSizeRem(value, variant);

  return {
    charLength: len,
    fontSizeRem,
    cssVars: {
      '--currency-len': len,
      '--currency-base': `${scale.base}rem`,
      '--currency-min': `${scale.min}rem`,
      '--currency-step': `${scale.step}rem`,
      '--currency-ref': scale.ref,
      '--currency-size': `${fontSizeRem}rem`,
    },
  };
}

/**
 * @deprecated Use getCurrencyAmountMetrics — mantido para testes legados.
 */
export function currencyAmountSizeClass(
  value: number,
  variant: CurrencyAmountVariant = 'card',
): string {
  const rem = currencyAmountFontSizeRem(value, variant);
  if (rem >= 1.25) return 'text-xl';
  if (rem >= 1.1) return 'text-lg';
  if (rem >= 0.95) return 'text-base';
  if (rem >= 0.85) return 'text-sm';
  return 'text-xs';
}
