import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchFeaturedQuotes,
  fetchDailyHistory,
  buildHistoricalComparison,
  type FeaturedQuote,
  type DailyRatePoint,
  type HistoricalComparison,
  HISTORY_PAIRS,
} from '../utils/currency/currencyHistory';

export type HistoryPeriod = 30 | 180 | 365;

export function useCurrencyHistory(selectedCode: string, currentRate: number) {
  const [featured, setFeatured] = useState<FeaturedQuote[]>([]);
  const [fullHistory, setFullHistory] = useState<DailyRatePoint[]>([]);
  const [period, setPeriod] = useState<HistoryPeriod>(30);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [comparison, setComparison] = useState<HistoricalComparison | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingFeatured(true);
    fetchFeaturedQuotes().then((quotes) => {
      if (!cancelled) {
        setFeatured(quotes);
        setLoadingFeatured(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadHistory = useCallback(async (code: string) => {
    if (!HISTORY_PAIRS[code]) {
      setFullHistory([]);
      setComparison(null);
      return;
    }
    setLoadingHistory(true);
    const points = await fetchDailyHistory(code, 365);
    setFullHistory(points);
    setComparison(buildHistoricalComparison(points, currentRate));
    setLoadingHistory(false);
  }, [currentRate]);

  useEffect(() => {
    loadHistory(selectedCode);
  }, [selectedCode, loadHistory]);

  useEffect(() => {
    if (fullHistory.length > 0) {
      setComparison(buildHistoricalComparison(fullHistory, currentRate));
    }
  }, [currentRate, fullHistory]);

  const history = useMemo(() => {
    if (fullHistory.length <= period) return fullHistory;
    return fullHistory.slice(-period);
  }, [fullHistory, period]);

  return {
    featured,
    history,
    period,
    setPeriod,
    comparison,
    loadingFeatured,
    loadingHistory,
    hasHistory: Boolean(HISTORY_PAIRS[selectedCode]),
  };
}
