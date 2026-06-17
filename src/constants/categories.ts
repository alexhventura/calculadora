import { ROUTES, toolPath } from './routes';

export interface SeoCategory {
  slug: string;
  name: string;
  description: string;
  tools: { label: string; href: string; available: boolean }[];
  blogSlugs: string[];
}

export const SEO_CATEGORIES: SeoCategory[] = [
  {
    slug: 'investimentos',
    name: 'Investimentos',
    description:
      'Ferramentas para simular rentabilidade, juros compostos e comparar rendimentos entre Poupança, Selic e CDI.',
    tools: [
      { label: 'Juros Compostos', href: toolPath('juros'), available: true },
      { label: 'Rentabilidade Real', href: toolPath('juros'), available: true },
      { label: 'Comparador CDI vs Poupança', href: toolPath('juros'), available: true },
    ],
    blogSlugs: ['cdi-ou-poupanca', 'tesouro-direto-vale-a-pena', 'como-calcular-juros-compostos'],
  },
  {
    slug: 'financas-pessoais',
    name: 'Finanças Pessoais',
    description:
      'Planejamento financeiro, metas de patrimônio e simulações para decisões do dia a dia.',
    tools: [
      { label: 'Juros Compostos', href: toolPath('juros'), available: true },
      { label: 'Conversor de Moedas', href: ROUTES.conversorMoedas, available: true },
    ],
    blogSlugs: ['como-sair-das-dividas', 'quanto-investir-para-se-aposentar'],
  },
  {
    slug: 'aposentadoria',
    name: 'Aposentadoria',
    description:
      'Simule patrimônio necessário, lacuna de renda e aportes mensais para complementar o INSS.',
    tools: [
      { label: 'Calculadora de Aposentadoria', href: toolPath('aposentadoria'), available: true },
      { label: 'Juros Compostos', href: toolPath('juros'), available: true },
    ],
    blogSlugs: ['quanto-investir-para-se-aposentar'],
  },
  {
    slug: 'emprestimos',
    name: 'Empréstimos',
    description:
      'Em breve: simuladores de parcelas, custo efetivo total e amortização. Enquanto isso, use nossas calculadoras de investimento.',
    tools: [
      { label: 'Juros Compostos', href: toolPath('juros'), available: true },
      { label: 'Simulador de Empréstimo', href: '#', available: false },
    ],
    blogSlugs: ['como-sair-das-dividas'],
  },
  {
    slug: 'salario-clt',
    name: 'Salário e CLT',
    description:
      'Compare regimes de trabalho, calcule verbas rescisórias e entenda o custo real do emprego formal.',
    tools: [
      { label: 'CLT vs PJ', href: toolPath('clt-pj'), available: true },
      { label: 'Rescisão Trabalhista', href: toolPath('rescisao'), available: true },
    ],
    blogSlugs: [],
  },
  {
    slug: 'impostos',
    name: 'Impostos',
    description:
      'Ferramentas que consideram tributação progressiva em simulações trabalhistas e de renda.',
    tools: [
      { label: 'CLT vs PJ', href: toolPath('clt-pj'), available: true },
      { label: 'Simulador de IR', href: '#', available: false },
    ],
    blogSlugs: [],
  },
  {
    slug: 'empreendedorismo',
    name: 'Empreendedorismo',
    description:
      'Analise faturamento mínimo como PJ, custos fixos e equivalência com salário CLT.',
    tools: [
      { label: 'CLT vs PJ', href: toolPath('clt-pj'), available: true },
      { label: 'Juros Compostos', href: toolPath('juros'), available: true },
    ],
    blogSlugs: [],
  },
];

export function getCategoryBySlug(slug: string): SeoCategory | undefined {
  return SEO_CATEGORIES.find((c) => c.slug === slug);
}
