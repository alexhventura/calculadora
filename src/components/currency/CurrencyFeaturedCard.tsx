import { useState, useMemo, useEffect, useCallback, type KeyboardEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Coins } from 'lucide-react';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { fetchFeaturedQuotes, type FeaturedQuote } from '../../utils/currency/currencyHistory';
import { converterMatrizMoedas } from '../../utils/finance';
import {
  QUOTE_TYPES,
  applyQuoteTypeToRates,
  adjustRateForQuoteType,
  type QuoteType,
} from '../../constants/quoteTypes';
import { formatConvertedValue, formatRateBRL } from '../../utils/formatExchange';
import { ROUTES } from '../../constants/routes';

const PREVIEW_CODES = ['USD', 'EUR', 'BTC'] as const;
const DEMO_FROM = 'USD';
const DEMO_TO = 'BRL';
const DEMO_AMOUNT = 1;

export default function CurrencyFeaturedCard() {
  const navigate = useNavigate();
  const { rates } = useExchangeRates();
  const [featured, setFeatured] = useState<FeaturedQuote[]>([]);
  const [quoteType, setQuoteType] = useState<QuoteType>('comercial');

  useEffect(() => {
    fetchFeaturedQuotes().then(setFeatured);
  }, []);

  const featuredMap = useMemo(() => new Map(featured.map((q) => [q.code, q])), [featured]);

  const asks = useMemo(() => {
    const map: Record<string, number | null> = {};
    for (const q of featured) map[q.code] = q.ask;
    return map;
  }, [featured]);

  const adjustedRates = useMemo(
    () => applyQuoteTypeToRates(rates, quoteType, asks),
    [rates, quoteType, asks],
  );

  const activeQuote = QUOTE_TYPES.find((q) => q.id === quoteType)!;

  const demoResult = useMemo(
    () => converterMatrizMoedas(DEMO_AMOUNT, DEMO_FROM, DEMO_TO, adjustedRates),
    [adjustedRates],
  );

  const previewRates = useMemo(
    () =>
      PREVIEW_CODES.map((code) => {
        const commercial = featuredMap.get(code)?.rate ?? rates[code];
        const ask = featuredMap.get(code)?.ask;
        return {
          code,
          value: commercial
            ? adjustRateForQuoteType(commercial, quoteType, ask)
            : null,
        };
      }),
    [featuredMap, rates, quoteType],
  );

  const goToConverter = useCallback(() => {
    navigate(ROUTES.conversorMoedas);
  }, [navigate]);

  const handleCardKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToConverter();
    }
  };

  const handleQuoteTypeClick = (e: MouseEvent, type: QuoteType) => {
    e.stopPropagation();
    e.preventDefault();
    setQuoteType(type);
  };

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label="Conversor de Moedas — clique para acessar a ferramenta completa"
      onClick={goToConverter}
      onKeyDown={handleCardKeyDown}
      className="group w-full rounded-2xl md:rounded-[1.25rem] bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-slate-50/60 hover:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_6px_20px_rgba(15,23,42,0.05)] transition-all duration-300 ease-out cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[#800020]/25 focus-visible:ring-offset-2"
    >
      <div className="p-4 md:p-5 lg:p-6 flex flex-col gap-4 md:gap-5">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0 group-hover:bg-slate-100/80 transition-colors">
              <Coins className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Ferramenta independente
              </p>
              <h2 className="font-semibold text-base md:text-lg text-slate-900 tracking-tight mt-0.5">
                Conversor de Moedas
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                Cotações atualizadas e conversão entre mais de 100 moedas. Acesse o conversor completo para histórico e simulações.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-[#800020] transition-colors shrink-0 self-start sm:self-center">
            Acessar
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </span>
        </div>

        {/* Seletor de tipo de cotação */}
        <div
          data-quote-selector
          className="flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tipo de cotação">
            {QUOTE_TYPES.map((type) => {
              const isActive = quoteType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={(e) => handleQuoteTypeClick(e, type.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-600">Cotação {activeQuote.label}:</span>{' '}
            {activeQuote.hint}
            {quoteType === 'paralelo' && (
              <span className="text-slate-400"> (estimativa indicativa)</span>
            )}
          </p>
        </div>

        {/* Cotações + exemplo */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-1 border-t border-slate-100">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-0.5 -mx-1 px-1">
            {previewRates.map(({ code, value }) => (
              <div key={code} className="shrink-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{code}/BRL</p>
                <p className="font-mono text-sm font-bold text-slate-800 mt-0.5">
                  {value ? formatRateBRL(value, code) : '—'}
                </p>
              </div>
            ))}
          </div>

          <div className="shrink-0 md:text-right">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Exemplo</p>
            <p className="text-sm text-slate-700 mt-0.5">
              <span className="font-mono font-bold text-slate-900">
                {DEMO_AMOUNT} {DEMO_FROM} = {formatConvertedValue(demoResult, DEMO_TO)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
