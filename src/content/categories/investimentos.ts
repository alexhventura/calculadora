import type { HubContentBase } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';
import {
  SOURCES_BCB,
  SOURCES_B3,
  SOURCES_CVM,
  SOURCES_TESOURO,
} from '../../constants/eeat';

export const investimentosHub: HubContentBase = {
  slug: 'investimentos',
  h1: 'Guia Completo de Investimentos no Brasil',
  metaTitle: 'Investimentos no Brasil: Guia Completo 2026 | CDI, Selic, Tesouro e Mais',
  metaDescription:
    'Aprenda a investir com segurança: juros compostos, CDI, Selic, IPCA, Tesouro Direto, CDB, LCI, fundos, ETFs, diversificação e perfil de investidor. Conteúdo baseado em fontes oficiais.',
  intro:
    'Investir é alocar recursos hoje com a expectativa de retorno futuro — mas no Brasil isso envolve entender indicadores como CDI e Selic, produtos regulados pela CVM e títulos do Tesouro Nacional. Este guia reúne conceitos fundamentais, instrumentos disponíveis ao investidor pessoa física e princípios de gestão de risco, sempre com referência a fontes oficiais do Banco Central, CVM, Tesouro Direto e B3.',
  updatedAt: '2026-06-15',
  author: 'Equipe calculojuroscompostos.com',
  sections: [
    {
      id: 'o-que-sao',
      title: 'O que são investimentos',
      paragraphs: [
        'Investimento, no sentido financeiro, é a aplicação de capital em ativos com potencial de geração de retorno ao longo do tempo. Diferente da poupança puramente especulativa, investir pressupõe horizonte definido, tolerância a risco e objetivos claros — aposentadoria, compra de imóvel, independência financeira ou preservação patrimonial.',
        'No Brasil, o mercado de capitais é regulado principalmente pela Comissão de Valores Mobiliários (CVM), que define regras de transparência, prospectos e conduta para emissores, administradores e distribuidores. O Banco Central supervisiona instituições financeiras e a política monetária que influencia diretamente a rentabilidade da renda fixa.',
      ],
      subsections: [
        {
          id: 'renda-fixa-vs-variavel',
          title: 'Renda fixa e renda variável',
          paragraphs: [
            'Renda fixa oferece regras de remuneração conhecidas no momento da aplicação ou indexadas a indicadores (CDI, IPCA, Selic). Exemplos: CDB, LCI, LCA, Tesouro Direto. Renda variável tem retorno incerto: ações, FIIs, ETFs de equity. A escolha depende do perfil, prazo e necessidade de liquidez.',
          ],
        },
        {
          id: 'liquidez-risco-retorno',
          title: 'Liquidez, risco e retorno',
          paragraphs: [
            'Todo investimento equilibra três variáveis: liquidez (facilidade de resgate), risco (probabilidade de perda) e retorno esperado. Produtos mais líquidos e seguros tendem a pagar menos; ativos de maior risco exigem compensação via prêmio de retorno e horizonte longo.',
          ],
        },
      ],
    },
    {
      id: 'juros-compostos',
      title: 'Juros compostos: o motor do patrimônio',
      paragraphs: [
        'Juros compostos fazem o rendimento incidir sobre o montante acumulado, não apenas sobre o capital inicial. A fórmula M = P × (1 + i)^n descreve o crescimento exponencial quando há capitalização periódica. Com aportes mensais regulares, o efeito se amplifica: nos últimos anos de um plano de 20 anos, os juros podem superar os próprios aportes.',
        'Para o investidor brasileiro, a capitalização mensal ou diária (252 dias úteis em CDBs e fundos DI) é padrão. Erro comum: confundir 1% ao mês com 12% ao ano — a taxa anual equivalente é ~12,68% pela composição.',
      ],
      list: [
        'Quanto maior o prazo, maior o peso dos juros no montante final.',
        'Consistência nos aportes importa mais que buscar a maior taxa pontual.',
        'Simule cenários com nossa calculadora de juros compostos antes de definir metas.',
      ],
    },
    {
      id: 'indicadores',
      title: 'CDI, Selic e IPCA: indicadores essenciais',
      paragraphs: [
        'A taxa Selic é a taxa básica de juros da economia brasileira, definida pelo Copom do Banco Central. O CDI (Certificado de Depósito Interbancário) acompanha a Selic de perto e serve de referência para a maioria dos investimentos de renda fixa pós-fixados. O IPCA mede a inflação oficial e é usado em títulos indexados e no cálculo de rentabilidade real.',
      ],
      subsections: [
        {
          id: 'selic',
          title: 'Selic',
          paragraphs: [
            'A meta Selic influencia o custo do crédito, a atratividade da renda fixa e o câmbio. Investimentos atrelados à Selic (como o Tesouro Selic) tendem a ser indicados para reserva de emergência por liquidez diária e baixo risco de crédito soberano.',
          ],
        },
        {
          id: 'cdi',
          title: 'CDI',
          paragraphs: [
            'CDBs, LCIs, LCAs e fundos DI costumam render um percentual do CDI — por exemplo, 100% ou 110% do CDI. Comparar produtos apenas pelo percentual sem considerar prazo, liquidez, garantia do FGC e tributação pode levar a decisões equivocadas.',
          ],
        },
        {
          id: 'ipca',
          title: 'IPCA e rentabilidade real',
          paragraphs: [
            'Rentabilidade real desconta a inflação: r_real ≈ (1 + r_nominal)/(1 + inflação) − 1. O Tesouro IPCA+ paga taxa fixa + variação do IPCA, protegendo o poder de compra no longo prazo. Use nossa calculadora IPCA para visualizar o impacto inflacionário.',
          ],
        },
      ],
    },
    {
      id: 'tesouro-direto',
      title: 'Tesouro Direto',
      paragraphs: [
        'O Tesouro Direto é o programa do Tesouro Nacional que permite a compra de títulos públicos federais por pessoas físicas, com custódia na B3. Os principais títulos são Tesouro Selic (LFT), Tesouro Prefixado (LTN, NTN-F) e Tesouro IPCA+ (NTN-B).',
        'Vantagens: risco de crédito soberano (governo federal), liquidez diária, investimento mínimo acessível e isenção de IOF após 30 dias. Desvantagens: marcação a mercado em títulos prefixados e IPCA+ (preço oscila antes do vencimento) e taxa de custódia da B3.',
      ],
      list: [
        'Tesouro Selic — ideal para reserva de emergência.',
        'Tesouro Prefixado — aposta em queda de juros futuros.',
        'Tesouro IPCA+ — proteção contra inflação no longo prazo.',
      ],
    },
    {
      id: 'cdb-lci-lca',
      title: 'CDB, LCI e LCA',
      paragraphs: [
        'CDB (Certificado de Depósito Bancário) é emitido por bancos para captar recursos. A rentabilidade costuma ser percentual do CDI. LCIs e LCAs são títulos de crédito imobiliário e do agronegócio, respectivamente, com isenção de IR para pessoa física — o que pode resultar em retorno líquido superior ao CDB com mesma taxa bruta.',
        'Todos contam com garantia do FGC até R$ 250 mil por CPF por instituição. Diversificar entre emissores reduz risco de concentração, mesmo dentro do limite do FGC.',
      ],
    },
    {
      id: 'fundos-etfs',
      title: 'Fundos de investimento e ETFs',
      paragraphs: [
        'Fundos de investimento reúnem recursos de vários cotistas sob gestão profissional, regulados pela CVM. Fundos DI replicam CDI; multimercado e ações buscam retornos superiores com maior volatilidade. ETFs (Exchange Traded Funds) são fundos negociados em bolsa como ações, com taxas geralmente menores e transparência de carteira — regulados pela CVM e listados na B3.',
        'Antes de investir, leia o prospecto e o regulamento, verifique taxa de administração, performance e política de investimento.',
      ],
    },
    {
      id: 'diversificacao',
      title: 'Diversificação e gestão de risco',
      paragraphs: [
        'Diversificar é distribuir recursos entre classes de ativos, emissores, prazos e moedas para reduzir o impacto de um único evento adverso. Correlação baixa entre ativos melhora a relação risco-retorno da carteira.',
        'Gestão de risco inclui definir alocação alvo (ex.: 60% renda fixa, 30% variável, 10% internacional), rebalancear periodicamente e nunca investir valores necessários para despesas de curto prazo em ativos voláteis.',
      ],
      list: [
        'Reserva de emergência em ativos líquidos antes de buscar maior retorno.',
        'Evite concentrar mais de 20% do patrimônio em um único emissor ou setor.',
        'Revise a carteira ao mudar objetivos ou estágio de vida.',
      ],
    },
    {
      id: 'perfil-investidor',
      title: 'Perfil do investidor e planejamento de longo prazo',
      paragraphs: [
        'O perfil (conservador, moderado, arrojado) reflete tolerância a volatilidade e horizonte temporal. Questionários de suitability, exigidos por corretoras, ajudam a identificar incompatibilidades entre produto e investidor.',
        'Planejamento de longo prazo articula metas (idade de aposentadoria, valor alvo), aportes periódicos, taxa de retorno realista e revisão anual. Ferramentas de simulação com juros compostos transformam metas abstratas em aportes mensais concretos.',
      ],
    },
  ],
  faq: [
    {
      question: 'Qual a diferença entre CDI e Selic?',
      answer:
        'A Selic é a taxa básica de juros definida pelo Banco Central. O CDI acompanha a Selic de perto e é o indexador usado na maioria dos CDBs e fundos DI. Na prática, investir a 100% do CDI significa acompanhar a rentabilidade de referência do mercado interbancário.',
    },
    {
      question: 'Tesouro Direto é seguro?',
      answer:
        'Títulos do Tesouro Nacional têm garantia do governo federal — risco de crédito soberano. Porém, títulos prefixados e IPCA+ podem ter oscilação de preço (marcação a mercado) se vendidos antes do vencimento.',
    },
    {
      question: 'CDB com garantia do FGC é isento de risco?',
      answer:
        'O FGC garante até R$ 250 mil por CPF por instituição em caso de falência do banco. Não cobre marcação a mercado nem instituições fora do sistema. Diversificar emissores continua sendo boa prática.',
    },
    {
      question: 'Como calcular quanto meus investimentos vão render?',
      answer:
        'Use nossa calculadora de juros compostos com valor inicial, aportes, prazo e taxa (manual, CDI ou Selic). Lembre-se: simulações são brutas — desconte IR e taxas para estimativa líquida.',
    },
    {
      question: 'ETF é melhor que fundo tradicional?',
      answer:
        'ETFs costumam ter taxas menores e negociação em bolsa como ações. Fundos tradicionais podem ter gestão ativa e aplicação automática. A escolha depende do objetivo, custos e preferência de gestão.',
    },
    {
      question: 'O que é rentabilidade real?',
      answer:
        'É o ganho acima da inflação. Se um investimento rendeu 10% ao ano e o IPCA foi 5%, a rentabilidade real aproximada é ~4,76%, não 5%.',
    },
  ],
  glossary: [
    { term: 'CDI', definition: 'Certificado de Depósito Interbancário — taxa de empréstimos entre bancos, referência da renda fixa brasileira.' },
    { term: 'Selic', definition: 'Sistema Especial de Liquidação e Custódia — taxa básica de juros da economia, definida pelo Copom do BCB.' },
    { term: 'IPCA', definition: 'Índice Nacional de Preços ao Consumidor Amplo — inflação oficial medida pelo IBGE e usada como meta pelo Banco Central.' },
    { term: 'CDB', definition: 'Certificado de Depósito Bancário — título de renda fixa emitido por bancos, com rentabilidade geralmente atrelada ao CDI.' },
    { term: 'LCI/LCA', definition: 'Letras de Crédito Imobiliário e do Agronegócio — isentas de IR para pessoa física, lastreadas em crédito setorial.' },
    { term: 'FGC', definition: 'Fundo Garantidor de Créditos — protege até R$ 250 mil por CPF por instituição em caso de falência.' },
    { term: 'ETF', definition: 'Exchange Traded Fund — fundo negociado em bolsa que replica índice ou estratégia, com taxas tipicamente baixas.' },
    { term: 'Marcação a mercado', definition: 'Atualização do valor do título conforme preços de mercado — pode gerar ganho ou perda antes do vencimento.' },
  ],
  sources: [SOURCES_BCB, SOURCES_CVM, SOURCES_TESOURO, SOURCES_B3],
  relatedTools: [
    { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Simule patrimônio com aportes e compare Poupança, Selic e CDI.' },
    { label: 'Calculadora CDI', href: ROUTES.calculadoraCdi, description: 'Projete rendimento com taxa CDI atualizada.' },
    { label: 'Calculadora IPCA', href: ROUTES.calculadoraIpca, description: 'Veja o impacto da inflação no poder de compra.' },
    { label: 'Aposentadoria', href: ROUTES.aposentadoria, description: 'Planeje complemento ao INSS com juros compostos.' },
  ],
  relatedCategories: [
    { label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') },
    { label: 'Aposentadoria', href: ROUTES.categoria('aposentadoria') },
  ],
  relatedArticles: [
    { label: 'CDI ou Poupança: qual rende mais?', href: ROUTES.blogPost('cdi-ou-poupanca') },
    { label: 'Tesouro Direto vale a pena?', href: ROUTES.blogPost('tesouro-direto-vale-a-pena') },
    { label: 'Como calcular juros compostos', href: ROUTES.blogPost('como-calcular-juros-compostos') },
  ],
};
