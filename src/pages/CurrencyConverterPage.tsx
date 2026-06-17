import { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import SkipLink from '../components/layout/SkipLink';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import CurrencyConverterPanel from '../components/currency/CurrencyConverterPanel';
import CurrencyRateChart from '../components/currency/CurrencyRateChart';
import { AdSlotTop, AdSlotFooter } from '../components/monetization';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { useCurrencyHistory, type HistoryPeriod } from '../hooks/useCurrencyHistory';
import { converterMatrizMoedas } from '../utils/finance';
import {
  buildCurrencyInfo,
  DEFAULT_FROM,
  DEFAULT_TO,
  POPULAR_CODES,
  QUICK_CONVERT_AMOUNTS,
  getCurrencyName,
} from '../constants/currencies';
import { formatConvertedValue, formatExchangeTimestamp, formatRateBRL } from '../utils/formatExchange';
import { conversorMoedasContent } from '../content/tools/conversor-moedas';
import { ROUTES } from '../constants/routes';
import { SITE_URL, SITE_DOMAIN } from '../constants/site';

const ToolSeoContent = lazy(() => import('../components/content/ToolSeoContent'));

const PERIOD_LABELS: Record<HistoryPeriod, string> = {
  30: '30 dias',
  180: '6 meses',
  365: '1 ano',
};

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

export default function CurrencyConverterPage() {
  const {
    rates,
    currencies: exchangeCurrencies,
    status,
    lastUpdated,
    sourceDate,
    refresh,
    loading,
  } = useExchangeRates();

  const [value, setValue] = useState(100);
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);

  const currencyOptions = useMemo(
    () => [buildCurrencyInfo('BRL'), ...exchangeCurrencies],
    [exchangeCurrencies],
  );

  const result = useMemo(
    () => converterMatrizMoedas(value, from, to, rates),
    [value, from, to, rates],
  );

  const chartCode = from === 'BRL' ? to : from;
  const chartRate = rates[chartCode] ?? 0;

  const {
    featured,
    history,
    period,
    setPeriod,
    comparison,
    loadingFeatured,
    loadingHistory,
    hasHistory,
  } = useCurrencyHistory(chartCode, chartRate);

  const featuredMap = useMemo(() => {
    const map = new Map(featured.map((q) => [q.code, q]));
    for (const code of POPULAR_CODES) {
      if (!map.has(code) && rates[code]) {
        map.set(code, { code, rate: rates[code], ask: null, pctChange: null, high: null, low: null });
      }
    }
    return map;
  }, [featured, rates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const content = conversorMoedasContent;
  const canonicalPath = ROUTES.conversorMoedas;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-950 overflow-x-hidden">
      <PageMeta
        title={content.metaTitle}
        description={content.metaDescription}
        canonical={`${SITE_URL}${canonicalPath}`}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: ROUTES.home },
          { name: content.h1 },
        ]}
        faq={content.faq}
        webApplication={{
          name: content.h1,
          description: content.metaDescription,
          url: `${SITE_URL}${canonicalPath}`,
        }}
      />
      <SkipLink />

      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 shadow-xs"
        role="banner"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to={ROUTES.home} className="flex items-center gap-2.5" aria-label={`${SITE_DOMAIN} — Início`}>
            <div className="w-9 h-9 rounded-full bg-[#800020] flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-base">%</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                calculo<span className="text-[#800020]">juroscompostos</span>.com.br
              </span>
              <span className="text-[10px] font-semibold text-slate-500 block -mt-1 tracking-wider uppercase">
                Conversor de Moedas
              </span>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <Link to={ROUTES.home} className="hover:text-[#800020] transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              Calculadoras
            </Link>
            <span className="text-amber-700 font-bold" aria-current="page">
              Conversor
            </span>
          </nav>
        </div>
      </header>

      <AdSlotTop />

      <main id="conteudo-principal" className="max-w-7xl mx-auto w-full min-w-0 px-4 md:px-8 lg:px-12 py-8 flex-1 flex flex-col gap-8">
        <Breadcrumbs items={[{ label: 'Início', href: ROUTES.home }, { label: 'Conversor de Moedas' }]} />

        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
              <Coins className="w-5 h-5" aria-hidden="true" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Ferramenta independente</p>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">{content.h1}</h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">{content.intro}</p>
        </header>

        {/* Cotações do dia */}
        <section aria-labelledby="cotacoes-heading" className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 id="cotacoes-heading" className="text-base font-bold text-slate-900">
              Cotações do dia
            </h2>
            <button
              type="button"
              onClick={() => refresh(true)}
              disabled={loading}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-amber-700 transition-colors disabled:opacity-50"
              aria-label="Atualizar cotações"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {POPULAR_CODES.map((code) => {
              const quote = featuredMap.get(code);
              const rate = quote?.rate ?? rates[code];
              if (!rate) return null;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setFrom(code);
                    setTo('BRL');
                  }}
                  className="text-left bg-white rounded-xl border border-slate-200/80 p-3 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-800">{code}</span>
                    {pctBadge(quote?.pctChange ?? null)}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{getCurrencyName(code)}</p>
                  <p className="font-mono text-sm font-extrabold text-slate-900 mt-1.5">
                    {formatRateBRL(rate, code)}
                  </p>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500">
            {lastUpdated ? (
              <>Atualizado em {formatExchangeTimestamp(lastUpdated)}.</>
            ) : status === 'loading' ? (
              'Carregando cotações…'
            ) : (
              'Cotações de referência.'
            )}
            {sourceDate ? ` Referência: ${sourceDate}.` : null}
          </p>
        </section>

        {/* Workspace principal */}
        <div className="rounded-2xl md:rounded-[1.25rem] bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_rgba(15,23,42,0.04)] overflow-hidden">
          <header className="flex items-start gap-3 px-4 py-4 md:px-6 md:py-5 bg-amber-50/60 border-b border-amber-100/80">
            <div className="p-2 rounded-lg bg-amber-100/80 text-amber-800 shrink-0">
              <Coins className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-semibold text-base md:text-lg text-slate-900 tracking-tight">Conversor</h2>
              <p className="text-xs text-slate-500 mt-1">Converta entre mais de 100 moedas, cripto e metais.</p>
            </div>
          </header>

          <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CurrencyConverterPanel
              value={value}
              onValueChange={setValue}
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
              onSwap={swap}
              result={result}
              currencies={currencyOptions}
            />

            <div className="flex flex-col gap-6">
              {/* Conversões rápidas */}
              <section aria-labelledby="quick-convert-heading">
                <h3 id="quick-convert-heading" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Conversões rápidas
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_CONVERT_AMOUNTS.map((amount) => {
                    const converted = converterMatrizMoedas(amount, from, to, rates);
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setValue(amount)}
                        className="text-left p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all"
                      >
                        <span className="text-[10px] font-mono text-slate-500">
                          {amount.toLocaleString('pt-BR')} {from}
                        </span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">
                          {formatConvertedValue(converted, to)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Moedas populares */}
              <section aria-labelledby="popular-heading">
                <h3 id="popular-heading" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Moedas mais consultadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_CODES.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setFrom(code);
                        setTo('BRL');
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        from === code
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Histórico e comparação */}
        {hasHistory && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section
              aria-labelledby="chart-heading"
              className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 id="chart-heading" className="text-base font-bold text-slate-900">
                  Histórico {chartCode}/BRL
                </h2>
                <div className="flex gap-1" role="group" aria-label="Período do gráfico">
                  {([30, 180, 365] as HistoryPeriod[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        period === p
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      {PERIOD_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>
              <CurrencyRateChart data={history} code={chartCode} loading={loadingHistory || loadingFeatured} />
            </section>

            <section
              aria-labelledby="comparison-heading"
              className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs"
            >
              <h2 id="comparison-heading" className="text-base font-bold text-slate-900 mb-4">
                Comparação histórica — {chartCode}
              </h2>
              {comparison ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left py-2 text-xs font-semibold text-slate-500">Período</th>
                        <th className="text-right py-2 text-xs font-semibold text-slate-500">Cotação</th>
                        <th className="text-right py-2 text-xs font-semibold text-slate-500">Variação</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-xs">
                      <tr className="border-b border-slate-50">
                        <td className="py-3 font-sans font-medium text-slate-700">Hoje</td>
                        <td className="py-3 text-right font-bold text-slate-900">
                          {formatRateBRL(comparison.today, chartCode)}
                        </td>
                        <td className="py-3 text-right text-slate-400">—</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-3 font-sans font-medium text-slate-700">30 dias atrás</td>
                        <td className="py-3 text-right text-slate-800">
                          {comparison.days30 ? formatRateBRL(comparison.days30, chartCode) : '—'}
                        </td>
                        <td className="py-3 text-right">{pctBadge(comparison.change30d)}</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-3 font-sans font-medium text-slate-700">6 meses atrás</td>
                        <td className="py-3 text-right text-slate-800">
                          {comparison.months6 ? formatRateBRL(comparison.months6, chartCode) : '—'}
                        </td>
                        <td className="py-3 text-right">{pctBadge(comparison.change6m)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-sans font-medium text-slate-700">1 ano atrás</td>
                        <td className="py-3 text-right text-slate-800">
                          {comparison.year1 ? formatRateBRL(comparison.year1, chartCode) : '—'}
                        </td>
                        <td className="py-3 text-right">{pctBadge(comparison.change1y)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Carregando comparação…</p>
              )}
            </section>
          </div>
        )}

        {/* Link para calculadoras — separação clara */}
        <aside className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Simulações financeiras</p>
            <p className="text-sm text-slate-600 mt-1">
              Para juros compostos, CLT vs PJ e aposentadoria, use nossas calculadoras dedicadas.
            </p>
          </div>
          <Link
            to={ROUTES.home}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#800020] text-white text-xs font-bold hover:bg-[#600018] transition-colors shrink-0"
          >
            Ver calculadoras
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </aside>

        <Suspense fallback={null}>
          <ToolSeoContent content={content} />
        </Suspense>
      </main>

      <AdSlotFooter />

      <footer
        className="bg-slate-900 text-slate-300 py-10 px-6 md:px-12 border-t border-slate-800 text-xs text-center"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-4">
          <p className="text-[11px] text-slate-400 max-w-2xl">
            Cotações indicativas. Não constitui oferta de câmbio ou recomendação de investimento.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">© 2026 {SITE_DOMAIN}</div>
        </div>
      </footer>
    </div>
  );
}
