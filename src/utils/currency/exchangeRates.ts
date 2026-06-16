import { OBSOLETE_CODES, buildCurrencyInfo, type CurrencyInfo } from '../../constants/currencies';
import { FALLBACK_COTAS } from '../finance';

const CACHE_KEY = 'cjf_exchange_rates_v1';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos
const REFRESH_INTERVAL_MS = 30 * 60 * 1000;

const PRIMARY_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const FALLBACK_URL = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json';

const AWESOME_API_URL =
  'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,CAD-BRL,AUD-BRL,CHF-BRL,ARS-BRL,BTC-BRL,ETH-BRL';

export type ExchangeStatus = 'loading' | 'live' | 'cached' | 'fallback';

export interface ExchangeRatesData {
  rates: Record<string, number>;
  currencies: CurrencyInfo[];
  status: ExchangeStatus;
  lastUpdated: string | null;
  sourceDate: string | null;
  source: 'currency-api' | 'awesomeapi' | 'cache' | 'fallback';
}

interface CachePayload {
  timestamp: number;
  sourceDate: string;
  source: ExchangeRatesData['source'];
  rates: Record<string, number>;
}

function parseRate(value: unknown): number | null {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function ratesToCurrencies(rates: Record<string, number>): CurrencyInfo[] {
  return Object.keys(rates)
    .filter((code) => code !== 'BRL' && !OBSOLETE_CODES.has(code))
    .map(buildCurrencyInfo)
    .sort((a, b) => {
      if (a.type !== b.type) {
        const order = { fiat: 0, metal: 1, crypto: 2 };
        return order[a.type] - order[b.type];
      }
      return a.code.localeCompare(b.code);
    });
}

/** Converte resposta USD-base da currency-api para cotações em BRL (1 unidade = X BRL) */
export function parseUsdBaseResponse(data: { date?: string; usd?: Record<string, number> }): {
  rates: Record<string, number>;
  sourceDate: string | null;
} | null {
  const usd = data?.usd;
  const brlPerUsd = parseRate(usd?.brl);
  if (!usd || brlPerUsd === null) return null;

  const rates: Record<string, number> = { BRL: 1 };

  for (const [key, value] of Object.entries(usd)) {
    const code = key.toUpperCase();
    if (code === 'BRL' || OBSOLETE_CODES.has(code)) continue;
    const rateVsUsd = parseRate(value);
    if (rateVsUsd === null) continue;
    rates[code] = brlPerUsd / rateVsUsd;
  }

  return { rates, sourceDate: data.date ?? null };
}

function readCache(): CachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed?.rates || !parsed.timestamp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload: CachePayload): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* quota exceeded — ignora */
  }
}

async function fetchCurrencyApi(): Promise<{ rates: Record<string, number>; sourceDate: string | null } | null> {
  for (const url of [PRIMARY_URL, FALLBACK_URL]) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const parsed = parseUsdBaseResponse(data);
      if (parsed) return parsed;
    } catch {
      /* tenta próxima URL */
    }
  }
  return null;
}

async function fetchAwesomeApi(): Promise<Record<string, number> | null> {
  const pairs: [string, string][] = [
    ['USDBRL', 'USD'],
    ['EURBRL', 'EUR'],
    ['GBPBRL', 'GBP'],
    ['JPYBRL', 'JPY'],
    ['CADBRL', 'CAD'],
    ['AUDBRL', 'AUD'],
    ['CHFBRL', 'CHF'],
    ['ARSBRL', 'ARS'],
    ['BTCBRL', 'BTC'],
    ['ETHBRL', 'ETH'],
  ];

  try {
    const res = await fetch(AWESOME_API_URL);
    if (!res.ok) return null;
    const data = await res.json();
    const rates: Record<string, number> = { BRL: 1 };

    for (const [key, code] of pairs) {
      const rate = parseRate(data[key]?.bid);
      if (rate !== null) rates[code] = rate;
    }

    return Object.keys(rates).length > 1 ? rates : null;
  } catch {
    return null;
  }
}

function fallbackRates(): Record<string, number> {
  const legacy = FALLBACK_COTAS as Record<string, number>;
  return { ...legacy, BRL: 1 };
}

export function isCacheFresh(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL_MS;
}

export async function loadExchangeRates(options?: { force?: boolean }): Promise<ExchangeRatesData> {
  const cached = readCache();

  if (!options?.force && cached && isCacheFresh(cached.timestamp)) {
    return {
      rates: cached.rates,
      currencies: ratesToCurrencies(cached.rates),
      status: 'cached',
      lastUpdated: new Date(cached.timestamp).toISOString(),
      sourceDate: cached.sourceDate,
      source: 'cache',
    };
  }

  const apiResult = await fetchCurrencyApi();
  if (apiResult) {
    const payload: CachePayload = {
      timestamp: Date.now(),
      sourceDate: apiResult.sourceDate ?? new Date().toISOString().slice(0, 10),
      source: 'currency-api',
      rates: apiResult.rates,
    };
    writeCache(payload);
    return {
      rates: apiResult.rates,
      currencies: ratesToCurrencies(apiResult.rates),
      status: 'live',
      lastUpdated: new Date(payload.timestamp).toISOString(),
      sourceDate: apiResult.sourceDate,
      source: 'currency-api',
    };
  }

  const awesomeRates = await fetchAwesomeApi();
  if (awesomeRates) {
    const payload: CachePayload = {
      timestamp: Date.now(),
      sourceDate: new Date().toISOString().slice(0, 10),
      source: 'awesomeapi',
      rates: awesomeRates,
    };
    writeCache(payload);
    return {
      rates: awesomeRates,
      currencies: ratesToCurrencies(awesomeRates),
      status: 'live',
      lastUpdated: new Date(payload.timestamp).toISOString(),
      sourceDate: payload.sourceDate,
      source: 'awesomeapi',
    };
  }

  if (cached?.rates) {
    return {
      rates: cached.rates,
      currencies: ratesToCurrencies(cached.rates),
      status: 'cached',
      lastUpdated: new Date(cached.timestamp).toISOString(),
      sourceDate: cached.sourceDate,
      source: 'cache',
    };
  }

  const fb = fallbackRates();
  return {
    rates: fb,
    currencies: ratesToCurrencies(fb),
    status: 'fallback',
    lastUpdated: null,
    sourceDate: null,
    source: 'fallback',
  };
}

export { REFRESH_INTERVAL_MS, CACHE_TTL_MS };
