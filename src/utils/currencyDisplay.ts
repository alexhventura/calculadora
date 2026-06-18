/** Variantes de exibição monetária com escala tipográfica adaptativa. */
export type CurrencyAmountVariant = 'card' | 'highlight' | 'compact' | 'badge' | 'inline';

/**
 * Reduz o tamanho da fonte conforme o valor cresce (milhões+),
 * mantendo o valor inteiro em uma única linha dentro do card.
 */
export function currencyAmountSizeClass(
  value: number,
  variant: CurrencyAmountVariant = 'card',
): string {
  const abs = Math.abs(value);

  if (variant === 'card' || variant === 'highlight') {
    if (abs >= 100_000_000) return 'text-[0.58rem] leading-tight sm:text-[0.65rem] md:text-xs';
    if (abs >= 10_000_000) return 'text-[0.62rem] leading-tight sm:text-xs md:text-sm';
    if (abs >= 1_000_000) return 'text-xs leading-tight sm:text-sm md:text-base lg:text-lg';
    if (abs >= 100_000) return 'text-sm leading-tight sm:text-base md:text-lg lg:text-xl';
    return 'text-lg leading-tight sm:text-xl lg:text-2xl';
  }

  if (variant === 'compact') {
    if (abs >= 100_000_000) return 'text-[10px] leading-tight sm:text-xs';
    if (abs >= 10_000_000) return 'text-xs leading-tight sm:text-sm';
    if (abs >= 1_000_000) return 'text-sm leading-tight sm:text-base';
    if (abs >= 100_000) return 'text-base leading-tight sm:text-lg';
    return 'text-lg leading-tight';
  }

  if (variant === 'badge') {
    if (abs >= 10_000_000) return 'text-xs leading-tight sm:text-sm';
    if (abs >= 1_000_000) return 'text-sm leading-tight sm:text-base';
    if (abs >= 100_000) return 'text-base leading-tight sm:text-lg';
    return 'text-xl leading-tight';
  }

  // inline — linhas de detalhamento
  if (abs >= 10_000_000) return 'text-[10px] leading-tight sm:text-xs';
  if (abs >= 1_000_000) return 'text-[11px] leading-tight sm:text-xs';
  if (abs >= 100_000) return 'text-xs leading-tight';
  return 'text-xs leading-tight';
}
