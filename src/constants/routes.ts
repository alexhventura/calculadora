import type { ActiveTool } from '../utils/calculations/toolCalculations';

export const ROUTES = {
  home: '/',
  jurosCompostos: '/juros-compostos',
  calculadoraCdi: '/calculadora-cdi',
  calculadoraIpca: '/calculadora-ipca',
  cltPj: '/clt-pj',
  aposentadoria: '/aposentadoria',
  rescisao: '/rescisao-trabalhista',
  conversorMoedas: '/conversor-de-moedas',
  blog: '/blog',
  sobre: '/sobre',
  privacidade: '/politica-de-privacidade',
  termos: '/termos-de-uso',
  cookies: '/politica-de-cookies',
  isencao: '/isencao-de-responsabilidade',
  categoria: (slug: string) => `/categoria/${slug}`,
  calculadora: (slug: string) => `/calculadora/${slug}`,
  blogPost: (slug: string) => `/blog/${slug}`,
} as const;

export const TOOL_SLUGS: Record<ActiveTool, string> = {
  juros: 'juros-compostos',
  'clt-pj': 'clt-vs-pj',
  aposentadoria: 'aposentadoria',
  rescisao: 'rescisao-trabalhista',
};

export const SLUG_TO_TOOL: Record<string, ActiveTool> = {
  'juros-compostos': 'juros',
  'clt-vs-pj': 'clt-pj',
  'clt-pj': 'clt-pj',
  aposentadoria: 'aposentadoria',
  'rescisao-trabalhista': 'rescisao',
};

/** Caminhos canônicos curtos por ferramenta (SEO) */
export const TOOL_CANONICAL_PATH: Record<ActiveTool, string> = {
  juros: ROUTES.jurosCompostos,
  'clt-pj': ROUTES.cltPj,
  aposentadoria: ROUTES.aposentadoria,
  rescisao: ROUTES.rescisao,
};

export function toolPath(tool: ActiveTool): string {
  return TOOL_CANONICAL_PATH[tool];
}

export const ALL_INDEXABLE_PATHS = [
  ROUTES.home,
  ROUTES.calculadoraCdi,
  ROUTES.calculadoraIpca,
  ROUTES.cltPj,
  ROUTES.aposentadoria,
  ROUTES.rescisao,
  ROUTES.conversorMoedas,
  ROUTES.blog,
  ROUTES.sobre,
  ROUTES.privacidade,
  ROUTES.termos,
  ROUTES.cookies,
  ROUTES.isencao,
  ROUTES.categoria('investimentos'),
  ROUTES.categoria('financas-pessoais'),
  ROUTES.categoria('aposentadoria'),
  ROUTES.categoria('emprestimos'),
  ROUTES.categoria('salario-clt'),
  ROUTES.categoria('impostos'),
  ROUTES.categoria('empreendedorismo'),
  ROUTES.blogPost('como-calcular-juros-compostos'),
  ROUTES.blogPost('quanto-investir-para-se-aposentar'),
  ROUTES.blogPost('cdi-ou-poupanca'),
  ROUTES.blogPost('tesouro-direto-vale-a-pena'),
  ROUTES.blogPost('como-sair-das-dividas'),
] as const;
