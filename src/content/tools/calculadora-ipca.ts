import type { ToolSeoContent } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';
import { SOURCES_BCB } from '../../constants/eeat';

export const calculadoraIpcaContent: ToolSeoContent = {
  tool: 'juros',
  h1: 'Calculadora IPCA — Simule Poder de Compra e Inflação',
  metaTitle: 'Calculadora IPCA | Simule Inflação e Poder de Compra Real',
  metaDescription:
    'Calcule o impacto do IPCA no seu patrimônio. Simule juros compostos e veja o poder de compra real descontando a inflação. Dados do IBGE via Banco Central.',
  intro:
    'O IPCA (Índice Nacional de Preços ao Consumidor Amplo) é o índice oficial de inflação do Brasil. Esta calculadora combina simulação de juros compostos com projeção de poder de compra real, descontando a inflação acumulada no período — essencial para planejamento financeiro de longo prazo.',
  sections: [
    {
      id: 'o-que-e-ipca',
      title: 'O que é o IPCA?',
      paragraphs: [
        'O IPCA mede a variação de preços de um conjunto de produtos e serviços consumidos por famílias brasileiras. É o índice usado pelo Banco Central para definir a meta de inflação e por investidores para calcular rentabilidade real.',
        'Um investimento que rende 10% ao ano com inflação de 5% tem ganho real de aproximadamente 4,76% — não 5%. Ignorar o IPCA leva a projeções otimistas demais para aposentadoria, reserva de emergência e metas de longo prazo.',
      ],
    },
    {
      id: 'como-funciona',
      title: 'Como funciona a calculadora IPCA',
      paragraphs: [
        'Simule seu investimento com valor inicial, aportes e taxa de rendimento. A calculadora exibe automaticamente o IPCA acumulado no período (com base na taxa anual atual do BCB) e calcula o poder de compra real do montante final.',
        'A rentabilidade real aproximada segue a fórmula de Fisher: r_real ≈ (1 + r_nominal) / (1 + inflação) − 1. O painel de resultados mostra quanto seu patrimônio bruto vale em termos de poder de compra de hoje.',
      ],
      list: [
        'IPCA atualizado via API pública do Banco Central.',
        'Projeção de poder de compra real no horizonte simulado.',
        'Comparativo com Poupança, Selic e CDI.',
        'Gráfico de evolução patrimonial e exportação CSV.',
      ],
    },
    {
      id: 'exemplo',
      title: 'Exemplo prático com IPCA',
      paragraphs: [
        'Carlos investe R$ 2.000 por mês a 11% ao ano durante 20 anos. O montante nominal pode ultrapassar R$ 1,5 milhão. Porém, com IPCA médio de 4,5% ao ano, o poder de compra real equivale a cerca de R$ 650 mil em valores de hoje — ainda excelente, mas muito diferente do valor nominal.',
        'Use esta simulação para definir metas realistas de aposentadoria e reserva financeira, sempre considerando a erosão inflacionária.',
      ],
    },
    {
      id: 'conclusao',
      title: 'Conclusão',
      paragraphs: [
        'Planejar com inflação em mente é fundamental para decisões financeiras inteligentes. A calculadora IPCA ajuda a visualizar o valor real do seu patrimônio, complementando a simulação nominal com a perspectiva de poder de compra.',
      ],
    },
  ],
  faq: [
    {
      question: 'De onde vem o dado do IPCA na calculadora?',
      answer:
        'Utilizamos séries públicas do Banco Central do Brasil (SGS) com fallback para valor de referência quando a API estiver indisponível.',
    },
    {
      question: 'Qual a diferença entre rendimento nominal e real?',
      answer:
        'O rendimento nominal é o percentual bruto do investimento. O real desconta a inflação (IPCA), mostrando o ganho efetivo de poder de compra.',
    },
    {
      question: 'O IPCA é o mesmo que inflação?',
      answer:
        'No Brasil, o IPCA é o índice oficial de inflação medido pelo IBGE e usado como referência pelo Banco Central para a meta de inflação.',
    },
    {
      question: 'Como proteger meu dinheiro da inflação?',
      answer:
        'Investimentos como Tesouro IPCA+, CDBs pós-fixados acima da inflação e diversificação em renda variável podem proteger o poder de compra. Consulte um profissional para sua situação.',
    },
  ],
  sources: [SOURCES_BCB, 'Índice IPCA — IBGE / meta de inflação BCB'],
  relatedTools: [
    {
      label: 'Calculadora CDI',
      href: ROUTES.calculadoraCdi,
      description: 'Simule rendimento com taxa CDI atualizada.',
    },
    {
      label: 'Juros Compostos',
      href: ROUTES.home,
      description: 'Calculadora completa de juros compostos.',
    },
    {
      label: 'Aposentadoria',
      href: toolPath('aposentadoria'),
      description: 'Planeje aposentadoria com inflação em mente.',
    },
  ],
};
