import { useState, useEffect, useCallback, useRef } from 'react';
import {
  loadExchangeRates,
  REFRESH_INTERVAL_MS,
  type ExchangeRatesData,
  type ExchangeStatus,
} from '../utils/currency/exchangeRates';
import type { CurrencyInfo } from '../constants/currencies';

export function useExchangeRates() {
  const [rates, setRates] = useState<Record<string, number>>({ BRL: 1 });
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [status, setStatus] = useState<ExchangeStatus>('loading');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [sourceDate, setSourceDate] = useState<string | null>(null);
  const [source, setSource] = useState<ExchangeRatesData['source']>('fallback');
  const mounted = useRef(true);

  const apply = useCallback((data: ExchangeRatesData) => {
    if (!mounted.current) return;
    setRates(data.rates);
    setCurrencies(data.currencies);
    setStatus(data.status);
    setLastUpdated(data.lastUpdated);
    setSourceDate(data.sourceDate);
    setSource(data.source);
  }, []);

  const refresh = useCallback(async (force = false) => {
    const data = await loadExchangeRates({ force });
    apply(data);
  }, [apply]);

  useEffect(() => {
    mounted.current = true;
    refresh(false);

    const interval = setInterval(() => refresh(true), REFRESH_INTERVAL_MS);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [refresh]);

  return {
    rates,
    currencies,
    status,
    lastUpdated,
    sourceDate,
    source,
    refresh,
    loading: status === 'loading',
  };
}
