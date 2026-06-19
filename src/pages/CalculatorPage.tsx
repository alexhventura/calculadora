import { useState, useMemo, lazy, Suspense, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Percent, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Coins, 
  Calculator, 
  Info,
  Briefcase,
  Calendar,
  Scale
} from 'lucide-react';
import { TempoUnidade, TaxaTipo } from '../types';
import { 
  calcularTaxaPoupancaVal,
  convertAnualParaMensal,
  convertMensalParaAnual
} from '../utils/finance';
import { AdSlotTop, AdSlotFooter, AdSlotInline } from '../components/monetization';
import SkipLink from '../components/layout/SkipLink';
import SiteBrand from '../components/layout/SiteBrand';
import MainNav from '../components/layout/MainNav';
import SiteFooter from '../components/layout/SiteFooter';
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
import ToolQuickGuide from '../components/calculator/ToolQuickGuide';
import PersonalizeTrigger from '../components/calculator/PersonalizeTrigger';
import CalculatorAdvancedFields from '../components/calculator/CalculatorAdvancedFields';
const MethodologyPanel = lazy(() => import('../components/calculator/MethodologyPanel'));
import FieldHint from '../components/calculator/FieldHint';
import HowToUseButton from '../components/calculator/HowToUseButton';
const HowToUseModal = lazy(() => import('../components/calculator/HowToUseModal'));
import CalculatorActionBar from '../components/calculator/CalculatorActionBar';
import CurrencyAmount from '../components/calculator/CurrencyAmount';
import { useCalculatorMode } from '../hooks/useCalculatorMode';
import { TOOL_GUIDES } from '../config/toolGuides';
import { HOW_TO_USE } from '../config/howToUse';
import { EMPTY_FORM_VALUES, emptyAdvancedForTool } from '../constants/defaultFormValues';
import { calcularPeriodoRescisao } from '../utils/rescisaoDates';
import {
  periodicidadeFromState,
  periodicidadeLabel,
  periodicidadeResumo,
  taxaFieldHint,
  taxaFieldLabel,
  taxaFieldSuffix,
  tempoFieldHint,
  tempoFieldLabel,
  tempoUnidadeForPeriodicidade,
  type JurosPeriodicidade,
} from '../utils/jurosPeriodicity';
import {
  type AdvancedCalculatorOptions,
} from '../types/calculator';
import type { RescisaoMotivo } from '../utils/calculations/toolCalculations';

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

/** Superfície compartilhada: card ativo no seletor + área de campos (estilo premium minimal) */
const ACTIVE_TOOL_SURFACE = 'bg-slate-50';

const TOOL_SELECTOR_ORDER: ActiveTool[] = ['juros', 'clt-pj', 'rescisao', 'aposentadoria'];

