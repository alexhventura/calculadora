import type { BlogArticle } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'como-calcular-juros-compostos',
    title: 'Como Calcular Juros Compostos: Guia Completo com Fórmula e Exemplos',
    metaDescription:
      'Aprenda a calcular juros compostos passo a passo. Fórmula, exemplos práticos, diferença para juros simples e calculadora gratuita online.',
    publishedAt: '2026-03-01',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com.br',
    category: 'Investimentos',
    readTimeMinutes: 8,
    intro:
      'Juros compostos são a base do crescimento patrimonial de longo prazo. Neste guia, você aprende a fórmula, evita erros comuns e pode simular cenários reais com nossa calculadora gratuita.',
    sections: [
      {
        id: 'formula',
        title: 'A fórmula dos juros compostos',
        paragraphs: [
          'A fórmula fundamental é M = P × (1 + i)^n. Para aportes mensais regulares, o cálculo envolve uma série de pagamentos com capitalização — use nossa calculadora para não errar na conversão de taxas.',
          'A conversão correta entre taxa anual e mensal é: i_m = (1 + i_a)^(1/12) − 1. Nunca divida a taxa anual por 12 de forma simples.',
        ],
      },
      {
        id: 'passo-a-passo',
        title: 'Passo a passo para calcular',
        paragraphs: [
          'Defina o valor inicial, o aporte mensal, o período e a taxa de rendimento. Compare com referências de mercado como Poupança, Selic e CDI para contextualizar seu investimento.',
          'Analise o gráfico de evolução e exporte a tabela em CSV para acompanhar mês a mês.',
        ],
        list: [
          'Valor inicial e aportes mensais.',
          'Período em anos ou meses.',
          'Taxa manual ou de mercado.',
          'Comparação com benchmarks.',
        ],
      },
    ],
    faq: [
      {
        question: 'Qual a fórmula de juros compostos?',
        answer: 'M = P × (1 + i)^n, onde M é o montante, P o principal, i a taxa por período e n o número de períodos.',
      },
      {
        question: 'Onde posso simular juros compostos grátis?',
        answer: `Use nossa calculadora em ${toolPath('juros')} — gratuita, sem cadastro e com comparativo Poupança vs Selic.`,
      },
    ],
  },
  {
    slug: 'quanto-investir-para-se-aposentar',
    title: 'Quanto Investir para se Aposentar: Cálculo Prático',
    metaDescription:
      'Descubra quanto investir por mês para se aposentar com tranquilidade. Lacuna INSS, patrimônio necessário e aportes mensais.',
    publishedAt: '2026-03-15',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com.br',
    category: 'Aposentadoria',
    readTimeMinutes: 7,
    intro:
      'Aposentar-se com conforto exige planejamento antecipado. Entenda como calcular a lacuna de renda do INSS e o patrimônio complementar necessário.',
    sections: [
      {
        id: 'lacuna',
        title: 'A lacuna de renda do INSS',
        paragraphs: [
          'O teto do INSS limita o benefício máximo. Se sua renda desejada supera esse valor, você precisa de patrimônio privado para cobrir a diferença.',
          'A regra dos 0,35% ao mês é uma referência: R$ 1.000/mês de renda exigem ~R$ 285.714 de patrimônio.',
        ],
      },
      {
        id: 'aportes',
        title: 'Quanto aportar por mês',
        paragraphs: [
          'Quanto mais cedo começar, menor o aporte necessário graças aos juros compostos. Use nossa calculadora de aposentadoria com sua idade, meta e patrimônio atual.',
        ],
      },
    ],
    faq: [
      {
        question: 'Com que idade devo começar a investir para aposentadoria?',
        answer: 'O ideal é começar na primeira oportunidade. Cada ano de atraso aumenta significativamente o aporte mensal necessário.',
      },
    ],
  },
  {
    slug: 'cdi-ou-poupanca',
    title: 'CDI ou Poupança: Qual Rende Mais em 2026?',
    metaDescription:
      'Compare CDI e Poupança: regras, rentabilidade, liquidez e tributação. Simule com calculadora de juros compostos.',
    publishedAt: '2026-04-01',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com.br',
    category: 'Investimentos',
    readTimeMinutes: 6,
    intro:
      'A Poupança é a aplicação mais popular do Brasil, mas o CDI — referência de CDBs e fundos DI — costuma render mais. Entenda as diferenças e simule cenários.',
    sections: [
      {
        id: 'poupanca',
        title: 'Como funciona a Poupança',
        paragraphs: [
          'Com Selic acima de 8,5% ao ano, a Poupança rende 0,5% ao mês + TR. Abaixo desse patamar, rende 70% da Selic + TR. Isenta de IR para pessoa física.',
        ],
      },
      {
        id: 'cdi',
        title: 'O que é o CDI',
        paragraphs: [
          'O CDI acompanha de perto a Selic (geralmente Selic menos 0,10 p.p.). CDBs atrelados ao CDI são tributados pelo IR regressivo (22,5% a 15%). Mesmo assim, frequentemente superam a Poupança em rentabilidade líquida.',
        ],
      },
    ],
    faq: [
      {
        question: 'Poupança ou CDB: qual é melhor?',
        answer: 'Para a maioria dos cenários com Selic elevada, CDBs atrelados ao CDI superam a Poupança mesmo após IR. Simule na nossa calculadora.',
      },
    ],
  },
  {
    slug: 'tesouro-direto-vale-a-pena',
    title: 'Tesouro Direto Vale a Pena? Guia para Iniciantes',
    metaDescription:
      'Entenda Tesouro Selic, IPCA+ e Prefixado. Vantagens, riscos, taxas e quando vale a pena investir no Tesouro Direto.',
    publishedAt: '2026-04-15',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com.br',
    category: 'Investimentos',
    readTimeMinutes: 9,
    intro:
      'O Tesouro Direto é a forma mais acessível de investir em títulos públicos federais. Conheça os tipos, riscos e como combinar com planejamento de longo prazo.',
    sections: [
      {
        id: 'tipos',
        title: 'Tipos de títulos do Tesouro',
        paragraphs: [
          'Tesouro Selic: liquidez diária, baixa volatilidade, ideal para reserva de emergência. Tesouro IPCA+: proteção contra inflação + juro real. Tesouro Prefixado: taxa fixa, melhor quando se acredita em queda de juros.',
        ],
      },
      {
        id: 'vale-a-pena',
        title: 'Quando vale a pena',
        paragraphs: [
          'Para reserva de emergência, o Tesouro Selic é excelente. Para aposentadoria, o IPCA+ combina proteção inflacionária com juros reais. Simule o crescimento com nossa calculadora de juros compostos.',
        ],
      },
    ],
    faq: [
      {
        question: 'Tesouro Direto tem risco?',
        answer: 'O risco de crédito é mínimo (governo federal). Títulos IPCA+ e Prefixados podem ter marcação a mercado — volatilidade se vendidos antes do vencimento.',
      },
    ],
  },
  {
    slug: 'como-sair-das-dividas',
    title: 'Como Sair das Dívidas: Método Prático em 7 Passos',
    metaDescription:
      'Guia para quitar dívidas: priorize juros altos, negocie, corte gastos e use juros compostos a seu favor. Plano passo a passo.',
    publishedAt: '2026-05-01',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com.br',
    category: 'Finanças Pessoais',
    readTimeMinutes: 8,
    intro:
      'Dívidas com juros altos destroem patrimônio. Este guia apresenta um método prático para sair do vermelho e começar a investir.',
    sections: [
      {
        id: 'passos',
        title: '7 passos para sair das dívidas',
        paragraphs: [
          'Liste todas as dívidas com taxa de juros. Priorize as mais caras (cartão de crédito, cheque especial). Negocie descontos à vista. Corte gastos supérfluos. Crie reserva mínima de emergência. Evite novas dívidas. Direcione o excedente para investimentos.',
          'Os juros compostos que destroem patrimônio quando você deve, são os mesmos que constroem riqueza quando você investe. Após quitar dívidas caras, use nossa calculadora para projetar seu crescimento.',
        ],
        list: [
          'Mapear todas as dívidas e taxas.',
          'Priorizar dívidas com juros mais altos.',
          'Negociar com credores.',
          'Reduzir gastos e aumentar renda.',
          'Criar reserva de emergência.',
          'Evitar novos parcelamentos.',
          'Investir o excedente com disciplina.',
        ],
      },
    ],
    faq: [
      {
        question: 'Devo investir ou quitar dívidas primeiro?',
        answer: 'Quase sempre priorize dívidas com juros acima de 1% ao mês. Nenhum investimento seguro supera o custo do cartão de crédito rotativo.',
      },
    ],
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getBlogListUrl(): string {
  return ROUTES.blog;
}
