import { SITE_AUTHOR } from './site';

export const CONTENT_AUTHOR = {
  name: SITE_AUTHOR,
  role: 'Especialistas em educação financeira',
  bio: 'Conteúdo produzido por profissionais com experiência em planejamento financeiro pessoal, legislação trabalhista brasileira e matemática financeira aplicada.',
} as const;

export const CONTENT_UPDATED = '2026-06-15';

export const EDUCATIONAL_DISCLAIMER =
  'Conteúdo exclusivamente educativo. Os cálculos são estimativas baseadas em fórmulas públicas e parâmetros informados por você. Não constitui recomendação de investimento, assessoria jurídica ou consultoria tributária. Consulte profissionais habilitados antes de decisões financeiras relevantes.';

export const CALCULATION_TRANSPARENCY =
  'Todos os cálculos são executados localmente no seu navegador. Nenhum dado financeiro inserido é enviado ou armazenado em servidores. As taxas de mercado (Selic, IPCA, câmbio) são obtidas de APIs públicas gratuitas do Banco Central do Brasil e AwesomeAPI, com valores de fallback quando indisponíveis.';

export const SOURCES_BCB = 'Banco Central do Brasil — Séries temporais SGS (Selic meta série 432, IPCA série 13522)';
export const SOURCES_CVM = 'Comissão de Valores Mobiliários (CVM) — Portal do Investidor e regulamentação de mercado de capitais';
export const SOURCES_TESOURO = 'Tesouro Nacional — Tesouro Direto (títulos públicos federais)';
export const SOURCES_B3 = 'B3 S.A. — Bolsa de Valores, ETFs e mercado de capitais brasileiro';
export const SOURCES_INSS = 'Instituto Nacional do Seguro Social (INSS) — Previdência Social e benefícios';
export const SOURCES_PREVIDENCIA = 'Ministério da Previdência Social — regras e legislação previdenciária';
export const SOURCES_RECEITA = 'Receita Federal do Brasil — tributação, MEI e Simples Nacional';
export const SOURCES_MT = 'Ministério do Trabalho e Emprego — legislação trabalhista e direitos do trabalhador';
export const SOURCES_GOV = 'Gov.br — informações oficiais do Governo Federal';
export const SOURCES_SEBRAE = 'SEBRAE — apoio ao empreendedorismo e gestão de pequenos negócios';
export const SOURCES_CLT = 'Consolidação das Leis do Trabalho (CLT) — arts. 477 e correlatos sobre rescisão contratual';
export const SOURCES_ANPD = 'Autoridade Nacional de Proteção de Dados (ANPD) — Lei nº 13.709/2018 (LGPD)';

export const SOURCES = {
  BCB: SOURCES_BCB,
  CVM: SOURCES_CVM,
  TESOURO: SOURCES_TESOURO,
  B3: SOURCES_B3,
  INSS: SOURCES_INSS,
  PREVIDENCIA: SOURCES_PREVIDENCIA,
  RECEITA: SOURCES_RECEITA,
  MT: SOURCES_MT,
  GOV: SOURCES_GOV,
  SEBRAE: SOURCES_SEBRAE,
  CLT: SOURCES_CLT,
  ANPD: SOURCES_ANPD,
} as const;
