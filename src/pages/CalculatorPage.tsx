import { useState, useMemo, lazy, Suspense, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Percent, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Coins, 
  HelpCircle, 
  ArrowRightLeft, 
  Calculator, 
  ChevronRight, 
  RotateCcw,
  Info,
  Briefcase,
  Calendar,
  Scale
} from 'lucide-react';
import { TempoUnidade, TaxaTipo } from '../types';
import { 
  converterMatrizMoedas, 
  calcularTaxaPoupancaVal,
  convertAnualParaMensal,
  convertMensalParaAnual
} from '../utils/finance';
import { AdSlotTop, AdSlotFooter, AdSlotSidebar, AdSlotInline } from '../components/monetization';
import SkipLink from '../components/layout/SkipLink';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
const ToolSeoContent = lazy(() => import('../components/content/ToolSeoContent'));
import { getToolContent, type SeoVariant } from '../content/tools';
import { SLUG_TO_TOOL, toolPath, ROUTES } from '../constants/routes';
import { SITE_URL, SITE_DOMAIN } from '../constants/site';
import type { ActiveTool } from '../utils/calculations/toolCalculations';
import { formatMilhar, parseMilhar, formatBRL } from '../utils/format';
import { useEconomicRates } from '../hooks/useEconomicRates';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { calculateToolResult } from '../utils/calculations/toolCalculations';
import CurrencySelect from '../components/CurrencySelect';
import { buildCurrencyInfo, DEFAULT_FROM, DEFAULT_TO, PLACAR_CODES } from '../constants/currencies';
import { formatConvertedValue, formatExchangeTimestamp, formatRateBRL } from '../utils/formatExchange';

const EvolucaoChart = lazy(() => import('../components/EvolucaoChart'));
const TabelaMensal = lazy(() => import('../components/TabelaMensal'));

const TOOL_SELECTOR_META: Record<
  ActiveTool,
  { bentoId: string; Icon: typeof Calculator; title: string; description: string }
> = {
  juros: {
    bentoId: 'bento_juros',
    Icon: Calculator,
    title: 'Juros Compostos',
    description: 'Crescimento de patrimônio a longo prazo com taxas e IPCA real.',
  },
  'clt-pj': {
    bentoId: 'bento_clt_pj',
    Icon: Briefcase,
    title: 'CLT vs PJ Analítico',
    description: 'Custo-benefício real e faturamento equivalente Simples Nacional.',
  },
  rescisao: {
    bentoId: 'bento_rescisao',
    Icon: Scale,
    title: 'Rescisão Trabalhista',
    description: 'Cálculo preciso de verbas rescisórias, saldo, férias e FGTS.',
  },
  aposentadoria: {
    bentoId: 'bento_aposentadoria',
    Icon: Calendar,
    title: 'Previdência & Aposentadoria',
    description: 'Projeção INSS, teto progressivo e aportes para renda desejada.',
  },
};

/** Superfície compartilhada entre card ativo no seletor e área de campos da calculadora */
const ACTIVE_WORKSPACE_SURFACE = 'bg-slate-50/70 border-slate-200/60';

const TOOL_SELECTOR_ORDER: ActiveTool[] = ['juros', 'clt-pj', 'rescisao', 'aposentadoria'];

function ChartFallback() {
  return (
    <div
      className="w-full min-h-[320px] bg-white rounded-2xl border border-slate-100 p-6 animate-pulse"
      aria-hidden="true"
    />
  );
}

