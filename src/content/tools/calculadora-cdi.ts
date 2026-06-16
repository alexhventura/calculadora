import type { ToolSeoContent } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';
import { SOURCES_BCB } from '../../constants/eeat';

export const calculadoraCdiContent: ToolSeoContent = {
  tool: 'juros',
  h1: 'Calculadora CDI — Simule Rendimento com Taxa Atualizada',
  metaTitle: 'Calculadora CDI | Simule Investimentos com Taxa CDI Atual',
  metaDescription:
    'Calcule juros compostos com a taxa CDI atualizada do Banco Central. Simule CDB, aportes mensais e compare com Poupança e Selic. Grátis e sem cadastro.',
  intro:
    'Use esta calculadora para simular investimentos atrelados ao CDI — referência de mais de 90% dos títulos de renda fixa no Brasil. A taxa CDI é atualizada automaticamente com base na meta Selic divulgada pelo Banco Central, permitindo projeções realistas de CDBs, fundos DI e títulos pós-fixados.',
  sections: [
    {
      id: 'o-que-e-cdi',
      title: 'O que é o CDI?',
      paragraphs: [
        'O CDI (Certificado de Depósito Interbancário) é a taxa de empréstimos entre bancos e serve como principal indexador da renda fixa brasileira. Na prática, investimentos como CDB, LCI, LCA e fundos DI rendem um percentual do CDI — por exemplo, 100% do CDI ou 110% do CDI.',
        'O CDI acompanha de perto a taxa Selic. Historicamente, fica cerca de 0,10 p.p. abaixo da Selic meta. Nossa calculadora aplica essa relação para exibir a taxa CDI estimada com base nos dados públicos do BCB.',
      ],
    },
    {
      id: 'como-funciona',
      title: 'Como funciona a calculadora CDI',
      paragraphs: [
        'Informe valor inicial, aporte mensal e período. A taxa CDI já vem pré-selecionada com dados atualizados. O cálculo utiliza capitalização mensal composta — o mesmo método usado por CDBs com liquidez diária e resgates mensais.',
        'A fórmula base é M = P × (1 + i)^n, com aportes mensais capitalizados período a período. A taxa anual do CDI é convertida para taxa mensal equivalente: i_mensal = (1 + i_anual)^(1/12) − 1.',
      ],
      list: [
        'Taxa CDI atualizada via API do Banco Central.',
        'Simulação com aportes mensais recorrentes.',
        'Comparativo com Poupança e Selic na mesma tela.',
        'Gráfico de evolução e exportação CSV.',
      ],
    },
    {
      id: 'exemplo',
      title: 'Exemplo prático com CDI',
      paragraphs: [
        'Suponha um CDB a 100% do CDI com taxa anual de 10,65%. Investindo R$ 1.000 por mês durante 10 anos, o montante acumulado supera R$ 200.000 — com mais de R$ 80.000 em rendimentos compostos sobre R$ 120.000 aportados.',
        'Compare com a Poupança na mesma calculadora para visualizar a diferença de rentabilidade ao longo do tempo. Lembre-se: valores simulados são brutos, sem descontar IR regressivo (22,5% a 15%) nem taxas de administração.',
      ],
    },
    {
      id: 'conclusao',
      title: 'Conclusão',
      paragraphs: [
        'A calculadora CDI é uma ferramenta educativa para planejar investimentos pós-fixados. Use os resultados como referência de projeção, não como garantia de retorno. Consulte sempre a lâmina do produto e, se necessário, um profissional certificado.',
      ],
    },
  ],
  faq: [
    {
      question: 'O CDI é igual à Selic?',
      answer:
        'Não exatamente. O CDI costuma ficar cerca de 0,10 ponto percentual abaixo da meta Selic, embora acompanhe a mesma tendência.',
    },
    {
      question: 'Como a calculadora obtém a taxa CDI?',
      answer:
        'Buscamos a meta Selic nas APIs públicas do Banco Central e estimamos o CDI com base na relação histórica CDI ≈ Selic − 0,10 p.p.',
    },
    {
      question: 'Posso simular 110% do CDI?',
      answer:
        'Selecione a taxa CDI e ajuste manualmente o campo de taxa para o percentual desejado (ex.: multiplique a taxa exibida por 1,10).',
    },
    {
      question: 'O rendimento do CDI tem imposto?',
      answer:
        'Sim. CDBs e fundos DI têm IR regressivo de 22,5% (até 180 dias) a 15% (acima de 720 dias). Os valores aqui são brutos.',
    },
  ],
  sources: [SOURCES_BCB, 'Relação histórica CDI × Selic — mercado interbancário brasileiro'],
  relatedTools: [
    {
      label: 'Juros Compostos',
      href: ROUTES.jurosCompostos,
      description: 'Calculadora completa com Poupança, Selic e CDI.',
    },
    {
      label: 'Calculadora IPCA',
      href: ROUTES.calculadoraIpca,
      description: 'Entenda o impacto da inflação no seu patrimônio.',
    },
    {
      label: 'Aposentadoria',
      href: toolPath('aposentadoria'),
      description: 'Planeje complemento ao INSS com juros compostos.',
    },
  ],
};
