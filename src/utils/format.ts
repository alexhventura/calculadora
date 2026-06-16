/** Formata número inteiro com separador de milhar pt-BR (ex: 10000 → "10.000"). */
export function formatMilhar(val: number | string): string {
  const numericOnly = String(val).replace(/\D/g, '');
  if (!numericOnly) return '';
  const parsed = parseInt(numericOnly, 10);
  return parsed.toLocaleString('pt-BR');
}

/** Converte string com máscara pt-BR para número. */
export function parseMilhar(valStr: string): number {
  const normalized = valStr.replace(/\./g, '').replace(/,/g, '.').replace(/[^\d.]/g, '');
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Formata valor em Real brasileiro. */
export function formatBRL(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Sanitiza entrada numérica removendo caracteres perigosos para DOM injection. */
export function sanitizeNumericString(input: string, maxLength = 20): string {
  return input.replace(/[^\d.,]/g, '').slice(0, maxLength);
}

/** Limita número dentro de intervalo seguro. */
export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