const CONVERSOR_SELECTOR_META = {
  bentoId: 'bento_conversor',
  Icon: Coins,
  title: 'Conversor de Moedas',
  description: 'Cotações atualizadas e conversão entre moedas fiduciárias e cripto.',
};

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
  } = useExchangeRates();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();

  // --- Estados da Calculadora (início zerado — sem exemplos pré-preenchidos) ---
  const [valorInicialStr, setValorInicialStr] = useState<string>(EMPTY_FORM_VALUES.juros.valorInicialStr);
  const [aporteMensalStr, setAporteMensalStr] = useState<string>(EMPTY_FORM_VALUES.juros.aporteMensalStr);
  const [tempo, setTempo] = useState<number>(EMPTY_FORM_VALUES.juros.tempo);
  const [tempoUnidade, setTempoUnidade] = useState<TempoUnidade>(EMPTY_FORM_VALUES.juros.tempoUnidade);
  const [taxaAnual, setTaxaAnual] = useState<number>(EMPTY_FORM_VALUES.juros.taxaAnual);
  const [taxaTipo, setTaxaTipo] = useState<TaxaTipo>(EMPTY_FORM_VALUES.juros.taxaTipo);
  const [taxaPeriodo, setTaxaPeriodo] = useState<'anual' | 'mensal'>(EMPTY_FORM_VALUES.juros.taxaPeriodo);

  // --- Estado da Ferramenta Ativa (Bento UI) ---
  const [activeTool, setActiveTool] = useState<ActiveTool>(initialTool ?? 'juros');

  // --- Estados do Comparativo CLT vs PJ ---
  const [salarioCltStr, setSalarioCltStr] = useState<string>(EMPTY_FORM_VALUES['clt-pj'].salarioCltStr);
  const [cltVrStr, setCltVrStr] = useState<string>(EMPTY_FORM_VALUES['clt-pj'].cltVrStr);
  const [cltSaudeStr, setCltSaudeStr] = useState<string>(EMPTY_FORM_VALUES['clt-pj'].cltSaudeStr);
  const [cltOutrosStr, setCltOutrosStr] = useState<string>(EMPTY_FORM_VALUES['clt-pj'].cltOutrosStr);
  const [faturamentoPjStr, setFaturamentoPjStr] = useState<string>('');

  // --- Estados do Plano de Aposentadoria ---
  const [aposentadoriaIdadeAtual, setAposentadoriaIdadeAtual] = useState<number>(EMPTY_FORM_VALUES.aposentadoria.idadeAtual);
  const [aposentadoriaIdadeAlvo, setAposentadoriaIdadeAlvo] = useState<number>(EMPTY_FORM_VALUES.aposentadoria.idadeAlvo);
  const [aposentadoriaSalarioAtualStr, setAposentadoriaSalarioAtualStr] = useState<string>(EMPTY_FORM_VALUES.aposentadoria.salarioAtualStr);
  const [aposentadoriaRendaDesejadaStr, setAposentadoriaRendaDesejadaStr] = useState<string>(EMPTY_FORM_VALUES.aposentadoria.rendaDesejadaStr);
  const [aposentadoriaPatrimonioAtualStr, setAposentadoriaPatrimonioAtualStr] = useState<string>(EMPTY_FORM_VALUES.aposentadoria.patrimonioAtualStr);

  const [howToUseOpen, setHowToUseOpen] = useState(false);

  // --- Estados do Cálculo de Rescisão ---
  const [rescisaoSalarioStr, setRescisaoSalarioStr] = useState<string>(EMPTY_FORM_VALUES.rescisao.salarioStr);
  const [rescisaoDataAdmissao, setRescisaoDataAdmissao] = useState<string>(EMPTY_FORM_VALUES.rescisao.dataAdmissao);
  const [rescisaoDataDesligamento, setRescisaoDataDesligamento] = useState<string>(EMPTY_FORM_VALUES.rescisao.dataDesligamento);
  const [rescisaoMotivo, setRescisaoMotivo] = useState<RescisaoMotivo>(EMPTY_FORM_VALUES.rescisao.motivo);

  const { setMode: setCalculatorMode, isAdvanced } = useCalculatorMode(activeTool);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedCalculatorOptions>(() =>
    emptyAdvancedForTool(initialTool ?? 'juros'),
  );

  const patchAdvancedOptions = useCallback((patch: Partial<AdvancedCalculatorOptions>) => {
    setAdvancedOptions((prev) => ({
      juros: { ...prev.juros, ...patch.juros },
      cltPj: { ...prev.cltPj, ...patch.cltPj },
      aposentadoria: { ...prev.aposentadoria, ...patch.aposentadoria },
      rescisao: { ...prev.rescisao, ...patch.rescisao },
    }));
  }, []);

  const rescisaoPeriodoDerivado = useMemo(
    () => calcularPeriodoRescisao(rescisaoDataAdmissao, rescisaoDataDesligamento),
    [rescisaoDataAdmissao, rescisaoDataDesligamento],
  );

  const rescisaoMesesEfetivos = useMemo(() => {
    if (isAdvanced && advancedOptions.rescisao.usarPeriodoManual) {
      return advancedOptions.rescisao.mesesManual;
    }
    return rescisaoPeriodoDerivado.mesesTrabalhados;
  }, [isAdvanced, advancedOptions.rescisao, rescisaoPeriodoDerivado.mesesTrabalhados]);

  const rescisaoDiasEfetivos = useMemo(() => {
    if (isAdvanced && advancedOptions.rescisao.usarPeriodoManual) {
      return advancedOptions.rescisao.diasManual;
    }
    return rescisaoPeriodoDerivado.diasUltimoMes;
  }, [isAdvanced, advancedOptions.rescisao, rescisaoPeriodoDerivado.diasUltimoMes]);

  const goldRate = cotasBRL.XAU ?? 12900;

  const navigateToTool = useCallback((tool: ActiveTool) => {
    setActiveTool(tool);
    navigate(toolPath(tool));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        aposentadoriaSalarioAtualNum,
        rescisaoSalarioNum,
        rescisaoMesesTrabalhados: rescisaoMesesEfetivos,
        rescisaoMotivo,
        rescisaoDiasTrabalhados: rescisaoDiasEfetivos,
        advancedMode: isAdvanced,
        advanced: advancedOptions,
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
      aposentadoriaSalarioAtualNum,
      rescisaoSalarioNum,
      rescisaoMesesEfetivos,
      rescisaoMotivo,
      rescisaoDiasEfetivos,
      isAdvanced,
      advancedOptions,
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

  const methodologyLiveParams = useMemo(() => {
    if (activeTool === 'juros') {
      return [
        { label: 'Taxa', value: `${taxaAnual.toFixed(2)}% ${taxaPeriodo === 'anual' ? 'a.a.' : 'a.m.'}` },
        { label: 'Selic ref.', value: `${selicRate.toFixed(2)}% a.a.` },
        { label: 'IPCA ref.', value: `${ipcaRate.toFixed(2)}% a.a.` },
      ];
    }
    if (activeTool === 'clt-pj') {
      return [
        { label: 'Salário CLT', value: formatBRL(salarioCltNum) },
        { label: 'Regime PJ', value: isAdvanced ? advancedOptions.cltPj.regimePj : 'Simples 6%' },
      ];
    }
    if (activeTool === 'aposentadoria') {
      return [
        { label: 'Renda alvo', value: formatBRL(aposentadoriaRendaDesejadaNum) },
        { label: 'Horizonte', value: `${Math.max(1, aposentadoriaIdadeAlvo - aposentadoriaIdadeAtual)} anos` },
      ];
    }
    return [
      { label: 'Salário base', value: formatBRL(rescisaoSalarioNum) },
      { label: 'Período', value: `${rescisaoMesesEfetivos} meses` },
      { label: 'Motivo', value: rescisaoMotivo.replace(/_/g, ' ') },
    ];
  }, [
    activeTool,
    taxaAnual,
    taxaPeriodo,
    selicRate,
    ipcaRate,
    salarioCltNum,
    isAdvanced,
    advancedOptions.cltPj.regimePj,
    aposentadoriaRendaDesejadaNum,
    aposentadoriaIdadeAlvo,
    aposentadoriaIdadeAtual,
    rescisaoSalarioNum,
    rescisaoMesesEfetivos,
    rescisaoMotivo,
  ]);

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

  const jurosPeriodicidade = periodicidadeFromState(taxaPeriodo);

  const handlePeriodicidadeJuros = useCallback(
    (modo: JurosPeriodicidade) => {
      if (modo === jurosPeriodicidade) return;
      if (modo === 'mensal') {
        if (taxaPeriodo === 'anual') {
          if (taxaTipo === 'poupanca') {
            setTaxaAnual(convertAnualParaMensal(calcularTaxaPoupancaVal(selicRate)));
          } else if (taxaTipo === 'selic') {
            setTaxaAnual(convertAnualParaMensal(selicRate));
          } else if (taxaTipo === 'cdi') {
            setTaxaAnual(convertAnualParaMensal(Math.max(0, selicRate - 0.10)));
          } else {
            setTaxaAnual(convertAnualParaMensal(taxaAnual));
          }
        }
        setTaxaPeriodo('mensal');
        setTempoUnidade(tempoUnidadeForPeriodicidade('mensal'));
      } else {
        if (taxaPeriodo === 'mensal') {
          if (taxaTipo === 'poupanca') {
            setTaxaAnual(calcularTaxaPoupancaVal(selicRate));
          } else if (taxaTipo === 'selic') {
            setTaxaAnual(selicRate);
          } else if (taxaTipo === 'cdi') {
            setTaxaAnual(Math.max(0, selicRate - 0.10));
          } else {
            setTaxaAnual(convertMensalParaAnual(taxaAnual));
          }
        }
        setTaxaPeriodo('anual');
        setTempoUnidade(tempoUnidadeForPeriodicidade('anual'));
      }
    },
    [jurosPeriodicidade, taxaPeriodo, taxaTipo, taxaAnual, selicRate],
  );

  const handleTaxaPeriodoChange = (novoPeriodo: 'anual' | 'mensal') => {
    handlePeriodicidadeJuros(novoPeriodo === 'mensal' ? 'mensal' : 'anual');
  };

  const handleTaxaAnualChange = (val: number) => {
    setTaxaAnual(val);
    setTaxaTipo('manual'); // Transiciona para manual caso o usuário mude o número manualmente
  };

  // --- Limpar todos os dados da ferramenta ativa ---
  const handleClearData = useCallback(() => {
    setCalculatorMode('simple');
    setAdvancedOptions(emptyAdvancedForTool(activeTool));

    switch (activeTool) {
      case 'juros': {
        setValorInicialStr(EMPTY_FORM_VALUES.juros.valorInicialStr);
        setAporteMensalStr(EMPTY_FORM_VALUES.juros.aporteMensalStr);
        setTempo(EMPTY_FORM_VALUES.juros.tempo);
        setTempoUnidade(EMPTY_FORM_VALUES.juros.tempoUnidade);
        setTaxaAnual(EMPTY_FORM_VALUES.juros.taxaAnual);
        setTaxaTipo(EMPTY_FORM_VALUES.juros.taxaTipo);
        setTaxaPeriodo(EMPTY_FORM_VALUES.juros.taxaPeriodo);
        break;
      }
      case 'clt-pj': {
        setSalarioCltStr(EMPTY_FORM_VALUES['clt-pj'].salarioCltStr);
        setCltVrStr(EMPTY_FORM_VALUES['clt-pj'].cltVrStr);
        setCltSaudeStr(EMPTY_FORM_VALUES['clt-pj'].cltSaudeStr);
        setCltOutrosStr(EMPTY_FORM_VALUES['clt-pj'].cltOutrosStr);
        setFaturamentoPjStr('');
        break;
      }
      case 'aposentadoria': {
        setAposentadoriaIdadeAtual(EMPTY_FORM_VALUES.aposentadoria.idadeAtual);
        setAposentadoriaIdadeAlvo(EMPTY_FORM_VALUES.aposentadoria.idadeAlvo);
        setAposentadoriaSalarioAtualStr(EMPTY_FORM_VALUES.aposentadoria.salarioAtualStr);
        setAposentadoriaRendaDesejadaStr(EMPTY_FORM_VALUES.aposentadoria.rendaDesejadaStr);
        setAposentadoriaPatrimonioAtualStr(EMPTY_FORM_VALUES.aposentadoria.patrimonioAtualStr);
        break;
      }
      case 'rescisao': {
        setRescisaoSalarioStr(EMPTY_FORM_VALUES.rescisao.salarioStr);
        setRescisaoDataAdmissao(EMPTY_FORM_VALUES.rescisao.dataAdmissao);
        setRescisaoDataDesligamento(EMPTY_FORM_VALUES.rescisao.dataDesligamento);
        setRescisaoMotivo(EMPTY_FORM_VALUES.rescisao.motivo);
        break;
      }
    }
  }, [activeTool, setCalculatorMode]);

  const handleSavePdf = useCallback(async () => {
    const [{ buildCalculatorPdfPayload }, { exportCalculationPdf }] = await Promise.all([
      import('../utils/export/buildCalculatorPdf'),
      import('../utils/export/exportCalculationPdf'),
    ]);
    const payload = buildCalculatorPdfPayload(
      {
        activeTool,
        toolTitle: activeToolMeta.title,
        isAdvanced,
        advanced: advancedOptions,
        selicRate,
        ipcaRate,
        taxaPeriodo,
        taxaTipo,
        valorInicialStr,
        aporteMensalStr,
        tempo,
        tempoUnidade,
        taxaAnual,
        salarioCltStr,
        cltVrStr,
        cltSaudeStr,
        cltOutrosStr,
        faturamentoPjStr,
        aposIdadeAtual: aposentadoriaIdadeAtual,
        aposIdadeAlvo: aposentadoriaIdadeAlvo,
        aposRendaStr: aposentadoriaRendaDesejadaStr,
        aposPatrimonioStr: aposentadoriaPatrimonioAtualStr,
        aposSalarioStr: aposentadoriaSalarioAtualStr,
        rescisaoSalarioStr,
        rescisaoDataAdmissao,
        rescisaoDataDesligamento,
        rescisaoMotivo,
        rescisaoMeses: rescisaoMesesEfetivos,
        rescisaoDias: rescisaoDiasEfetivos,
      },
      calculoResultado,
    );
    await exportCalculationPdf(payload);
  }, [
    activeTool,
    activeToolMeta.title,
    isAdvanced,
    advancedOptions,
    selicRate,
    ipcaRate,
    taxaPeriodo,
    taxaTipo,
    valorInicialStr,
    aporteMensalStr,
    tempo,
    tempoUnidade,
    taxaAnual,
    salarioCltStr,
    cltVrStr,
    cltSaudeStr,
    cltOutrosStr,
    faturamentoPjStr,
    aposentadoriaIdadeAtual,
    aposentadoriaIdadeAlvo,
    aposentadoriaRendaDesejadaStr,
    aposentadoriaPatrimonioAtualStr,
    aposentadoriaSalarioAtualStr,
    rescisaoSalarioStr,
    rescisaoDataAdmissao,
    rescisaoDataDesligamento,
    rescisaoMotivo,
    rescisaoMesesEfetivos,
    rescisaoDiasEfetivos,
    calculoResultado,
  ]);

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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 shadow-xs" role="banner">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SiteBrand />
            <MainNav current="calculadoras" />
          </div>
          <div
            className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl sm:rounded-full select-none justify-center w-full sm:w-auto sm:ml-auto min-w-0 overflow-hidden"
            role="status"
            aria-live="polite"
            aria-label="Cotações do dia"
          >
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
      <main id="conteudo-principal" className="max-w-7xl mx-auto w-full min-w-0 px-4 md:px-8 lg:px-12 py-6 md:py-8 flex-1 flex flex-col gap-6">
        <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: toolContent.h1 }]} />

        <header className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            {toolContent.h1}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-none">
            {toolContent.intro}
          </p>
        </header>

        {/* Calculadora ativa primeiro (above the fold) → seletor abaixo */}
        <div className="flex flex-col gap-6">
        <section className="w-full flex flex-col gap-4 order-2" aria-labelledby="tool-selector-heading">
          <div className="flex flex-col gap-1">
            <h2 id="tool-selector-heading" className="text-lg font-extrabold tracking-tight text-slate-900">
              Ferramentas disponíveis
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Simuladores financeiros e conversor de moedas com o mesmo acesso rápido.
            </p>
          </div>

          <div
            id="bento-selector"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 rounded-2xl border border-slate-200/70 bg-white p-2.5 sm:p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
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
                  className={`flex flex-col text-left rounded-xl p-1.5 transition-all duration-300 ease-out cursor-pointer select-none h-full touch-target sm:min-h-0 min-h-[4.5rem] ${
                    isActive
                      ? `${ACTIVE_TOOL_SURFACE} ring-1 ring-[#800020]/15`
                      : 'ring-1 ring-transparent hover:ring-slate-200/90'
                  }`}
                >
                  <div
                    className={`flex flex-col flex-1 h-full justify-between gap-3 p-3.5 sm:p-4 rounded-[0.65rem] border transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)] border-l-[3px] border-l-[#800020]'
                        : 'bg-white border-slate-200/60 hover:border-slate-300/80 hover:shadow-[0_1px_2px_rgba(15,23,42,0.03)]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          isActive ? 'bg-[#800020]/[0.06] text-[#800020]' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon className="w-[1.125rem] h-[1.125rem]" aria-hidden="true" />
                      </div>
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#800020] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-[13px] leading-snug tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>
                        {meta.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{meta.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}

            <Link
              id={CONVERSOR_SELECTOR_META.bentoId}
              to={ROUTES.conversorMoedas}
              className="flex flex-col text-left rounded-xl p-1.5 transition-all duration-300 ease-out cursor-pointer select-none h-full touch-target sm:min-h-0 min-h-[4.5rem] ring-1 ring-transparent hover:ring-slate-200/90"
            >
              <div className="flex flex-col flex-1 h-full justify-between gap-3 p-3.5 sm:p-4 rounded-[0.65rem] border bg-white border-slate-200/60 hover:border-slate-300/80 hover:shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300">
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                    <CONVERSOR_SELECTOR_META.Icon className="w-[1.125rem] h-[1.125rem]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[13px] leading-snug tracking-tight text-slate-800">
                    {CONVERSOR_SELECTOR_META.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {CONVERSOR_SELECTOR_META.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Área da calculadora selecionada — agrupamento estático, sem sobreposição */}
        <div
          id="active-calculator-workspace"
          role="region"
          aria-labelledby="active-tool-heading"
          className="order-1 rounded-2xl md:rounded-[1.25rem] bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_rgba(15,23,42,0.04)]"
        >
          <header className="flex items-start gap-3 px-4 py-4 md:px-6 md:py-5 bg-slate-50 border-b border-slate-200/60 rounded-t-2xl md:rounded-t-[1.25rem]">
            <div className="p-2 rounded-lg bg-[#800020]/[0.06] text-[#800020] shrink-0">
              <ActiveToolIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="active-tool-heading" className="font-semibold text-base md:text-lg text-slate-900 tracking-tight leading-snug">
                {activeToolMeta.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {activeToolMeta.description}
              </p>
            </div>
          </header>

          <div className="px-3 pb-5 md:px-5 md:pb-7 lg:px-7 lg:pb-8 pt-4 md:pt-5">
            <HowToUseButton variant="banner" onClick={() => setHowToUseOpen(true)} />
            <div className="mt-4">
            <ToolQuickGuide guide={TOOL_GUIDES[activeTool]} />
            </div>
            <div className={`rounded-xl ${ACTIVE_TOOL_SURFACE} border border-slate-200/60 p-4 md:p-6 lg:p-8 mt-4`}>
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
          <div className="order-1 lg:order-1 lg:col-span-1 lg:col-start-1 lg:row-start-1 h-fit calc-panel-form bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-5 relative overflow-hidden">
              
              {/* Decoration Line Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#800020]"></div>

              {activeTool === 'juros' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h2 className="font-bold text-slate-900 text-md flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#800020]" />
                      Simule seu investimento
                    </h2>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-slate-700 flex items-center">
                      Periodicidade da taxa
                      <FieldHint text="Mensal: taxa ao mês e prazo em meses. Anual: taxa ao ano e prazo em anos." />
                    </span>
                    <div
                      className="grid grid-cols-2 gap-1.5 bg-slate-100/70 p-1 rounded-xl"
                      role="group"
                      aria-label="Periodicidade da taxa"
                    >
                      {(['mensal', 'anual'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePeriodicidadeJuros(p)}
                          className={`text-xs py-2.5 font-bold rounded-lg transition-all cursor-pointer min-h-[2.75rem] ${
                            jurosPeriodicidade === p
                              ? 'bg-white text-[#800020] shadow-xs'
                              : 'text-slate-600 hover:text-slate-800'
                          }`}
                          aria-pressed={jurosPeriodicidade === p}
                        >
                          {periodicidadeLabel(p)}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">{periodicidadeResumo(jurosPeriodicidade)}</p>
                  </div>

                  {/* Campo: Valor Inicial */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="valor-inicial" className="text-xs font-semibold text-slate-700 flex items-center">
                      Quanto você já tem (R$)
                      <FieldHint text="Valor que você já possui guardado hoje, antes dos aportes mensais." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold" aria-hidden="true">R$</span>
                      <input
                        id="valor-inicial"
                        type="text"
                        inputMode="numeric"
                        value={valorInicialStr}
                        onChange={(e) => setValorInicialStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aporte-mensal" className="text-xs font-semibold text-slate-700 flex items-center">
                      Quanto guardar por mês (R$)
                      <FieldHint text="Valor que você pretende investir todo mês." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold" aria-hidden="true">R$</span>
                      <input
                        id="aporte-mensal"
                        type="text"
                        inputMode="numeric"
                        value={aporteMensalStr}
                        onChange={(e) => setAporteMensalStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="tempo-periodo" className="text-xs font-semibold text-slate-700 flex items-center">
                      {tempoFieldLabel(jurosPeriodicidade)}
                      <FieldHint text={tempoFieldHint(jurosPeriodicidade)} />
                    </label>
                    <input
                      id="tempo-periodo"
                      type="number"
                      min="0"
                      value={tempo || ''}
                      onChange={(e) => setTempo(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="taxa-rendimento" className="text-xs font-semibold text-slate-700 flex items-center">
                      {taxaFieldLabel(jurosPeriodicidade)}
                      <FieldHint text={taxaFieldHint(jurosPeriodicidade)} />
                    </label>
                    <div className="relative">
                      <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-bold">
                        {taxaFieldSuffix(jurosPeriodicidade)}
                      </span>
                      <input
                        id="taxa-rendimento"
                        type="number"
                        step="0.01"
                        min="0"
                        value={taxaAnual || ''}
                        onChange={(e) => handleTaxaAnualChange(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full pl-4 pr-24 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#800020]" aria-hidden="true" />
                      <span>
                        Quer calcular <strong className="font-semibold text-slate-600">juros simples</strong>? Basta não preencher a taxa de juros (deixe em 0%) — o resultado considerará apenas o valor investido, sem capitalização de rendimentos.
                      </span>
                    </p>
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
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
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
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  {/* Campo: Plano de Saúde */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <label className="text-xs font-semibold text-slate-700">Plano de Saúde Mensal (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cltSaudeStr}
                        onChange={(e) => setCltSaudeStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  {/* Campo: Outros Benefícios / Transporte */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <label className="text-xs font-semibold text-slate-700 flex items-center">
                      Outros Benefícios Mensal (R$)
                      <FieldHint text="Valor mensal de transporte, auxílio home office, gympass e demais benefícios fixos pagos pela empresa." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cltOutrosStr}
                        onChange={(e) => setCltOutrosStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
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
                    <label htmlFor="aposentadoria-idade-atual" className="text-xs font-semibold text-slate-700 flex items-center">
                      Sua idade hoje
                      <FieldHint text="Idade atual usada para calcular o tempo até a aposentadoria." />
                    </label>
                    <input
                      id="aposentadoria-idade-atual"
                      type="number"
                      min="1"
                      max="120"
                      value={aposentadoriaIdadeAtual || ''}
                      onChange={(e) => {
                        const idade = Math.max(1, Math.min(120, parseInt(e.target.value) || 1));
                        setAposentadoriaIdadeAtual(idade);
                        if (aposentadoriaIdadeAlvo <= idade) {
                          setAposentadoriaIdadeAlvo(Math.min(120, idade + 1));
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aposentadoria-idade-alvo" className="text-xs font-semibold text-slate-700 flex items-center">
                      Idade para aposentar
                      <FieldHint text="Com quantos anos você quer parar de trabalhar." />
                    </label>
                    <input
                      id="aposentadoria-idade-alvo"
                      type="number"
                      min={Math.max(2, aposentadoriaIdadeAtual + 1)}
                      max="120"
                      value={aposentadoriaIdadeAlvo || ''}
                      onChange={(e) => {
                        const minAlvo = Math.max(2, aposentadoriaIdadeAtual + 1);
                        setAposentadoriaIdadeAlvo(Math.max(minAlvo, Math.min(120, parseInt(e.target.value) || minAlvo)));
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                      placeholder="0"
                    />
                  </div>

                  {/* Renda Desejada */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center">
                      Renda mensal desejada (R$)
                      <FieldHint text="Quanto você quer receber por mês na aposentadoria." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={aposentadoriaRendaDesejadaStr}
                        onChange={(e) => setAposentadoriaRendaDesejadaStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center">
                      Quanto já guardou (R$)
                      <FieldHint text="Patrimônio que você já possui investido. Deixe zero se ainda não guardou." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={aposentadoriaPatrimonioAtualStr}
                        onChange={(e) => setAposentadoriaPatrimonioAtualStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0"
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

                  {/* Salário */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center">
                      Salário bruto (R$)
                      <FieldHint text="Seu salário bruto mensal na carteira assinada." />
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={rescisaoSalarioStr}
                        onChange={(e) => setRescisaoSalarioStr(formatMilhar(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rescisao-admissao" className="text-xs font-semibold text-slate-700 flex items-center">
                      Data de admissão
                      <FieldHint text="Quando você começou a trabalhar nesta empresa." />
                    </label>
                    <input
                      id="rescisao-admissao"
                      type="date"
                      value={rescisaoDataAdmissao}
                      onChange={(e) => setRescisaoDataAdmissao(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rescisao-desligamento" className="text-xs font-semibold text-slate-700 flex items-center">
                      Data de desligamento
                      <FieldHint text="Último dia trabalhado ou data da rescisão." />
                    </label>
                    <input
                      id="rescisao-desligamento"
                      type="date"
                      value={rescisaoDataDesligamento}
                      onChange={(e) => setRescisaoDataDesligamento(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all min-h-[2.75rem]"
                    />
                  </div>

                  {!isAdvanced && (
                    <p className="text-[10px] text-slate-500 bg-slate-50 rounded-lg px-2.5 py-2">
                      Tempo calculado: {rescisaoMesesEfetivos} meses · {rescisaoDiasEfetivos} dias no último mês
                    </p>
                  )}

                  {/* Motivo do Desligamento */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center">
                      Tipo de rescisão
                      <FieldHint text="O motivo do desligamento muda o valor do FGTS e das multas." />
                    </label>
                    <select
                      value={rescisaoMotivo}
                      onChange={(e) => setRescisaoMotivo(e.target.value as RescisaoMotivo)}
                      className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl focus:outline-hidden focus:border-[#800020] cursor-pointer min-h-[2.75rem]"
                    >
                      <option value="sem_justa">Sem justa causa (empresa)</option>
                      <option value="pedido_demissao">Pedido de demissão</option>
                      <option value="com_justa">Com justa causa</option>
                      <option value="acordo">Acordo trabalhista</option>
                    </select>
                  </div>
                </>
              )}

              <PersonalizeTrigger
                isAdvanced={isAdvanced}
                onOpen={() => setCalculatorMode('advanced')}
                onClose={() => setCalculatorMode('simple')}
                openLabel={activeTool === 'aposentadoria' ? 'Modo completo' : undefined}
                closeLabel={activeTool === 'aposentadoria' ? '← Voltar ao modo simples' : undefined}
              />

              {isAdvanced && (
                <CalculatorAdvancedFields
                  activeTool={activeTool}
                  advanced={advancedOptions}
                  onChange={patchAdvancedOptions}
                  aposentadoriaSalarioAtualNum={aposentadoriaSalarioAtualNum}
                  defaultOpen
                  jurosUi={
                    activeTool === 'juros'
                      ? {
                          taxaPeriodo,
                          taxaTipo,
                          taxaAnual,
                          selicRate,
                          onTaxaPeriodoChange: handleTaxaPeriodoChange,
                          onTaxaTipoChange: handleTaxaTipoChange,
                          onTaxaAnualChange: handleTaxaAnualChange,
                        }
                      : undefined
                  }
                  aposentadoriaUi={
                    activeTool === 'aposentadoria'
                      ? {
                          salarioStr: aposentadoriaSalarioAtualStr,
                          onSalarioChange: setAposentadoriaSalarioAtualStr,
                        }
                      : undefined
                  }
                />
              )}

              <CalculatorActionBar onClear={handleClearData} onSavePdf={handleSavePdf} />

          </div>

          {/* LADO DIREITO (Width: 3/4) */}
          <div className="order-2 lg:order-2 lg:col-span-3 lg:col-start-2 lg:row-start-1 calc-panel-results flex flex-col gap-6 sm:gap-8">
            
            {activeTool === 'juros' && (
              <p className="calc-periodicity-badge w-fit" aria-live="polite">
                <Percent className="w-3.5 h-3.5 text-[#800020]" aria-hidden="true" />
                {periodicidadeResumo(jurosPeriodicidade)}
              </p>
            )}

            {/* GRID DO TOPO: CARDS DE RESULTADOS DESTACADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-stretch">
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
                    className={`calc-card shadow-xs justify-between min-h-[145px] relative overflow-hidden transition-all duration-300 ${
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

                    <div className="min-w-0 pr-8">
                      <span className={`calc-card-title ${isHighlight ? 'text-white/90' : 'text-slate-500'}`}>
                        {card.titulo}
                      </span>
                      <CurrencyAmount
                        as="h3"
                        value={card.valor}
                        variant={isHighlight ? 'highlight' : 'card'}
                        className={`mt-1.5 ${isHighlight ? 'text-white' : 'text-slate-800'}`}
                      />
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
                    <div className={`px-3 py-1 rounded-lg font-bold border text-xs font-mono ${
                      cltPjExtra?.melhorCenario === 'PJ'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      Cenário Recomendado: {cltPjExtra?.melhorCenario ?? '—'}
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
                            <span className="font-semibold text-emerald-700 font-mono">+{formatBRL(cltData.beneficiosMensais)}</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span className="text-slate-500">FGTS Provisionado (Equiv. Mensal)</span>
                            <span className="font-semibold text-slate-600 font-mono">+{formatBRL(cltData.fgtsAnual / 12)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-50 bg-[#800020]/5 rounded-xl p-3">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Renda Equiv. Mensal Real CLT</span>
                        <CurrencyAmount
                          as="div"
                          value={cltData.receitaMensalEquiv}
                          variant="compact"
                          className="text-[#800020] mt-1"
                        />
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
                            <CurrencyAmount
                              value={pjData.minimoFaturamento}
                              variant="inline"
                              className="font-extrabold text-[#800020]"
                            />
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
                        <CurrencyAmount
                          as="div"
                          value={cltPjExtra?.vantagemAnual || 0}
                          variant="compact"
                          prefix={cltPjExtra?.vantagemAnual && cltPjExtra.vantagemAnual >= 0 ? '+' : ''}
                          className="text-emerald-700 mt-1"
                        />
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
                          <CurrencyAmount
                            as="span"
                            value={aposentadoriaData.patrimonioNecessario}
                            variant="compact"
                            className="text-slate-900 mt-1 block"
                          />
                          <span className="text-[10px] text-slate-500 font-sans mt-1 block leading-normal">
                            Baseia-se na Regra de retirada real líquida de <strong>0,35% ao mês</strong> (4% ao ano real) para nunca consumir o patrimônio construído.
                          </span>
                        </div>

                        <div className="flex justify-between py-1 text-slate-600">
                          <span>Rendimento Estimado do Saldo Atual</span>
                          <span className="font-bold font-mono text-emerald-700">+{formatBRL(aposentadoriaData.patrimonioAtualFuturo)}</span>
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
                    <CurrencyAmount
                      as="span"
                      value={aposentadoriaData.aporteMensalNecessario}
                      variant="badge"
                      className="text-white mt-1 block"
                    />
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
                        {{
                          sem_justa: 'Sem Justa Causa (Empregador)',
                          pedido_demissao: 'Pedido de Demissão',
                          com_justa: 'Com Justa Causa',
                          acordo: 'Acordo Trabalhista',
                        }[rescisaoData.motivo as RescisaoMotivo] ?? rescisaoData.motivo}
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
                          {(rescisaoData.motivo === 'sem_justa' || rescisaoData.motivo === 'acordo') && (
                            <tr>
                              <td className="py-3 font-medium text-[#800020]">
                                Multa Rescisória de FGTS ({rescisaoData.motivo === 'acordo' ? '20%' : '40%'})
                              </td>
                              <td className="py-3 text-right text-rose-500">Liberado pelo motivo de demissão</td>
                              <td className="py-3 text-right font-extrabold font-mono text-emerald-700">+{formatBRL(rescisaoData.fgts.multa)}</td>
                            </tr>
                          )}
                          {rescisaoData.avisoPrevioValor > 0 && (
                            <tr>
                              <td className="py-3 font-medium text-slate-800">Aviso Prévio Indenizado</td>
                              <td className="py-3 text-right text-slate-500">Modo avançado</td>
                              <td className="py-3 text-right font-semibold font-mono text-slate-800">{formatBRL(rescisaoData.avisoPrevioValor)}</td>
                            </tr>
                          )}
                          <tr className="bg-slate-50/75 select-none text-slate-700">
                            <td className="py-3 px-2 font-bold flex items-center gap-1.5">
                              FGTS Sacável Estimado Total 
                              {!rescisaoData.fgts.liberado && <span className="text-[9px] font-medium text-rose-500 font-sans">(Retido pelo motivo)</span>}
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
        </div>

        <div className="mt-8 px-3 md:px-5 lg:px-7">
          <Suspense fallback={null}>
            <MethodologyPanel toolId={activeTool} liveParams={methodologyLiveParams} />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ToolSeoContent content={toolContent} />
        </Suspense>
      </main>

      <AdSlotFooter />

      <SiteFooter disclaimer="As taxas exibidas são de caráter informativo com base em indicadores macroeconômicos. Retornos passados não garantem rendimentos futuros. Os resultados aqui providos são estimativas matemáticas com base em aportes regulares constantes, não representando de forma alguma assessoria ou recomendação individualizada de investimentos financeiros." />

      <Suspense fallback={null}>
        <HowToUseModal
          open={howToUseOpen}
          onClose={() => setHowToUseOpen(false)}
          content={HOW_TO_USE[activeTool]}
        />
      </Suspense>

    </div>
  );
}
