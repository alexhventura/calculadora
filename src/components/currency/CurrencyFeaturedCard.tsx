import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowRightLeft, Coins, TrendingDown, TrendingUp } from 'lucide-react';
import CurrencySelect from '../CurrencySelect';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { fetchFeaturedQuotes, type FeaturedQuote } from '../../utils/currency/currencyHistory';
import { converterMatrizMoedas } from '../../utils/finance';
import {
  buildCurrencyInfo,
  DEFAULT_FROM,
  DEFAULT_TO,
} from '../../constants/currencies';
import { formatConvertedValue, formatRateBRL } from '../../utils/formatExchange';
import { ROUTES } from '../../constants/routes';

interface FeaturedPair {
  id: string;
  label: string;
  flag: string;
  quoteCode: string;
  crossTo?: string;
}

const FEATURED_PAIRS: FeaturedPair[] = [
  { id: 'usd-brl', label: 'USD/BRL', flag: '🇺🇸🇧🇷', quoteCode: 'USD' },
  { id: 'eur-brl', label: 'EUR/BRL', flag: '🇪🇺🇧🇷', quoteCode: 'EUR' },
  { id: 'btc-brl', label: 'BTC/BRL', flag: '₿', quoteCode: 'BTC' },
  { id: 'eur-usd', label: 'EUR/USD', flag: '🇪🇺🇺🇸', quoteCode: 'EUR', crossTo: 'USD' },
];

function pctBadge(pct: number | null) {
  if (pct === null || !Number.isFinite(pct)) return null;
  const up = pct >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-bold font-mono ${
        up ? 'text-emerald-600' : 'text-rose-600'
      }`}
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      {up ? '+' : ''}
      {pct.toFixed(2)}%
    </span>
  );
}

export default function CurrencyFeaturedCard() {
  const { rates, currencies: exchangeCurrencies } = useExchangeRates();
  const [featured, setFeatured] = useState<FeaturedQuote[]>([]);
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);

  useEffect(() => {
    fetchFeaturedQuotes().then(setFeatured);
  }, []);

  const currencyOptions = useMemo(
    () => [buildCurrencyInfo('BRL'), ...exchangeCurrencies],
    [exchangeCurrencies],
  );

  const result = useMemo(
    () => converterMatrizMoedas(value, from, to, rates),
    [value, from, to, rates],
  );

  const unitRate = useMemo(
    () => converterMatrizMoedas(1, from, to, rates),
    [from, to, rates],
  );

  const featuredMap = useMemo(() => new Map(featured.map((q) => [q.code, q])), [featured]);

  const getPairDisplay = (pair: FeaturedPair) => {
    if (pair.crossTo) {
      const eur = rates.EUR;
      const usd = rates.USD;
      if (!eur || !usd) return { rate: null, pct: null };
      const crossRate = eur / usd;
      const eurPct = featuredMap.get('EUR')?.pctChange ?? null;
      const usdPct = featuredMap.get('USD')?.pctChange ?? null;
      const pct =
        eurPct !== null && usdPct !== null ? eurPct - usdPct : null;
      return { rate: crossRate, pct };
    }
    const quote = featuredMap.get(pair.quoteCode);
    const rate = quote?.rate ?? rates[pair.quoteCode];
    return { rate: rate ?? null, pct: quote?.pctChange ?? null };
  };

  const formatPairRate = (pair: FeaturedPair, rate: number) => {
    if (pair.crossTo) return rate.toFixed(4);
    if (pair.quoteCode === 'BTC') return formatRateBRL(rate, 'BTC');
    return formatRateBRL(rate, pair.quoteCode);
  };

  return (
    <section
      aria-labelledby="currency-featured-heading"
      className="w-full rounded-2xl md:rounded-[1.25rem] border border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_rgba(180,83,9,0.06)] overflow-hidden"
    >
      <div className="px-4 py-4 md:px-6 md:py-5 border-b border-amber-100/80">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100/80 text-amber-800 shrink-0">
            <Coins className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Ferramenta independente
            </p>
            <h2 id="currency-featured-heading" className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight mt-0.5">
              Conversor de Moedas
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Cotações em tempo real e conversão rápida — acesse a página completa para histórico e mais moedas.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Cotações rápidas */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-3">
            Principais pares
          </h3>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {FEATURED_PAIRS.map((pair) => {
              const { rate, pct } = getPairDisplay(pair);
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    if (pair.crossTo) {
                      setFrom(pair.quoteCode);
                      setTo(pair.crossTo);
                    } else {
                      setFrom(pair.quoteCode);
                      setTo('BRL');
                    }
                    setValue(1);
                  }}
                  className="snap-start shrink-0 w-[8.5rem] lg:w-auto text-left rounded-xl bg-white/80 border border-amber-100/90 p-3 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm" aria-hidden="true">{pair.flag}</span>
                    {pctBadge(pct)}
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 mt-1.5">{pair.label}</p>
                  <p className="font-mono text-sm font-extrabold text-slate-900 mt-0.5">
                    {rate ? formatPairRate(pair, rate) : '—'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversor compacto */}
        <div className="flex-1 min-w-0 lg:max-w-md lg:ml-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-3">
            Conversão rápida
          </h3>
          <div className="rounded-xl bg-white/80 border border-amber-100/90 p-4 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
              <CurrencySelect
                id="featured-de-moeda"
                label="De"
                value={from}
                onChange={setFrom}
                currencies={currencyOptions}
              />
              <button
                type="button"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="p-2 border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-500 rounded-xl transition-all self-center sm:self-end"
                aria-label="Inverter moedas"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <CurrencySelect
                id="featured-para-moeda"
                label="Para"
                value={to}
                onChange={setTo}
                currencies={currencyOptions}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold font-mono text-slate-500" aria-hidden="true">
                {from}
              </span>
              <input
                type="number"
                min={0}
                value={value || ''}
                onChange={(e) => setValue(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-amber-400"
                aria-label="Valor a converter"
              />
            </div>

            <div className="rounded-lg bg-amber-50/60 border border-amber-100 px-3 py-2.5 text-center">
              <p className="text-[10px] text-amber-800 font-semibold">
                1 {from} = {formatConvertedValue(unitRate, to)}
              </p>
              <p className="font-mono text-base font-extrabold text-[#704214] mt-0.5">
                {formatConvertedValue(result, to)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 md:px-6 border-t border-amber-100/80 bg-white/40 flex justify-end">
        <Link
          to={ROUTES.conversorMoedas}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
        >
          Acessar conversor
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
