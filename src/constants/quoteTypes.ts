export type QuoteType = 'comercial' | 'turismo' | 'paralelo';

export interface QuoteTypeMeta {
  id: QuoteType;
  label: string;
  hint: string;
}

export const QUOTE_TYPES: QuoteTypeMeta[] = [
  {
    id: 'comercial',
    label: 'Comercial',
    hint: 'Utilizada pelo mercado financeiro e empresas.',
  },
  {
    id: 'turismo',
    label: 'Turismo',
    hint: 'Utilizada em casas de câmbio e viagens.',
  },
  {
    id: 'paralelo',
    label: 'Paralelo',
    hint: 'Cotação informal quando disponível.',
  },
];

/** Spread estimado quando ask não está disponível na API */
const TURISMO_SPREAD = 1.045;
const PARALELO_SPREAD = 1.028;

export function adjustRateForQuoteType(
  commercialRate: number,
  quoteType: QuoteType,
  ask?: number | null,
): number {
  if (!commercialRate || commercialRate <= 0) return commercialRate;
  switch (quoteType) {
    case 'comercial':
      return commercialRate;
    case 'turismo':
      return ask && ask > 0 ? ask : commercialRate * TURISMO_SPREAD;
    case 'paralelo':
      return commercialRate * PARALELO_SPREAD;
  }
}

export function applyQuoteTypeToRates(
  baseRates: Record<string, number>,
  quoteType: QuoteType,
  asks: Record<string, number | null | undefined>,
): Record<string, number> {
  const adjusted: Record<string, number> = { BRL: 1 };
  for (const [code, rate] of Object.entries(baseRates)) {
    if (code === 'BRL') continue;
    adjusted[code] = adjustRateForQuoteType(rate, quoteType, asks[code]);
  }
  return adjusted;
}
