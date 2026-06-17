/** Histórico e variação diária via AwesomeAPI (pares BRL) */

const HISTORY_CACHE_KEY = 'cjf_currency_history_v2';
const HISTORY_CACHE_TTL_MS = 60 * 60 * 1000;

export interface DailyRatePoint {
  date: string;
  bid: number;
}

export interface FeaturedQuote {
  code: string;
  rate: number;
  ask: number | null;
  pctChange: number | null;
  high: number | null;
  low: number | null;
}

export interface HistoricalComparison {
  today: number;
  days30: number | null;
  months6: number | null;
  year1: number | null;
  change30d: number | null;
  change6m: number | null;
  change1y: number | null;
}

/** Pares suportados para histórico (AwesomeAPI) */
export const HISTORY_PAIRS: Record<string, string> = {
  USD: 'USD-BRL',
  EUR: 'EUR-BRL',
  GBP: 'GBP-BRL',
  JPY: 'JPY-BRL',
  CAD: 'CAD-BRL',
  AUD: 'AUD-BRL',
  CHF: 'CHF-BRL',
  ARS: 'ARS-BRL',
  BTC: 'BTC-BRL',
  ETH: 'ETH-BRL',
};

const FEATURED_CODES = Object.keys(HISTORY_PAIRS);

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${HISTORY_CACHE_KEY}_${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.timestamp > HISTORY_CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      `${HISTORY_CACHE_KEY}_${key}`,
      JSON.stringify({ timestamp: Date.now(), data }),
    );
  } catch {
    /* quota */
  }
}

function parseNum(value: unknown): number | null {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : null;
}

export async function fetchFeaturedQuotes(): Promise<FeaturedQuote[]> {
  const cached = readCache<FeaturedQuote[]>('featured');
  if (cached) return cached;

  const pairs = FEATURED_CODES.map((c) => HISTORY_PAIRS[c]).join(',');
  const url = `https://economia.awesomeapi.com.br/json/last/${pairs}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    const quotes: FeaturedQuote[] = FEATURED_CODES.map((code) => {
      const key = `${code}BRL`;
      const item = data[key];
      return {
        code,
        rate: parseNum(item?.bid) ?? 0,
        ask: parseNum(item?.ask),
        pctChange: parseNum(item?.pctChange),
        high: parseNum(item?.high),
        low: parseNum(item?.low),
      };
    }).filter((q) => q.rate > 0);

    if (quotes.length > 0) writeCache('featured', quotes);
    return quotes;
  } catch {
    return [];
  }
}

export async function fetchDailyHistory(code: string, days: number): Promise<DailyRatePoint[]> {
  const pair = HISTORY_PAIRS[code];
  if (!pair) return [];

  const cacheKey = `daily_${code}_${days}`;
  const cached = readCache<DailyRatePoint[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const points: DailyRatePoint[] = data
      .map((item: { create_date?: string; bid?: string }) => ({
        date: item.create_date ?? '',
        bid: parseNum(item.bid) ?? 0,
      }))
      .filter((p) => p.date && p.bid > 0)
      .reverse();

    if (points.length > 0) writeCache(cacheKey, points);
    return points;
  } catch {
    return [];
  }
}

export function buildHistoricalComparison(
  history: DailyRatePoint[],
  currentRate: number,
): HistoricalComparison {
  const today = currentRate;
  const findAt = (daysAgo: number): number | null => {
    if (history.length === 0) return null;
    const target = new Date();
    target.setDate(target.getDate() - daysAgo);
    const targetStr = target.toISOString().slice(0, 10);
    let closest: DailyRatePoint | null = null;
    let minDiff = Infinity;
    for (const p of history) {
      const diff = Math.abs(new Date(p.date).getTime() - target.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
      if (p.date <= targetStr) return p.bid;
    }
    return closest?.bid ?? null;
  };

  const pct = (from: number | null, to: number) =>
    from && from > 0 ? ((to - from) / from) * 100 : null;

  const days30 = findAt(30);
  const months6 = findAt(182);
  const year1 = findAt(365);

  return {
    today,
    days30,
    months6,
    year1,
    change30d: pct(days30, today),
    change6m: pct(months6, today),
    change1y: pct(year1, today),
  };
}