export default function CalculatorPage({
  initialTool,
  seoVariant,
  initialTaxaTipo,
}: {
  initialTool?: ActiveTool;
  seoVariant?: SeoVariant;
  initialTaxaTipo?: TaxaTipo;
}) {
  const { ratesStatus, selicRate, ipcaRate } = useEconomicRates();
  const {
    rates: cotasBRL,
    currencies: exchangeCurrencies,
    status: exchangeStatus,
    lastUpdated: exchangeLastUpdated,
    sourceDate: exchangeSourceDate,
  } = useExchangeRates();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();

  // --- Estados da Calculadora (com máscaras brasileiras) ---
  const [valorInicialStr, setValorInicialStr] = useState<string>('0');
  const [aporteMensalStr, setAporteMensalStr] = useState<string>('0');
  const [tempo, setTempo] = useState<number>(0);
  const [tempoUnidade, setTempoUnidade] = useState<TempoUnidade>('anos');
  const [taxaAnual, setTaxaAnual] = useState<number>(0);
  const [taxaTipo, setTaxaTipo] = useState<TaxaTipo>('manual');
  const [taxaPeriodo, setTaxaPeriodo] = useState<'anual' | 'mensal'>('anual');

  // --- Estado da Ferramenta Ativa (Bento UI) ---
  const [activeTool, setActiveTool] = useState<ActiveTool>(initialTool ?? 'juros');

  // --- Estados do Comparativo CLT vs PJ ---
  const [salarioCltStr, setSalarioCltStr] = useState<string>('8.000');
  const [cltVrStr, setCltVrStr] = useState<string>('1.000');
  const [cltSaudeStr, setCltSaudeStr] = useState<string>('650');
  const [cltOutrosStr, setCltOutrosStr] = useState<string>('400');
  const [faturamentoPjStr, setFaturamentoPjStr] = useState<string>('12.000');

  // --- Estados do Plano de Aposentadoria ---
  const [aposentadoriaIdadeAtual, setAposentadoriaIdadeAtual] = useState<number>(30);
  const [aposentadoriaIdadeAlvo, setAposentadoriaIdadeAlvo] = useState<number>(65);
  const [aposentadoriaSalarioAtualStr, setAposentadoriaSalarioAtualStr] = useState<string>('8.000');
  const [aposentadoriaRendaDesejadaStr, setAposentadoriaRendaDesejadaStr] = useState<string>('10.000');
  const [aposentadoriaPatrimonioAtualStr, setAposentadoriaPatrimonioAtualStr] = useState<string>('50.000');

  // --- Estados do Cálculo de Rescisão ---
  const [rescisaoSalarioStr, setRescisaoSalarioStr] = useState<string>('5.000');
  const [rescisaoMesesTrabalhados, setRescisaoMesesTrabalhados] = useState<number>(12);
  const [rescisaoMotivo, setRescisaoMotivo] = useState<'sem_justa' | 'com_justa' | 'pedido_demissao' | 'acordo'>('sem_justa');
  const [rescisaoDiasTrabalhados, setRescisaoDiasTrabalhados] = useState<number>(30);

  // --- Estados do Conversor de Moedas (Matriz Cruzada Global Completa) ---
  const [conversorValor, setConversorValor] = useState<number>(0);
  const [deMoeda, setDeMoeda] = useState<string>(DEFAULT_FROM);
  const [paraMoeda, setParaMoeda] = useState<string>(DEFAULT_TO);

  const currencyOptions = useMemo(
    () => [buildCurrencyInfo('BRL'), ...exchangeCurrencies],
    [exchangeCurrencies],
  );

  const goldRate = cotasBRL.XAU ?? 12900;

  const navigateToTool = useCallback((tool: ActiveTool) => {
    setActiveTool(tool);
    navigate(toolPath(tool));
  }, [navigate]);

  const activeToolMeta = TOOL_SELECTOR_META[activeTool];
  const ActiveToolIcon = activeToolMeta.Icon;

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
      return;
    }
    if (slug && SLUG_TO_TOOL[slug]) {
      setActiveTool(SLUG_TO_TOOL[slug]);
    }
  }, [slug, initialTool]);

  const toolContent = useMemo(() => getToolContent(activeTool, seoVariant), [activeTool, seoVariant]);

  const canonicalPath = useMemo(() => {
    if (seoVariant === 'cdi') return ROUTES.calculadoraCdi;
    if (seoVariant === 'ipca') return ROUTES.calculadoraIpca;
    if (location.pathname === ROUTES.home) return ROUTES.home;
    return toolPath(activeTool);
  }, [seoVariant, location.pathname, activeTool]);

  // Preço do Ouro por grama (1 Oz troy = 31.1034768g)
  const goldPriceGram = useMemo(() => {
    return goldRate / 31.1034768;
  }, [goldRate]);

  // --- Sincronização e limpeza de inputs de numeração financeira ---
  const valorInicialNum = useMemo(() => parseMilhar(valorInicialStr), [valorInicialStr]);
  const aporteMensalNum = useMemo(() => parseMilhar(aporteMensalStr), [aporteMensalStr]);

  const salarioCltNum = useMemo(() => parseMilhar(salarioCltStr), [salarioCltStr]);
  const cltVrNum = useMemo(() => parseMilhar(cltVrStr), [cltVrStr]);
  const cltSaudeNum = useMemo(() => parseMilhar(cltSaudeStr), [cltSaudeStr]);
  const cltOutrosNum = useMemo(() => parseMilhar(cltOutrosStr), [cltOutrosStr]);
  const faturamentoPjNum = useMemo(() => parseMilhar(faturamentoPjStr), [faturamentoPjStr]);

  const aposentadoriaSalarioAtualNum = useMemo(() => parseMilhar(aposentadoriaSalarioAtualStr), [aposentadoriaSalarioAtualStr]);
  const aposentadoriaRendaDesejadaNum = useMemo(() => parseMilhar(aposentadoriaRendaDesejadaStr), [aposentadoriaRendaDesejadaStr]);
  const aposentadoriaPatrimonioAtualNum = useMemo(() => parseMilhar(aposentadoriaPatrimonioAtualStr), [aposentadoriaPatrimonioAtualStr]);

  const rescisaoSalarioNum = useMemo(() => parseMilhar(rescisaoSalarioStr), [rescisaoSalarioStr]);

  const calculoResultado = useMemo(
    () =>
      calculateToolResult({
        activeTool,
        valorInicialNum,
        aporteMensalNum,
        tempo,
        tempoUnidade,
        taxaAnual,
        taxaPeriodo,
        selicRate,
        ipcaRate,
        salarioCltNum,
        cltVrNum,
        cltSaudeNum,
        cltOutrosNum,
        aposentadoriaIdadeAtual,
        aposentadoriaIdadeAlvo,
        aposentadoriaRendaDesejadaNum,
        aposentadoriaPatrimonioAtualNum,
        rescisaoSalarioNum,
        rescisaoMesesTrabalhados,
        rescisaoMotivo,
        rescisaoDiasTrabalhados,
      }),
    [
      activeTool,
      valorInicialNum,
      aporteMensalNum,
      tempo,
      tempoUnidade,
      taxaAnual,
      taxaPeriodo,
      selicRate,
      ipcaRate,
      salarioCltNum,
      cltVrNum,
      cltSaudeNum,
      cltOutrosNum,
      aposentadoriaIdadeAtual,
      aposentadoriaIdadeAlvo,
      aposentadoriaRendaDesejadaNum,
      aposentadoriaPatrimonioAtualNum,
      rescisaoSalarioNum,
      rescisaoMesesTrabalhados,
      rescisaoMotivo,
      rescisaoDiasTrabalhados,
    ],
  );

  // Registros e Totais mapeados de acordo com a ferramenta ativa (Retrocompatibilidade)
  const registros = useMemo(() => {
    return activeTool === 'juros' ? calculoResultado.registros : [];
  }, [activeTool, calculoResultado.registros]);

  const totais = useMemo(() => {
    return calculoResultado.totais;
  }, [calculoResultado.totais]);

  // Safe extractions for tool-specific values to prevent typescript compiler errors
  const cltData = activeTool === 'clt-pj' ? (calculoResultado as any).clt : null;
  const pjData = activeTool === 'clt-pj' ? (calculoResultado as any).pj : null;
  const cltPjExtra = activeTool === 'clt-pj' ? {
    vantagemMensal: (calculoResultado as any).vantagemMensal,
    vantagemAnual: (calculoResultado as any).vantagemAnual,
    melhorCenario: (calculoResultado as any).melhorCenario,
    vantagemPercentual: (calculoResultado as any).vantagemPercentual,
  } : null;

  const aposentadoriaData = activeTool === 'aposentadoria' ? (calculoResultado as any) : null;
  const rescisaoData = activeTool === 'rescisao' ? (calculoResultado as any) : null;

  // --- Conversão de Moedas Reativa com a Matriz Bidirecional Completa ---
  const conversorResultado = useMemo(() => {
    return converterMatrizMoedas(conversorValor, deMoeda, paraMoeda, cotasBRL);
  }, [conversorValor, deMoeda, paraMoeda, cotasBRL]);

  // --- Manipuladores de Mudança do Seletor de Juros ---
  const handleTaxaTipoChange = (tipo: TaxaTipo) => {
    setTaxaTipo(tipo);
    if (tipo === 'poupanca') {
      const poupRendimento = calcularTaxaPoupancaVal(selicRate);
      setTaxaAnual(taxaPeriodo === 'anual' ? poupRendimento : convertAnualParaMensal(poupRendimento));
    } else if (tipo === 'selic') {
      setTaxaAnual(taxaPeriodo === 'anual' ? selicRate : convertAnualParaMensal(selicRate));
    } else if (tipo === 'cdi') {
      const cdiRendimento = Math.max(0, selicRate - 0.10);
      setTaxaAnual(taxaPeriodo === 'anual' ? cdiRendimento : convertAnualParaMensal(cdiRendimento));
    }
  };

  useEffect(() => {
    if (!initialTaxaTipo || initialTaxaTipo === 'manual' || ratesStatus === 'loading') return;
    handleTaxaTipoChange(initialTaxaTipo);
  }, [initialTaxaTipo, ratesStatus, selicRate]);

  const handleTaxaPeriodoChange = (novoPeriodo: 'anual' | 'mensal') => {
    if (novoPeriodo === taxaPeriodo) return;
    setTaxaPeriodo(novoPeriodo);
    
    // Se o tipo já for poupanca, selic ou cdi, atualiza o valor da taxa baseado no novo período
    if (taxaTipo === 'poupanca') {
      const poup = calcularTaxaPoupancaVal(selicRate);
      setTaxaAnual(novoPeriodo === 'anual' ? poup : convertAnualParaMensal(poup));
    } else if (taxaTipo === 'selic') {
      setTaxaAnual(novoPeriodo === 'anual' ? selicRate : convertAnualParaMensal(selicRate));
    } else if (taxaTipo === 'cdi') {
      const cdi = Math.max(0, selicRate - 0.10);
      setTaxaAnual(novoPeriodo === 'anual' ? cdi : convertAnualParaMensal(cdi));
    } else {
      // Se for manual, converte o valor atual
      if (novoPeriodo === 'mensal') {
        setTaxaAnual(convertAnualParaMensal(taxaAnual));
      } else {
        setTaxaAnual(convertMensalParaAnual(taxaAnual));
      }
    }
  };

  const handleTaxaAnualChange = (val: number) => {
    setTaxaAnual(val);
    setTaxaTipo('manual'); // Transiciona para manual caso o usuário mude o número manualmente
  };

  // --- Resetar Campos ---
  const handleReset = () => {
    setValorInicialStr('0');
    setAporteMensalStr('0');
    setTempo(0);
    setTempoUnidade('anos');
    setTaxaAnual(0);
    setTaxaTipo('manual');
    setTaxaPeriodo('anual');
    setConversorValor(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-950 overflow-x-hidden">
      <PageMeta
        title={toolContent.metaTitle}
        description={toolContent.metaDescription}
        canonical={`${SITE_URL}${canonicalPath}`}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: '/' },
          { name: toolContent.h1 },
        ]}
        faq={toolContent.faq}
        webApplication={{
          name: toolContent.h1,
          description: toolContent.metaDescription,
          url: `${SITE_URL}${canonicalPath}`,
        }}
      />
      <SkipLink />
      {/* 1. Header Fixo & Identidade Refinada - Header Ultra-Foco */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center shadow-xs" role="banner">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Símbolo da Marca */}
          <div className="flex items-center gap-2.5" aria-label={`${SITE_DOMAIN} — Finanças Inteligentes`}>
            <div className="w-9 h-9 rounded-full bg-[#800020] flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-base">%</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                calculo<span className="text-[#800020]">juroscompostos</span>.com.br
              </span>
              <span className="text-[10px] font-semibold text-slate-500 block -mt-1 tracking-wider uppercase font-sans">Finanças Inteligentes</span>
            </div>
          </div>

          {/* Painel compact real-time cotações do dia */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl sm:rounded-full select-none justify-center w-full sm:w-auto min-w-0 overflow-hidden" role="status" aria-live="polite" aria-label="Cotações do dia">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${ratesStatus === 'loading' ? 'bg-blue-400 animate-pulse' : ratesStatus === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-xs text-slate-600 font-medium text-center min-w-0">
              <span className="whitespace-nowrap">
                Dólar: <span className="font-extrabold text-slate-900">R$ {(cotasBRL.USD ?? 0).toFixed(2)}</span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="whitespace-nowrap">
                Bitcoin: <span className="font-extrabold text-slate-900">R$ {Math.round(cotasBRL.BTC ?? 0).toLocaleString('pt-BR')}</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="whitespace-nowrap hidden md:inline">
                Ouro: <span className="font-extrabold text-slate-900">R$ {goldPriceGram.toFixed(2)}/g</span>
              </span>
            </div>
          </div>

        </div>
      </header>

      <AdSlotTop />

      {/* 3. Área Principal do Conteúdo */}
      <main id="conteudo-principal" className="max-w-7xl mx-auto w-full min-w-0 px-4 md:px-8 lg:px-12 py-8 flex-1 flex flex-col gap-8">
        <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: toolContent.h1 }]} />
        <h1 className="sr-only">{toolContent.h1}</h1>
        {/* ÁREA 1: Navegação — seleção de calculadoras (separada do conteúdo ativo) */}
        <section className="w-full flex flex-col gap-4" aria-labelledby="tool-selector-heading">
          <div className="flex flex-col gap-1">
            <h2 id="tool-selector-heading" className="text-xl font-extrabold tracking-tight text-slate-900">
              Seletor de Ferramenta Financeira
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Escolha abaixo qual calculadora deseja utilizar. O conteúdo aparecerá na área destacada em seguida.
            </p>
          </div>

          <div
            id="bento-selector"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs"
            role="group"
            aria-label="Seletor de ferramentas financeiras"
          >
            {TOOL_SELECTOR_ORDER.map((tool) => {
              const meta = TOOL_SELECTOR_META[tool];
              const Icon = meta.Icon;
              const isActive = activeTool === tool;

              return (
                <button
                  key={tool}
                  id={meta.bentoId}
                  type="button"
                  aria-pressed={isActive}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => navigateToTool(tool)}
                  className={`flex flex-col text-left rounded-2xl transition-all cursor-pointer relative overflow-hidden select-none h-full touch-target sm:min-h-0 min-h-[4.5rem] p-1.5 ${
                    isActive
                      ? `${ACTIVE_WORKSPACE_SURFACE} border-2 ring-2 ring-[#800020]/20 shadow-sm z-[1]`
                      : 'border-2 border-transparent hover:bg-slate-50/40'
                  }`}
                >
                  <div
                    className={`flex flex-col flex-1 h-full justify-between gap-3 p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-white border-slate-200/60 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive ? 'bg-rose-50 text-[#800020]' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#800020]"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">{meta.title}</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{meta.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Separador visual entre navegação e área ativa */}
        <div className="relative py-1 md:py-2" aria-hidden="true">
          <div className="border-t border-dashed border-slate-300/80" />
        </div>

        {/* ÁREA 2: Container da calculadora ativa — agrupa card, formulário, resultados e gráficos */}
        <div
          id="active-calculator-workspace"
          role="region"
          aria-labelledby="active-tool-heading"
          className="rounded-2xl md:rounded-3xl bg-white border border-[#800020]/20 shadow-lg shadow-[#800020]/5 ring-1 ring-[#800020]/10 overflow-hidden scroll-mt-28"
        >
          {/* Barra de contexto fixa — mantém identificação ao rolar (mobile/tablet/desktop) */}
          <div className="sticky top-[4.25rem] z-30 flex items-center gap-3 px-4 py-3 md:px-8 md:py-4 bg-white/95 backdrop-blur-md border-b border-[#800020]/10">
            <div className="p-2 rounded-xl bg-rose-50 text-[#800020] shrink-0">
              <ActiveToolIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] block">
                Calculadora ativa
              </span>
              <p id="active-tool-heading" className="font-extrabold text-sm md:text-base text-slate-900 truncate">
                {activeToolMeta.title}
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-rose-50 border border-[#800020]/15 text-[10px] font-bold uppercase tracking-wide text-[#800020] shrink-0">
              Em uso
            </span>
          </div>

          {/* Card da calculadora selecionada — âncora visual do contexto */}
          <div className="px-4 pt-5 md:px-8 md:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-rose-50/90 via-rose-50/40 to-white border border-[#800020]/15 shadow-xs">
              <div className="p-3 rounded-xl bg-white border border-[#800020]/10 text-[#800020] shrink-0 self-start sm:self-center shadow-xs">
                <ActiveToolIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h3 className="font-extrabold text-base md:text-lg text-slate-900 tracking-tight">
                  {activeToolMeta.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                  {activeToolMeta.description}
                </p>
              </div>
              <span className="sm:hidden inline-flex self-start items-center px-2.5 py-1 rounded-full bg-[#800020] text-[10px] font-bold uppercase tracking-wide text-white shrink-0">
                Em uso
              </span>
            </div>
          </div>

          {/* Conteúdo operacional: formulário, resultados, gráficos e tabelas */}
          <div className="px-4 pb-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10 pt-4 md:pt-5">
            <div className={`rounded-2xl ${ACTIVE_WORKSPACE_SURFACE} border p-4 md:p-6 lg:p-8`}>
              <p className="sr-only">
                Área de trabalho da calculadora {activeToolMeta.title}. Inclui campos de entrada, resultados, gráficos e tabelas.
              </p>

        {/* Layout Altamente Flexível e Ordenável: Mobile-First Sequencial vs Desktop Grid */}
        <div
          id={`tool-panel-${activeTool}`}
          className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8 min-w-0"
        >
          
          {/* LADO ESQUERDO (Width: 1/4) */}
          
          {/* CARD 1: FORMULÁRIO SELECIONADO DA FERRAMENTA ATIVA */}
          <div className="order-1 lg:col-span-1 lg:col-start-1 lg:row-start-1 h-fit bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-5 relative overflow-hidden">
              
              {/* Decoration Line Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#800020]"></div>

              {activeTool === 'juros' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h2 className="font-bold text-slate-900 text-md flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#800020]" />
                      Simulador Juros
                    </h2>
                    <button 
                      type="button" 
                      onClick={handleReset}
                      className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                      title="Reiniciar Simulação"
                      aria-label="Reiniciar simulação"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Campo: Valor Inicial */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="valor-inicial" className="text-xs font-semibold text-slate-700 flex justify-between">
                      <span>Valor Inicial (R$)</span>
                      <span className="font-mono text-slate-500 text-[11px]">Aporte único</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold" aria-hidden="true">R$</span>
                      <input
                        id="valor-inicial"
                        type="text"
                        inputMode="numeric"
                        value={valorInicialStr}
                        onChange={(e) => {
                          const masked = formatMilhar(e.target.value);
                          setValorInicialStr(masked);
                        }}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="0"
                      />
                    </div>
                    <input
                      id="valor-inicial-range"
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={valorInicialNum}
                      onChange={(e) => setValorInicialStr(formatMilhar(e.target.value))}
                      aria-label="Ajustar valor inicial"
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020] mt-1"
                    />
                  </div>

                  {/* Campo: Aporte Mensal */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aporte-mensal" className="text-xs font-semibold text-slate-700 flex justify-between">
                      <span>Aporte Mensal (R$)</span>
                      <span className="font-mono text-slate-500 text-[11px]">Todo mês</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold" aria-hidden="true">R$</span>
                      <input
                        id="aporte-mensal"
                        type="text"
                        inputMode="numeric"
                        value={aporteMensalStr}
                        onChange={(e) => {
                          const masked = formatMilhar(e.target.value);
                          setAporteMensalStr(masked);
                        }}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="0"
                      />
                    </div>
                    <input
                      id="aporte-mensal-range"
                      type="range"
                      min="0"
                      max="20000"
                      step="100"
                      value={aporteMensalNum}
                      onChange={(e) => setAporteMensalStr(formatMilhar(e.target.value))}
                      aria-label="Ajustar aporte mensal"
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020] mt-1"
                    />
                  </div>

                  {/* Campo: Tempo (Anos/Meses) */}
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-3 flex flex-col gap-1.5">
                      <label htmlFor="tempo-periodo" className="text-xs font-semibold text-slate-700">Período</label>
                      <input
                        id="tempo-periodo"
                        type="number"
                        value={tempo || ''}
                        onChange={(e) => setTempo(Math.min(600, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="10"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <label htmlFor="tempo-unidade" className="text-xs font-semibold text-slate-700">Unidade</label>
                      <select
                        id="tempo-unidade"
                        value={tempoUnidade}
                        onChange={(e) => setTempoUnidade(e.target.value as TempoUnidade)}
                        className="w-full py-2 px-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl focus:outline-hidden focus:border-[#800020] cursor-pointer"
                      >
                        <option value="anos">Anos</option>
                        <option value="meses">Meses</option>
                      </select>
                    </div>
                  </div>

                  {/* Seletor do Período da Taxa (Mensal vs Anual) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex justify-between">
                      <span>Capitalização da Taxa</span>
                      <span className="text-[10px] text-slate-500 font-mono">Regra de Cálculo</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/70 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => handleTaxaPeriodoChange('anual')}
                        className={`text-[10px] py-1 font-bold rounded-lg transition-all cursor-pointer text-center ${
                          taxaPeriodo === 'anual'
                            ? 'bg-white text-[#800020] shadow-xs'
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        Ao Ano (% a.a.)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTaxaPeriodoChange('mensal')}
                        className={`text-[10px] py-1 font-bold rounded-lg transition-all cursor-pointer text-center ${
                          taxaPeriodo === 'mensal'
                            ? 'bg-white text-[#800020] shadow-xs'
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        Ao Mês (% a.m.)
                      </button>
                    </div>
                  </div>

                  {/* Seletor Rápido de Taxa de Juros (Live Rates) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex justify-between">
                      <span>Taxa de Juros ({taxaPeriodo === 'anual' ? 'Anual' : 'Mensal'})</span>
                      <span className="text-[10px] text-slate-500 font-mono">Taxas 2026</span>
                    </label>
                    
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <button
                        type="button"
                        onClick={() => handleTaxaTipoChange('manual')}
                        className={`text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                          taxaTipo === 'manual'
                            ? 'border-[#800020] bg-rose-50 text-[#800020]'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Manual
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTaxaTipoChange('poupanca')}
                        className={`text-[9px] sm:text-[10px] font-bold py-2 px-0.5 rounded-lg border transition-all cursor-pointer leading-tight ${
                          taxaTipo === 'poupanca'
                            ? 'border-[#800020] bg-rose-50 text-[#800020]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        title={`Poupança: ${taxaPeriodo === 'anual' ? calcularTaxaPoupancaVal(selicRate).toFixed(2) + '% a.a.' : convertAnualParaMensal(calcularTaxaPoupancaVal(selicRate)).toFixed(2) + '% a.m.'}`}
                      >
                        Poupança ({taxaPeriodo === 'anual' ? calcularTaxaPoupancaVal(selicRate).toFixed(2) : convertAnualParaMensal(calcularTaxaPoupancaVal(selicRate)).toFixed(2)}%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTaxaTipoChange('selic')}
                        className={`text-[9px] sm:text-[10px] font-bold py-2 px-0.5 rounded-lg border transition-all cursor-pointer leading-tight ${
                          taxaTipo === 'selic'
                            ? 'border-[#800020] bg-rose-50 text-[#800020]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        title={`Selic: ${taxaPeriodo === 'anual' ? selicRate.toFixed(2) + '% a.a.' : convertAnualParaMensal(selicRate).toFixed(2) + '% a.m.'}`}
                      >
                        Selic ({taxaPeriodo === 'anual' ? selicRate.toFixed(2) : convertAnualParaMensal(selicRate).toFixed(2)}%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTaxaTipoChange('cdi')}
                        className={`text-[9px] sm:text-[10px] font-bold py-2 px-0.5 rounded-lg border transition-all cursor-pointer leading-tight ${
                          taxaTipo === 'cdi'
                            ? 'border-[#800020] bg-rose-50 text-[#800020]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        title={`CDI: ${taxaPeriodo === 'anual' ? (selicRate - 0.10).toFixed(2) + '% a.a.' : convertAnualParaMensal(selicRate - 0.10).toFixed(2) + '% a.m.'}`}
                      >
                        CDI ({taxaPeriodo === 'anual' ? (selicRate - 0.10).toFixed(2) : convertAnualParaMensal(selicRate - 0.10).toFixed(2)}%)
                      </button>
                    </div>

                    <div className="relative">
                      <span className="absolute right-3.5 top-2 ml-1 text-xs text-slate-500 font-bold">
                        {taxaPeriodo === 'anual' ? '% a.a.' : '% a.m.'}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={taxaAnual || ''}
                        disabled={taxaTipo !== 'manual'}
                        onChange={(e) => handleTaxaAnualChange(Math.max(0, parseFloat(e.target.value) || 0))}
                        className={`w-full pl-4 pr-14 py-2 text-sm font-semibold rounded-xl focus:outline-hidden transition-all ${
                          taxaTipo !== 'manual'
                            ? 'bg-slate-100 text-slate-500 border border-slate-250 cursor-not-allowed'
                            : 'bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900'
                        }`}
                        placeholder="12.00"
                      />
                    </div>
                  </div>

                  {/* Informação Resumo da Taxa Composta */}
                  <div className="bg-slate-50/75 border border-slate-100 rounded-xl p-3 flex gap-2 items-start text-[11px]">
                    <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div className="text-slate-500 font-sans leading-tight">
                      A taxa {taxaPeriodo === 'anual' ? 'anual' : 'mensal'} de <span className="font-semibold text-slate-700">{taxaAnual.toFixed(2)}%</span> equivale a{' '}
                      <span className="font-semibold text-slate-800">
                        {taxaPeriodo === 'anual'
                          ? `${convertAnualParaMensal(taxaAnual).toFixed(4)}% ao mês`
                          : `${convertMensalParaAnual(taxaAnual).toFixed(4)}% ao ano`
                        }
                      </span>{' '}
                      segundo o cálculo composto padrão.
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'clt-pj' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h2 className="font-bold text-slate-900 text-md flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#800020]" />
                      CLT vs PJ
                    </h2>
                  </div>

                  {/* Campo: Salário Bruto CLT */}
                  <div className="flex flex-col gap-1.5 shrink-0 select-none">
                    <label className="text-xs font-semibold text-slate-700 flex justify-between">
                      <span>Salário Bruto CLT (R$)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={salarioCltStr}
                        onChange={(e) => setSalarioCltStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="8.000"
                      />
                    </div>
                  </div>

                  {/* Campo: Vale Refeição / Alimentação */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <label className="text-xs font-semibold text-slate-700">VR/VA Mensal (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cltVrStr}
                        onChange={(e) => setCltVrStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="1.000"
                      />
                    </div>
                  </div>

                  {/* Campo: Plano de Saúde */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <label className="text-xs font-semibold text-slate-700">Plano de Saúde (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cltSaudeStr}
                        onChange={(e) => setCltSaudeStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="650"
                      />
                    </div>
                  </div>

                  {/* Campo: Outros Benefícios / Transporte */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <label className="text-xs font-semibold text-slate-700">Outros Benefícios (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cltOutrosStr}
                        onChange={(e) => setCltOutrosStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="400"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'aposentadoria' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h2 className="font-bold text-slate-900 text-md flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#800020]" />
                      Aposentadoria
                    </h2>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aposentadoria-idade-atual" className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Idade Atual</span>
                      <span className="text-[#800020] font-bold">{aposentadoriaIdadeAtual} anos</span>
                    </label>
                    <input
                      id="aposentadoria-idade-atual"
                      type="range"
                      min="18"
                      max="85"
                      value={aposentadoriaIdadeAtual}
                      onChange={(e) => setAposentadoriaIdadeAtual(parseInt(e.target.value))}
                      aria-label="Idade atual"
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020]"
                    />
                  </div>

                  {/* Idade Alvo */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aposentadoria-idade-alvo" className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Idade Alvo</span>
                      <span className="text-[#800020] font-bold">{aposentadoriaIdadeAlvo} anos</span>
                    </label>
                    <input
                      id="aposentadoria-idade-alvo"
                      type="range"
                      min={Math.max(40, aposentadoriaIdadeAtual + 1)}
                      max="100"
                      value={aposentadoriaIdadeAlvo}
                      onChange={(e) => setAposentadoriaIdadeAlvo(parseInt(e.target.value))}
                      aria-label="Idade alvo para aposentadoria"
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020]"
                    />
                  </div>

                  {/* Renda Desejada */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Renda Desejada (R$/mês)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={aposentadoriaRendaDesejadaStr}
                        onChange={(e) => setAposentadoriaRendaDesejadaStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="10.000"
                      />
                    </div>
                  </div>

                  {/* Patrimônio Atual */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Patrimônio Atual (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={aposentadoriaPatrimonioAtualStr}
                        onChange={(e) => setAposentadoriaPatrimonioAtualStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="50.000"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'rescisao' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h2 className="font-bold text-slate-900 text-md flex items-center gap-2">
                      <Scale className="w-5 h-5 text-[#800020]" />
                      Rescisão CLT
                    </h2>
                  </div>

                  {/* Salário Base */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Salário Bruto (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={rescisaoSalarioStr}
                        onChange={(e) => setRescisaoSalarioStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                        placeholder="5.000"
                      />
                    </div>
                  </div>

                  {/* Meses Trabalhados */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Meses Trabalhados</span>
                      <span className="text-[#800020] font-bold">{rescisaoMesesTrabalhados} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="240"
                      value={rescisaoMesesTrabalhados}
                      onChange={(e) => setRescisaoMesesTrabalhados(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020]"
                    />
                  </div>

                  {/* Dias no Último Mês */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Último Mês (Dias)</span>
                      <span className="text-[#800020] font-bold">{rescisaoDiasTrabalhados} dias</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={rescisaoDiasTrabalhados}
                      onChange={(e) => setRescisaoDiasTrabalhados(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#800020]"
                    />
                  </div>

                  {/* Motivo do Desligamento */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Motivo</label>
                    <select
                      value={rescisaoMotivo}
                      onChange={(e) => setRescisaoMotivo(e.target.value as 'sem_justa' | 'pedido_demissao')}
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl focus:outline-hidden focus:border-[#800020] cursor-pointer"
                    >
                      <option value="sem_justa">Sem justa causa (Empresa)</option>
                      <option value="pedido_demissao">Pedido de demissão</option>
                    </select>
                  </div>
                </>
              )}

          </div>

            {/* CARD 2: CONVERSOR DE MOEDAS */}
            <div className="order-3 lg:col-span-1 lg:col-start-1 lg:row-start-2 h-fit bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col gap-4 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-600" />
                  Conversor Inteligente
                </h2>
                <div className="px-1.5 py-0.5 bg-amber-50 rounded-md border border-amber-100 text-[9px] font-bold text-amber-700 tracking-wide uppercase font-mono">
                  Mercado 2026
                </div>
              </div>

              {/* Mini Placar de Cotações em Tempo Real */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono border-b border-slate-50 pb-3">
                {PLACAR_CODES.map((code) => (
                  <div key={code} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <div className="text-slate-500 font-sans">{code}</div>
                    <div className="font-extrabold text-slate-800">
                      {cotasBRL[code] ? formatRateBRL(cotasBRL[code], code) : '—'}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-slate-500 text-center leading-snug px-1">
                Cotações atualizadas automaticamente.
                {exchangeLastUpdated ? (
                  <> Última atualização: <span className="font-semibold text-slate-500">{formatExchangeTimestamp(exchangeLastUpdated)}</span>.</>
                ) : exchangeStatus === 'loading' ? (
                  <> Carregando cotações…</>
                ) : (
                  <> Usando cotações de referência.</>
                )}
                {exchangeStatus === 'cached' && exchangeSourceDate ? (
                  <span className="block text-[8px] text-slate-500 mt-0.5">Referência de mercado: {exchangeSourceDate}</span>
                ) : null}
              </p>

              {/* Input Valor para Conversão */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="conversor-valor" className="text-xs font-semibold text-slate-600">Valor a Converter</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-600 font-bold font-mono" aria-hidden="true">
                    {deMoeda}
                  </span>
                  <input
                    id="conversor-valor"
                    type="number"
                    value={conversorValor || ''}
                    onChange={(e) => setConversorValor(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-14 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
                    placeholder="1000"
                  />
                </div>
              </div>

              {/* Seletores de Direção (De -> Para) */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  
                  <CurrencySelect
                    id="conversor-de-moeda"
                    label="Moeda de origem"
                    value={deMoeda}
                    onChange={setDeMoeda}
                    currencies={currencyOptions}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const temp = deMoeda;
                      setDeMoeda(paraMoeda);
                      setParaMoeda(temp);
                    }}
                    className="p-2.5 min-h-[2.75rem] sm:min-h-0 border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-500 hover:text-amber-700 rounded-xl transition-all cursor-pointer shrink-0 self-center"
                    title="Inverter Sentido"
                    aria-label="Inverter moedas de origem e destino"
                  >
                    <ArrowRightLeft className="w-4 h-4 mx-auto" />
                  </button>

                  <CurrencySelect
                    id="conversor-para-moeda"
                    label="Moeda de destino"
                    value={paraMoeda}
                    onChange={setParaMoeda}
                    currencies={currencyOptions}
                  />

                </div>

                <div className="text-[9px] text-center text-slate-500 font-medium">
                  Conversão cruzada instantânea de <span className="font-bold text-slate-500">[{deMoeda}]</span> para <span className="font-bold text-slate-500">[{paraMoeda}]</span>
                </div>
              </div>

              {/* Painel do Resultado do Conversor */}
              <div className="rounded-xl border border-amber-100 bg-amber-50/45 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="text-[10px] font-sans font-semibold tracking-wide text-amber-700 uppercase">Resultado Convertido</div>
                <div className="font-mono text-base font-extrabold text-[#704214] mt-1 break-currency px-1">
                  {formatConvertedValue(conversorResultado, paraMoeda)}
                </div>
              </div>

            </div>

            <AdSlotSidebar className="w-full shadow-xs" />


          {/* LADO DIREITO (Width: 3/4) */}
          <div className="order-2 lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:row-span-3 flex flex-col gap-8">
            
            {/* GRID DO TOPO: CARDS DE RESULTADOS DESTACADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {calculoResultado.painelTopCards.map((card, index) => {
                const isHighlight = card.isHighlight;
                const IconComponent = (() => {
                  switch (card.iconType) {
                    case 'percent': return Percent;
                    case 'investido': return DollarSign;
                    case 'juros': return Coins;
                    case 'clt': return Briefcase;
                    case 'pj': return DollarSign;
                    case 'vantagem': return TrendingUp;
                    case 'patrimonio': return Coins;
                    case 'juros-aposentadoria': return TrendingUp;
                    case 'rescisao-total': return Calculator;
                    case 'fgts': return Briefcase;
                    case 'descontos': return Scale;
                    default: return Coins;
                  }
                })();

                return (
                  <div 
                    key={index}
                    className={`rounded-2xl p-6 shadow-xs flex flex-col justify-between min-h-[145px] relative overflow-hidden transition-all duration-300 ${
                      isHighlight 
                        ? 'bg-[#800020] text-white shadow-md' 
                        : 'bg-white border border-slate-100 text-slate-900'
                    }`}
                  >
                    {isHighlight && (
                      <div className="absolute right-[-20px] bottom-[-20px] w-28 h-28 rounded-full bg-white/5 pointer-events-none"></div>
                    )}
                    
                    <div className={`absolute top-4 right-4 flex items-center justify-center p-1.5 rounded-full ${isHighlight ? 'bg-white/15' : 'bg-rose-50/50'}`}>
                      <IconComponent className={`w-4 h-4 ${isHighlight ? 'text-white' : 'text-[#800020]'}`} />
                    </div>

                    <div>
                      <span className={`text-[10px] font-bold tracking-wider uppercase block ${isHighlight ? 'text-white/90' : 'text-slate-500'}`}>
                        {card.titulo}
                      </span>
                      <h3 className={`font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight mt-1.5 font-mono break-currency ${isHighlight ? 'text-white' : 'text-slate-800'}`}>
                        {formatBRL(card.valor)}
                      </h3>
                    </div>

                    <div className={`text-[11px] border-t pt-2.5 mt-2.5 flex items-center gap-1.5 ${isHighlight ? 'text-white/80 border-white/10' : 'text-slate-500 border-slate-100'}`}>
                      {card.iconType === 'vantagem' || card.iconType === 'percent' ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <Info className="w-3.5 h-3.5 opacity-70" />
                      )}
                      <span>{card.subtitulo}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* INFORMAÇÃO COMPLEMENTAR: PODER DE COMPRA REAL E INFLAÇÃO */}
            {activeTool === 'juros' && (
              <div className="bg-gradient-to-r from-rose-50/50 to-amber-50/50 border border-amber-100/50 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-rose-100 text-[#800020] rounded-xl font-bold tracking-tight text-center shrink-0 min-w-[70px]">
                  <span className="block text-[9px] uppercase font-mono leading-none text-slate-600">IPCA Meta</span>
                  <span className="font-extrabold text-base leading-none mt-1 text-[#800020] block">{ipcaRate.toFixed(2)}%</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Poder de Compra Real Protegido</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Seu dinheiro bruto final sob inflação cumulativa de <span className="font-semibold text-slate-700">{ipcaRate.toFixed(2)}% a.a.</span> equivale a comprar hoje <span className="font-extrabold text-[#800020] font-mono">{formatBRL(totais.poderCompraReal)}</span>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-5">
                <div className="p-2 bg-amber-100 text-orange-700 rounded-xl font-bold tracking-tight text-center shrink-0 min-w-[70px]">
                  <span className="block text-[9px] uppercase font-mono leading-none text-slate-600">Corrosão</span>
                  <span className="font-extrabold text-base leading-none mt-1 text-orange-700 block">
                    {totais.valorBrutoUser > 0 ? ((totais.desvalorizacaoInflacao / totais.valorBrutoUser) * 100).toFixed(0) : 0}%
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Perda Estimada por Corrosão Inflacionária</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    A inflação acumulada do período teria desvalorizado <span className="font-semibold text-orange-700 font-mono">{formatBRL(totais.desvalorizacaoInflacao)}</span> do seu ganho nominal total.
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* GRÁFICO DE EVOLUÇÃO PATRIMONIAL */}
            {activeTool === 'juros' && (
              <section className="w-full">
                <Suspense fallback={<ChartFallback />}>
                  <EvolucaoChart data={registros} />
                </Suspense>
              </section>
            )}

            {/* COMPARATIVOS DE GANHO REAL (VANTAGEM APOS POUPANÇA E SELIC) */}
            {activeTool === 'juros' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Comparativo vs Poupança */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                    <span className="font-extrabold text-xs">%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Comparado com Poupança</span>
                    <span className="text-xs text-slate-500">Lucro acima do rendimento regular poupador</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`font-mono text-sm font-extrabold ${totais.ganhoAdicionalPoupanca >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {totais.ganhoAdicionalPoupanca >= 0 ? '+' : ''}
                    {formatBRL(totais.ganhoAdicionalPoupanca)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">acumulados</div>
                </div>
              </div>

              {/* Comparativo vs Selic/CDI */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                    <span className="font-mono font-extrabold text-xs">CDI</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Diferença vs Selic (14,5%)</span>
                    <span className="text-xs text-slate-500">Rendimento de mercado padrão</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`font-mono text-sm font-extrabold ${totais.ganhoAdicionalSelic >= 0 ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {totais.ganhoAdicionalSelic >= 0 ? '+' : ''}
                    {formatBRL(totais.ganhoAdicionalSelic)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">acumulados</div>
                </div>
              </div>

            </div>
            )}

            {/* AD BANNER HORIZONTAL NO MEIO DE CONTEÚDO */}
            <AdSlotInline className="w-full" />

            {/* TABELA DETALHADA MÊS A MÊS */}
            {activeTool === 'juros' && (
              <section className="w-full">
                <Suspense fallback={<ChartFallback />}>
                  <TabelaMensal registros={registros} />
                </Suspense>
              </section>
            )}

            {/* SEÇÕES DESSAS OUTRAS SÃO IMPLEMENTADAS AQUI: clt-pj, aposentadoria, rescisao */}
            {activeTool === 'clt-pj' && cltData && pjData && (
              <>
                {/* INTERACTION DESIGN CLT VS PJ INTERATIVO */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs font-sans">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100/55 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-[#800020] text-sm flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Análise de Equivalência Financeira
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Comparativo detalhado de direitos CLT contra faturamento operacional PJ
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 rounded-lg text-emerald-700 font-bold border border-emerald-100 text-xs font-mono">
                      Cenário Recomendado: PJ
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* Painel CLT */}
                    <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">Estrutura CLT</span>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 text-xs font-sans">
                          <div className="flex justify-between py-1.5 border-b border-slate-50">
                            <span className="text-slate-500">Salário Bruto Mensal</span>
                            <span className="font-bold text-slate-700 font-mono">{formatBRL(cltData.salarioBruto)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50 text-rose-600">
                            <span className="text-slate-500">Desconto Previdenciário (INSS)</span>
                            <span className="font-semibold font-mono">-{formatBRL(cltData.inss)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50 text-rose-600">
                            <span className="text-slate-500">Imposto de Renda Retido (IRRF)</span>
                            <span className="font-semibold font-mono">-{formatBRL(cltData.irrf)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50 bg-slate-50 rounded-lg px-2 text-slate-800 font-semibold">
                            <span>Sua Renda Líquida na Conta</span>
                            <span className="font-extrabold font-mono text-[#800020]">{formatBRL(cltData.mensalLiquido)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50">
                            <span className="text-slate-500">Soma de Benefícios (VA/VR + Saúde + Outros)</span>
                            <span className="font-semibold text-emerald-600 font-mono">+{formatBRL(cltData.beneficiosMensais)}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span className="text-slate-500">FGTS Provisionado (Equiv. Mensal)</span>
                            <span className="font-semibold text-slate-600 font-mono">+{formatBRL(cltData.fgtsAnual / 12)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-50 bg-[#800020]/5 rounded-xl p-3">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Renda Equiv. Mensal Real CLT</span>
                        <div className="font-mono text-lg font-black text-[#800020] mt-1">
                          {formatBRL(cltData.receitaMensalEquiv)}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                          Considera 13º proporcional, férias cumuladas de 1/3, FGTS recolhido e todos os benefícios livres de impostos.
                        </p>
                      </div>
                    </div>

                    {/* Painel PJ */}
                    <div className="p-6 flex flex-col justify-between bg-[#800020]/[0.01]">
                      <div>
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#800020]"></span>
                          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">Metodologia PJ</span>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 text-xs">
                          <div className="flex justify-between py-1.5 border-b border-slate-50 text-[#800020] font-bold">
                            <span>Alvo de Faturamento PJ Mínimo</span>
                            <span className="font-extrabold font-mono">{formatBRL(pjData.minimoFaturamento)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50 text-rose-600">
                            <span className="text-slate-500">Simples Nacional (Anexo III - 6%)</span>
                            <span className="font-semibold font-mono">-{formatBRL(pjData.das)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-slate-50 text-rose-600">
                            <span className="text-slate-500">Mensalidade Contabilidade Parcial</span>
                            <span className="font-semibold font-mono">-{formatBRL(pjData.contador)}</span>
                          </div>
                          <div className="flex justify-between py-1.5 bg-emerald-50 rounded-lg px-2 text-emerald-800 font-semibold">
                            <span>PJ Disponível para Retirada</span>
                            <span className="font-extrabold font-mono">{formatBRL(pjData.mensalLiquido)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-50 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 block">Vantagem de Equivalência ANUAL</span>
                        <div className="font-mono text-lg font-black text-emerald-700 mt-1">
                          {cltPjExtra?.vantagemAnual && cltPjExtra.vantagemAnual >= 0 ? '+' : ''}
                          {formatBRL(cltPjExtra?.vantagemAnual || 0)}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                          Gasto de custos deduzido. Este faturamento garante exatamente o mesmo benefício e as férias remuneradas do CLT.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* AD BANNER HORIZONTAL NO MEIO DE CONTEÚDO */}
                <AdSlotInline className="w-full" />

                {/* Parecer Técnico Analítico */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs font-sans">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#800020]" />
                    Parecer do Especialista Financeiro
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-2 font-sans overflow-hidden">
                    Para trocar de CLT para PJ mantendo as mesmas provisões de segurança financeira (incluindo férias remuneradas de 30 dias por ano, 13º salário e o resguardo do FGTS de 8%), o seu faturamento mínimo mensal como PJ deve ser de <strong className="text-[#800020]">{formatBRL(pjData.minimoFaturamento)}</strong>. Isso representa um fator multiplicador de <strong className="text-slate-800">{(pjData.minimoFaturamento / cltData.salarioBruto).toFixed(2)}x</strong> sobre o seu salário bruto atual. Qualquer proposta abaixo disso reduz o seu poder de compra bruto anual real.
                  </p>
                </div>
              </>
            )}

            {activeTool === 'aposentadoria' && aposentadoriaData && (
              <>
                {/* PROJEÇÃO DE APOSENTADORIA E METAS COMPLEMENTARES */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs font-sans">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100/55 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-[#800020] text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Seu Planejamento de Independência Financeira
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Déficit contra o teto do INSS e a meta patrimonial para viver de renda complementar
                      </p>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Métricas do Plano */}
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-2 border-b border-slate-100 flex justify-between">
                        <span>Horizonte Temporal</span>
                        <span className="font-mono text-slate-500">{aposentadoriaData.anosAcumulo} Anos Restantes</span>
                      </h4>
                      
                      <div className="mt-4 flex flex-col gap-3 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-50">
                          <span className="text-slate-500">Idade Alvo para Aposentar</span>
                          <span className="font-bold text-slate-800">{aposentadoriaIdadeAlvo} anos de idade</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-50">
                          <span className="text-slate-500">Prazo Estimado de Acúmulo</span>
                          <span className="font-bold text-slate-800 font-mono">{aposentadoriaData.mesesAcumulo} meses</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-50">
                          <span className="text-slate-500">Renda Desejada Mensal</span>
                          <span className="font-extrabold text-[#800020] font-mono">{formatBRL(aposentadoriaRendaDesejadaNum)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-50 text-emerald-700 font-semibold p-1 bg-emerald-50 rounded-lg">
                          <span>Estimativa de Cobertura INSS</span>
                          <span className="font-extrabold font-mono">+{formatBRL(aposentadoriaData.coberturaINSS)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-rose-550 font-semibold bg-rose-50 rounded-lg p-1">
                          <span>Lacuna Líquida Privada</span>
                          <span className="font-extrabold font-mono">-{formatBRL(aposentadoriaData.lacunaRenda)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta Patrimonial */}
                    <div className="flex flex-col justify-between">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
                        Meta Patrimonial e Projeção
                      </h4>

                      <div className="mt-4 flex flex-col gap-3.5 text-xs">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 font-sans">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Meta Patrimonial no Dia Zero</span>
                          <span className="font-mono text-lg font-black text-slate-900 block mt-1">
                            {formatBRL(aposentadoriaData.patrimonioNecessario)}
                          </span>
                          <span className="text-[10px] text-slate-500 font-sans mt-1 block leading-normal">
                            Baseia-se na Regra de retirada real líquida de <strong>0,35% ao mês</strong> (4% ao ano real) para nunca consumir o patrimônio construído.
                          </span>
                        </div>

                        <div className="flex justify-between py-1 text-slate-600">
                          <span>Rendimento Estimado do Saldo Atual</span>
                          <span className="font-bold font-mono text-emerald-600">+{formatBRL(aposentadoriaData.patrimonioAtualFuturo)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* AD BANNER HORIZONTAL NO MEIO DE CONTEÚDO */}
                <AdSlotInline className="w-full" />

                {/* Plano de Ação Personalizado */}
                <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/45 p-6 border border-emerald-100 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-sans">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-emerald-700" />
                      Aporte Mensal Alvo Recomendado
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-normal mt-1 max-w-xl font-sans">
                      Para acumular com sucesso a diferença do patrimônio complementar restante do seu saldo nos próximos <strong className="text-slate-800">{aposentadoriaData.anosAcumulo} anos</strong>, você precisa poupar e investir mensalmente em taxas CDI líquidas de inflação:
                    </p>
                  </div>
                  <div className="shrink-0 w-full sm:w-auto p-4 bg-emerald-700 text-white rounded-xl text-center sm:min-w-[170px] shadow-xs">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-white/80 block">Aporte por Mês</span>
                    <span className="font-mono text-xl font-black block mt-1">{formatBRL(aposentadoriaData.aporteMensalNecessario)}</span>
                    <span className="text-[9px] text-white/70 block mt-1">Poupança Acima da Inflação</span>
                  </div>
                </div>
              </>
            )}

            {activeTool === 'rescisao' && rescisaoData && (
              <>
                {/* EXTRATO OFICIAL DA RESCISÃO CONTRATUAL */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs font-sans">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100/55 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-[#800020] text-sm flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        Demonstrativo de Verbas Rescisórias CLT
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Simulação estimativa com base no artigo 477 da CLT
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 block font-mono">REGIME</span>
                      <span className="font-bold text-[10px] text-[#800020] uppercase bg-rose-50 px-2 py-0.5 rounded border border-rose-100 mt-1 inline-block font-sans">
                        {rescisaoData.motivo === 'sem_justa' ? 'Sem Justa Causa (Empregador)' : 'Pedido de Demissão'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="table-scroll">
                      <table className="w-full text-left text-xs border-collapse font-sans">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 uppercase tracking-widest text-[9px] font-bold">
                            <th className="py-2.5">Detalhamento dos Direitos Rescisórios</th>
                            <th className="py-2.5 text-right">Cálculo de Base</th>
                            <th className="py-2.5 text-right text-slate-700">Valor Estimado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          <tr>
                            <td className="py-3 font-medium text-slate-800">Saldo de Salário Proporcional</td>
                            <td className="py-3 text-right text-slate-500">{rescisaoData.diasTrab} dias no mês</td>
                            <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.verbas.saldoSalario)}</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium text-slate-800">13º Salário Proporcional</td>
                            <td className="py-3 text-right text-slate-500">{rescisaoData.mesesTrabalhadosVal % 12} avos cumulados</td>
                            <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.verbas.decimoTerceiro)}</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium text-slate-800">Férias Vencidas & Proporcionais</td>
                            <td className="py-3 text-right text-slate-500">{rescisaoData.mesesTrabalhadosVal % 12} avos cumulados</td>
                            <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.verbas.feriasProp)}</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium text-slate-800">1/3 Adicional Constitucional de Férias</td>
                            <td className="py-3 text-right text-slate-500 font-sans">Média constitucional padrão (33,3%)</td>
                            <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.verbas.feriasUmTerco)}</td>
                          </tr>
                          <tr className="bg-slate-50 select-none">
                            <td className="py-3 px-2 font-bold text-[#800020]">Total de Verbas Líquidas Diretas (Saldo + Férias + 13º)</td>
                            <td className="py-3 text-right"></td>
                            <td className="py-3 font-extrabold font-mono text-right text-[#800020]">{formatBRL(rescisaoData.verbas.totalLiquido)}</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium text-slate-800">FGTS Estimado Acumulado (Sob depósitos mensais)</td>
                            <td className="py-3 text-right text-slate-500">{rescisaoData.mesesTrabalhadosVal} meses depositados</td>
                            <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.fgts.acumulado)}</td>
                          </tr>
                          {rescisaoData.motivo === 'sem_justa' && (
                            <tr>
                              <td className="py-3 font-medium text-[#800020]">Multa Rescisória de FGTS (40%)</td>
                              <td className="py-3 text-right text-rose-500">Liberado pelo motivo de demissão</td>
                              <td className="py-3 text-right font-extrabold font-mono text-emerald-700">+{formatBRL(rescisaoData.fgts.multa)}</td>
                            </tr>
                          )}
                          <tr className="bg-slate-50/75 select-none text-slate-700">
                            <td className="py-3 px-2 font-bold flex items-center gap-1.5">
                              FGTS Sacável Estimado Total 
                              {rescisaoData.motivo !== 'sem_justa' && <span className="text-[9px] font-medium text-rose-500 font-sans">(Retido pelo motivo)</span>}
                            </td>
                            <td className="py-3 text-right"></td>
                            <td className="py-3 font-extrabold font-mono text-right">
                              {formatBRL(rescisaoData.fgts.sacavel)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* AD BANNER HORIZONTAL NO MEIO DE CONTEÚDO */}
                <AdSlotInline className="w-full" />

                {/* Parecer Legal Prontuário */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs font-sans">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#800020]" />
                    Orientações do Especialista
                  </h4>
                  <ul className="text-[11px] text-slate-600 space-y-2 mt-2 list-disc pl-4 leading-relaxed font-sans">
                    <li>As provisões calculadas acima são simulações técnicas estimativas. O valor exato depende da data exata de homologação e de eventuais descontos de plano de saúde, faltas não justificadas ou coparticipações pendentes.</li>
                    <li>O aviso prévio (trabalhado ou indenizado) não foi inserido na simulação acima para focar nas parcelas fundamentais obrigatórias de direito contratual adquirido.</li>
                    <li>Sendo demitido sem justa causa, você tem direito ao saque-aniversário congelado ou saque integral imediato conforme a regra do FGTS contratada no aplicativo oficial.</li>
                  </ul>
                </div>
              </>
            )}

          </div>

            </div>
          </div>
        </div>
        </div>

        <Suspense fallback={null}>
          <ToolSeoContent content={toolContent} />
        </Suspense>
      </main>

      <AdSlotFooter />

      {/* 5. Rodapé Institucional Minimalista */}
      <footer className="bg-slate-900 text-slate-300 py-10 px-6 md:px-12 border-t border-slate-800 text-xs text-center mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-6">
          
          {/* Logo do footer */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-xs">%</span>
            </div>
            <span className="font-bold text-sm text-slate-100 tracking-tight">
              calculo<span className="text-rose-400">juroscompostos</span>.com.br
            </span>
          </div>

          {/* Links discretos */}
          <div className="flex flex-wrap justify-center gap-6 text-slate-300 font-medium tracking-wide">
            <Link to={ROUTES.termos} className="hover:text-white transition-colors">Termos de Uso</Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link to={ROUTES.privacidade} className="hover:text-white transition-colors">Política de Privacidade</Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link to={ROUTES.sobre} className="hover:text-white transition-colors">Sobre</Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link to={ROUTES.blog} className="hover:text-white transition-colors">Blog</Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link to={ROUTES.cookies} className="hover:text-white transition-colors">Cookies</Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link to={ROUTES.isencao} className="hover:text-white transition-colors">Isenção</Link>
          </div>

          <nav className="flex flex-wrap justify-center gap-3 text-[10px] text-slate-300" aria-label="Categorias de conteúdo">
            <Link to={ROUTES.categoria('investimentos')} className="hover:text-white">Investimentos</Link>
            <span className="text-slate-600">·</span>
            <Link to={ROUTES.categoria('financas-pessoais')} className="hover:text-white">Finanças Pessoais</Link>
            <span className="text-slate-600">·</span>
            <Link to={ROUTES.categoria('aposentadoria')} className="hover:text-white">Aposentadoria</Link>
            <span className="text-slate-600">·</span>
            <Link to={ROUTES.categoria('salario-clt')} className="hover:text-white">Salário e CLT</Link>
            <span className="text-slate-600">·</span>
            <Link to={ROUTES.categoria('empreendedorismo')} className="hover:text-white">Empreendedorismo</Link>
          </nav>

          {/* Aviso Legal Mandatório */}
          <p className="max-w-3xl text-[11px] text-slate-300 leading-relaxed font-sans mt-2">
            As taxas exibidas são de caráter informativo com base em indicadores macroeconômicos. Retornos passados não garantem rendimentos futuros. Os resultados aqui providos são estimativas matemáticas com base em aportes regulares constantes, não representando de forma alguma assessoria ou recomendação individualizada de investimentos financeiros.
          </p>

          <div className="text-[10px] text-slate-300 mt-2 font-mono">
            © 2026 {SITE_DOMAIN}. Todos os direitos reservados.
          </div>

        </div>
      </footer>

    </div>
  );
}
