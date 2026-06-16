const CRYPTO_CODES = new Set([
  'BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'ADA', 'DOT', 'LTC', 'BNB', 'USDT', 'USDC',
  'BCH', 'AVAX', 'LINK', 'SHIB', 'TRX', 'XLM', 'PEPE',
]);

export function formatExchangeTimestamp(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes} UTC`;
}

export function formatConvertedValue(value: number, code: string): string {
  if (code === 'BRL') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  const isCrypto = CRYPTO_CODES.has(code);
  return (
    value.toLocaleString('en-US', {
      minimumFractionDigits: isCrypto ? 6 : 2,
      maximumFractionDigits: isCrypto ? 8 : 2,
    }) + ` ${code}`
  );
}

export function formatRateBRL(rate: number, code: string): string {
  if (code === 'BTC' && rate > 1000) return `R$ ${(rate / 1000).toFixed(0)}k`;
  if (rate >= 100) return `R$ ${rate.toFixed(2)}`;
  if (rate >= 1) return `R$ ${rate.toFixed(3)}`;
  return `R$ ${rate.toFixed(4)}`;
}
